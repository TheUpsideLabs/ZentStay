"use client";

import Link from "next/link";

export function ResetPasswordForm() {
  return (
    <form className="space-y-5">

      <div>
        <label className="mb-2 block font-semibold">
          New Password
        </label>

        <input
          type="password"
          placeholder="Enter new password"
          className="h-14 w-full rounded-2xl border border-slate-300 px-5 outline-none transition focus:border-blue-600"
        />

        {/* Password Strength */}

        <div className="mt-3">

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">

            <div className="h-full w-1/3 rounded-full bg-yellow-500" />

          </div>

          <p className="mt-2 text-sm text-yellow-600">
            Password Strength : Medium
          </p>

        </div>

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm password"
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
        Reset Password
      </button>

      <p className="text-center text-sm text-slate-500">

        Back to{" "}

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