import prisma from "../config/prisma";
import { BookingStatus, Role } from "@prisma/client";

class AdminRepository {
  async getDashboardStats() {
    const [
      totalUsers, totalStudents, totalOwners, totalAdmins,
      totalProperties, availableProperties,
      totalBookings, pendingBookings, confirmedBookings, rejectedBookings, cancelledBookings, completedBookings,
      totalReviews, totalWishlists, totalNotifications,
      revenueData
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: Role.STUDENT } }),
      prisma.user.count({ where: { role: Role.OWNER } }),
      prisma.user.count({ where: { role: Role.ADMIN } }),
      prisma.property.count(),
      prisma.property.count({ where: { available: true } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
      prisma.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
      prisma.booking.count({ where: { status: BookingStatus.REJECTED } }),
      prisma.booking.count({ where: { status: BookingStatus.CANCELLED } }),
      prisma.booking.count({ where: { status: BookingStatus.COMPLETED } }),
      prisma.review.count(),
      prisma.wishlist.count(),
      prisma.notification.count(),
      prisma.booking.findMany({
        where: {
          status: { in: ['CONFIRMED', 'COMPLETED', 'PENDING'] }
        },
        select: {
          status: true,
          totalAmount: true
        }
      })
    ]);

    let totalRevenue = 0;
    let totalPendingRevenue = 0;

    revenueData.forEach(booking => {
      if (booking.status === 'PENDING') {
        totalPendingRevenue += booking.totalAmount;
      } else {
        totalRevenue += booking.totalAmount;
      }
    });

    return {
      users: {
        total: totalUsers,
        students: totalStudents,
        owners: totalOwners,
        admins: totalAdmins,
      },
      properties: {
        total: totalProperties,
        available: availableProperties,
      },
      bookings: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        rejected: rejectedBookings,
        cancelled: cancelledBookings,
        completed: completedBookings,
      },
      financials: {
        totalRevenue,
        totalPendingRevenue
      },
      reviews: totalReviews,
      wishlists: totalWishlists,
      notifications: totalNotifications,
    };
  }

  async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new AdminRepository();
