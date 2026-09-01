import { z } from "zod";

export const createBookingSchema = z.object({
  propertyId: z
    .string()
    .uuid("Invalid property ID."),

  checkInDate: z.coerce
    .date({
      error: "Invalid check-in date.",
    })
    .refine((date) => date >= new Date(), {
      message: "Check-in date cannot be in the past.",
    }),

  expectedStayMonths: z
    .number()
    .int("Expected stay must be an integer.")
    .min(1, "Minimum stay is 1 month.")
    .max(24, "Maximum stay is 24 months."),
});

export const updateBookingSchema = z.object({
  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "REJECTED",
      "CANCELLED",
      "COMPLETED",
    ])
    .optional(),

  checkInDate: z.coerce.date().optional(),

  expectedStayMonths: z
    .number()
    .int()
    .min(1)
    .max(24)
    .optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;