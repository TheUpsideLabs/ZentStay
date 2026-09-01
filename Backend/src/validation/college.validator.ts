import { z } from "zod";

export const createCollegeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "College name is required.")
    .max(100),

  shortName: z
    .string()
    .trim()
    .min(2)
    .max(20),

  slug: z
    .string()
    .trim()
    .min(2)
    .max(50),

  city: z
    .string()
    .trim()
    .min(2),

  state: z
    .string()
    .trim()
    .min(2),

  logo: z
    .string()
    .url("Logo must be a valid URL.")
    .optional(),

  banner: z
    .string()
    .url("Banner must be a valid URL.")
    .optional(),

  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),

  aisheCode: z.string().optional(),
  source: z.string().optional(),
  sourceYear: z.string().optional(),
  verified: z.boolean().optional(),
  isActive: z.boolean().optional(),
});