"use client";

import Link from "next/link";

export function OtpForm() {
    return (
        <form className="space-y-6">

            <div>

                <label className="mb-2 block font-semibold">
                    Enter OTP
                </label>

                <input
                    type="text"
                    maxLength={6}
                    placeholder="6-digit OTP"
                    className="
            h-16
            w-full
            rounded-2xl
            border
            border-slate-300
            text-center
            text-2xl
            tracking-[0.5em]
            outline-none
            transition
            focus:border-blue-600
          "
                />

            </div>

            <Link href="/reset-password">

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
                    Verify OTP
                </button>

            </Link>

        </form>
    );
}