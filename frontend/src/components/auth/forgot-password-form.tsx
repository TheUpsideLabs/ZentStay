"use client";

import Link from "next/link";

export function ForgotPasswordForm() {
  return (
    <form className="space-y-5">

      <div>

        <label className="mb-2 block font-semibold">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your registered email"
          className="h-14 w-full rounded-2xl border border-slate-300 px-5 outline-none transition focus:border-blue-600"
        />

      </div>

      <button
        className="
          h-14
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          font-bold
          text-white
        "
      >
        Send OTP
      </button>

      <p className="text-center text-sm text-slate-500">

        Remember your password?{" "}

        <Link
          href="/login"
          className="font-semibold text-blue-600"
        >
          Login
        </Link>

      </p>

    </form>
  );
}