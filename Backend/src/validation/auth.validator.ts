import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(10, "Invalid phone number")
    .optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  role: z.enum(["STUDENT", "OWNER", "ADMIN"]).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});