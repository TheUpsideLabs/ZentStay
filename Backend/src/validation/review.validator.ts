import { z } from "zod";

export const createReviewSchema = z.object({
  propertyId: z.string().uuid("Invalid property ID"),

  rating: z
    .number({
      message: "Rating is required",
    })
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be greater than 5"),

  comment: z
    .string()
    .trim()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters"),
});

export const updateReviewSchema = z.object({
  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be greater than 5")
    .optional(),

  comment: z
    .string()
    .trim()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters")
    .optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;