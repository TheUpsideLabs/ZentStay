import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const getOwnerAnalytics = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId = req.user!.id;

    if (req.user!.role !== Role.OWNER && req.user!.role !== Role.ADMIN) {
      throw new AppError(403, "Only owners can view their analytics.");
    }

    const properties = await prisma.property.findMany({
      where: { ownerId },
      include: {
        bookings: true,
      }
    });

    const totalProperties = properties.length;
    let totalRevenue = 0;
    let totalPendingRevenue = 0;
    let totalBookings = 0;
    let activeBookings = 0;
    let totalAvailableRooms = 0;

    properties.forEach(property => {
      totalAvailableRooms += (property.availableRooms || 0);

      property.bookings.forEach(booking => {
        totalBookings++;
        
        if (booking.status === 'COMPLETED' || booking.status === 'CONFIRMED') {
          totalRevenue += booking.totalAmount;
          activeBookings++;
        } else if (booking.status === 'PENDING') {
          totalPendingRevenue += booking.totalAmount;
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        totalProperties,
        totalAvailableRooms,
        totalBookings,
        activeBookings,
        financials: {
          totalRevenue,
          totalPendingRevenue,
        }
      },
    });
  } catch (error) {
    next(error);
  }
};
