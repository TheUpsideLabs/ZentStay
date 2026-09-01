"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validations/auth";

import authService from "@/services/auth.service";
import { useAuth } from "@/context";

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password") || "";

  async function onSubmit(
    data: RegisterFormData
  ) {
    try {
      const response = await authService.register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: "STUDENT" // Defaulting to STUDENT for now, as per backend default
      });

      const { user, accessToken, refreshToken } = response.data;

      if (!accessToken || !refreshToken) {
        throw new Error("Tokens not received from server.");
      }

      login(user, accessToken, refreshToken);
      
      window.dispatchEvent(
        new Event("zentstay-auth-changed")
      );

      alert(response.message || "Registration successful!");
      router.push("/");
    } catch (error: any) {
      console.error("Registration Error:", error);
      alert(
        error?.response?.data?.message ??
          error?.message ??
          "Registration failed."
      );
    }
  }

  const strength =
    password.length >= 12
      ? "Strong"
      : password.length >= 8
      ? "Medium"
      : "Weak";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <input
        placeholder="Full Name"
        {...register("name")}
        className="h-14 w-full rounded-2xl border border-slate-300 px-5"
      />

      <p className="text-sm text-red-500">
        {errors.name?.message}
      </p>

      <input
        placeholder="Email"
        {...register("email")}
        className="h-14 w-full rounded-2xl border border-slate-300 px-5"
      />

      <p className="text-sm text-red-500">
        {errors.email?.message}
      </p>

      <input
        placeholder="Phone Number"
        {...register("phone")}
        className="h-14 w-full rounded-2xl border border-slate-300 px-5"
      />

      <p className="text-sm text-red-500">
        {errors.phone?.message}
      </p>

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="h-14 w-full rounded-2xl border border-slate-300 px-5"
      />

      <p className="text-sm text-red-500">
        {errors.password?.message}
      </p>

      <div>

        <div className="mb-2 flex justify-between text-sm">

          <span>Password Strength</span>

          <span className="font-semibold">
            {strength}
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-200">

          <div
            className={`h-full rounded-full transition-all ${
              strength === "Strong"
                ? "w-full bg-green-500"
                : strength === "Medium"
                ? "w-2/3 bg-yellow-500"
                : "w-1/3 bg-red-500"
            }`}
          />

        </div>

      </div>

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        className="h-14 w-full rounded-2xl border border-slate-300 px-5"
      />

      <p className="text-sm text-red-500">
        {errors.confirmPassword?.message}
      </p>

      <button
        disabled={isSubmitting}
        className="
          h-14
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          font-bold
          text-white
          disabled:opacity-50
        "
      >
        {isSubmitting
          ? "Creating Account..."
          : "Create Account"}
      </button>

      <p className="text-center text-sm">

        Already have an account?{" "}

        <Link
          href="/login"
          className="text-blue-600"
        >
          Login
        </Link>

      </p>

    </form>
  );
}