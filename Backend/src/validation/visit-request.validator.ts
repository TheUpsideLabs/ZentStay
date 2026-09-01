import { z } from "zod";

export const createVisitRequestSchema = z.object({
  propertyId: z
    .string()
    .uuid("Invalid property id."),

  visitDate: z
    .coerce
    .date()
    .refine(
      (date) => date > new Date(),
      "Visit date must be in the future."
    ),

  message: z
    .string()
    .trim()
    .max(500, "Message cannot exceed 500 characters.")
    .optional(),
});

export const updateVisitRequestStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "REJECTED",
    "CANCELLED",
    "COMPLETED",
  ]),
});