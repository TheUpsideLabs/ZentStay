"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "@/lib/validations/auth";

import authService from "@/services/auth.service";
import { useAuth } from "@/context";

export function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setServerError(null);
      const response =
        await authService.login(data);

      console.log(
        "ZentStay Login Response:",
        response
      );

      const user = response.data.user;

      const accessToken =
        response.data.accessToken;

      const refreshToken =
        response.data.refreshToken;

      if (!accessToken) {
        throw new Error(
          "Access token was not returned by the server."
        );
      }

      if (!refreshToken) {
        throw new Error(
          "Refresh token was not returned by the server."
        );
      }

      // ==========================================
      // SAVE COMPLETE AUTH STATE
      // ==========================================

      login(
        user,
        accessToken,
        refreshToken
      );

      // ==========================================
      // NOTIFY NOTIFICATION PROVIDER
      // ==========================================

      window.dispatchEvent(
        new Event("zentstay-auth-changed")
      );

      // Redirect according to role
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else if (user.role === "OWNER") {
        router.push("/owner");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        error?.message ??
        "Invalid email or password.";

      setServerError(msg);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {serverError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-xs sm:text-sm font-semibold text-red-600">
          {serverError}
        </div>
      )}
      {/* ================= EMAIL ================= */}

      <div>
        <input
          type="email"
          placeholder="Email Address"
          autoComplete="email"
          {...register("email")}
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-slate-300
            px-5
            outline-none
            transition
            focus:border-blue-600
            focus:ring-2
            focus:ring-blue-100
          "
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ================= PASSWORD ================= */}

      <div>
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password")}
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-slate-300
            px-5
            outline-none
            transition
            focus:border-blue-600
            focus:ring-2
            focus:ring-blue-100
          "
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* ================= LOGIN BUTTON ================= */}

      <button
        type="submit"
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
          shadow-lg
          shadow-blue-200/30
          transition-all
          duration-300
          hover:scale-[1.01]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting
          ? "Signing In..."
          : "Login"}
      </button>

      {/* ================= REGISTER ================= */}

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="
            font-semibold
            text-blue-600
            hover:text-blue-700
          "
        >
          Register
        </Link>
      </p>

      {/* ================= FORGOT PASSWORD ================= */}

      <p className="text-center text-sm">
        <Link
          href="/forgot-password"
          className="
            text-blue-600
            hover:text-blue-700
          "
        >
          Forgot Password?
        </Link>
      </p>
    </form>
  );
}