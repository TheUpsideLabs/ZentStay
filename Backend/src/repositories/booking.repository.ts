import prisma from "../config/prisma";
import { BookingStatus } from "@prisma/client";
import { UpdateBookingDTO } from "../interfaces/booking.interface";

class BookingRepository {
  async create(data: {
    studentId: string;
    propertyId: string;
    checkInDate: Date;
    expectedStayMonths: number;
    rentAtBooking: number;
    securityDeposit: number;
    totalAmount: number;
  }) {
    return prisma.booking.create({
      data,
    });
  }

  // ==========================================
  // FIND ACTIVE BOOKING FOR STUDENT + PROPERTY
  // ==========================================

  async findActiveByStudentAndProperty(
    studentId: string,
    propertyId: string
  ) {
    return prisma.booking.findFirst({
      where: {
        studentId,
        propertyId,
        status: {
          in: [
            BookingStatus.PENDING,
            BookingStatus.CONFIRMED,
          ],
        },
      },
      include: {
        property: true,
      },
    });
  }

  // ==========================================
  // FIND ALL BOOKINGS - ADMIN
  // ==========================================

  async findAll() {
    return prisma.booking.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        property: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==========================================
  // FIND BY ID
  // ==========================================

  async findById(id: string) {
    return prisma.booking.findUnique({
      where: {
        id,
      },

      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        property: true,
      },
    });
  }

  // ==========================================
  // STUDENT BOOKINGS
  // ==========================================

  async findStudentBookings(studentId: string) {
    return prisma.booking.findMany({
      where: {
        studentId,
      },

      include: {
        property: {
          include: {
            images: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==========================================
  // OWNER BOOKINGS
  // ==========================================

  async findBookingsOfOwner(ownerId: string) {
    return prisma.booking.findMany({
      where: {
        property: {
          ownerId,
        },
      },

      include: {
        property: true,

        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==========================================
  // STUDENT + BOOKING
  // ==========================================

  async findByStudent(
    studentId: string,
    bookingId: string
  ) {
    return prisma.booking.findFirst({
      where: {
        id: bookingId,
        studentId,
      },

      include: {
        property: true,
      },
    });
  }

  // ==========================================
  // OWNER + BOOKING
  // ==========================================

  async findByOwner(
    ownerId: string,
    bookingId: string
  ) {
    return prisma.booking.findFirst({
      where: {
        id: bookingId,

        property: {
          ownerId,
        },
      },

      include: {
        property: true,

        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  // ==========================================
  // CONFIRM BOOKING + RESERVE ROOM
  // ==========================================

  async confirmAndReserveRoom(
    bookingId: string,
    ownerId: string
  ) {
    return prisma.$transaction(async (tx) => {
      const booking =
        await tx.booking.findFirst({
          where: {
            id: bookingId,

            property: {
              ownerId,
            },
          },

          include: {
            property: true,

            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

      if (!booking) {
        return null;
      }

      // Only pending bookings can be confirmed.
      if (
        booking.status !==
        BookingStatus.PENDING
      ) {
        throw new Error(
          "ONLY_PENDING_BOOKING"
        );
      }

      // Atomically reserve one room.
      const roomUpdate =
        await tx.property.updateMany({
          where: {
            id: booking.propertyId,

            ownerId,

            available: true,

            availableRooms: {
              gt: 0,
            },
          },

          data: {
            availableRooms: {
              decrement: 1,
            },
          },
        });

      // No room was available.
      if (roomUpdate.count !== 1) {
        throw new Error(
          "NO_ROOMS_AVAILABLE"
        );
      }

      // Check the new room count and
      // automatically disable property
      // when no rooms remain.
      const updatedProperty =
        await tx.property.findUnique({
          where: {
            id: booking.propertyId,
          },
        });

      if (!updatedProperty) {
        throw new Error(
          "PROPERTY_NOT_FOUND"
        );
      }

      if (
        updatedProperty.availableRooms === 0
      ) {
        await tx.property.update({
          where: {
            id: booking.propertyId,
          },

          data: {
            available: false,
          },
        });
      }

      // Finally confirm the booking.
      return tx.booking.update({
        where: {
          id: bookingId,
        },

        data: {
          status:
            BookingStatus.CONFIRMED,
        },

        include: {
          property: true,

          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });
  }

  // ==========================================
  // VERIFY BOOKING RENT (OFFLINE PAYMENT)
  // ==========================================

  async verifyBookingRent(
    bookingId: string,
    ownerId: string
  ) {
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        property: { ownerId },
      },
      include: {
        property: true,
        student: { select: { id: true, name: true, email: true } },
      }
    });

    if (!booking) {
      return null;
    }

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new Error("ONLY_CONFIRMED_BOOKING");
    }

    const verified = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: BookingStatus.COMPLETED },
      include: {
        property: true,
        student: { select: { id: true, name: true, email: true } },
      },
    });

    return verified;
  }

  // ==========================================
  // REJECT BOOKING
  // ==========================================

  async rejectBooking(
    bookingId: string,
    ownerId: string
  ) {
    return prisma.$transaction(
      async (tx) => {
        const booking =
          await tx.booking.findFirst({
            where: {
              id: bookingId,

              property: {
                ownerId,
              },
            },

            include: {
              property: true,

              student: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          });

        if (!booking) {
          return null;
        }

        if (
          booking.status !==
          BookingStatus.PENDING
        ) {
          throw new Error(
            "ONLY_PENDING_BOOKING"
          );
        }

        return tx.booking.update({
          where: {
            id: bookingId,
          },

          data: {
            status:
              BookingStatus.REJECTED,
          },

          include: {
            property: true,

            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
      }
    );
  }

  // ==========================================
  // CANCEL BOOKING + RELEASE ROOM
  // ==========================================

  async cancelBooking(
    bookingId: string,
    studentId: string
  ) {
    return prisma.$transaction(
      async (tx) => {
        const booking =
          await tx.booking.findFirst({
            where: {
              id: bookingId,
              studentId,
            },

            include: {
              property: true,
              student: true,
            },
          });

        if (!booking) {
          return null;
        }

        // Cannot cancel an already
        // cancelled/rejected/completed booking.
        if (
          booking.status ===
            BookingStatus.CANCELLED ||
          booking.status ===
            BookingStatus.REJECTED ||
          booking.status ===
            BookingStatus.COMPLETED
        ) {
          throw new Error(
            "BOOKING_CANNOT_BE_CANCELLED"
          );
        }

        // If the booking was confirmed,
        // release the reserved room.
        if (
          booking.status ===
          BookingStatus.CONFIRMED
        ) {
          await tx.property.update({
            where: {
              id: booking.propertyId,
            },

            data: {
              availableRooms: {
                increment: 1,
              },

              available: true,
            },
          });
        }

        return tx.booking.update({
          where: {
            id: bookingId,
          },

          data: {
            status:
              BookingStatus.CANCELLED,
          },

          include: {
            property: true,
          },
        });
      }
    );
  }

  // ==========================================
  // GENERIC UPDATE
  // ==========================================

  async update(
    id: string,
    data: UpdateBookingDTO
  ) {
    return prisma.booking.update({
      where: {
        id,
      },

      data,
    });
  }

  // ==========================================
  // DELETE - KEPT FOR SAFETY / ADMIN USE
  // ==========================================

  async delete(id: string) {
    return prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}

export default new BookingRepository();