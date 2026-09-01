import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name should be at least 3 characters"),

    email: z
      .string()
      .email("Please enter a valid email"),

    phone: z
      .string()
      .min(10, "Enter a valid phone number"),

    password: z
      .string()
      .min(8, "Password should be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<
  typeof registerSchema
>;