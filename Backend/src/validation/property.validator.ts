import { z } from "zod";

export const createPropertySchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      3,
      "Title must be at least 3 characters."
    )
    .max(
      100,
      "Title cannot exceed 100 characters."
    ),

  description: z
    .string()
    .trim()
    .min(
      10,
      "Description must be at least 10 characters."
    )
    .max(
      1000,
      "Description cannot exceed 1000 characters."
    ),

  address: z
    .string()
    .trim()
    .min(
      5,
      "Address must be at least 5 characters."
    )
    .max(
      200,
      "Address cannot exceed 200 characters."
    ),

  city: z
    .string()
    .trim()
    .min(
      2,
      "City must be at least 2 characters."
    )
    .max(
      100,
      "City cannot exceed 100 characters."
    ),

  state: z
    .string()
    .trim()
    .min(
      2,
      "State must be at least 2 characters."
    )
    .max(
      100,
      "State cannot exceed 100 characters."
    ),

  pincode: z
    .string()
    .trim()
    .regex(
      /^\d{6}$/,
      "Pincode must contain exactly 6 digits."
    ),

  rent: z.coerce
    .number()
    .positive(
      "Rent must be a positive number."
    ),

  rentPeriod: z.enum([
    "MONTHLY",
    "YEARLY",
  ]),

  securityDeposit: z.coerce
    .number()
    .min(
      0,
      "Security deposit cannot be negative."
    ),

  availableRooms: z.coerce
    .number()
    .int(
      "Available rooms must be an integer."
    )
    .positive(
      "Available rooms must be greater than 0."
    ),

  gender: z.enum([
    "BOYS",
    "GIRLS",
    "UNISEX",
  ]),

  roomType: z.enum([
    "SINGLE",
    "DOUBLE",
    "TRIPLE",
  ]),

  furnishing: z.enum([
    "FURNISHED",
    "SEMI_FURNISHED",
    "UNFURNISHED",
  ]),

  collegeId: z.string().uuid(
    "Invalid college id."
  ),
});