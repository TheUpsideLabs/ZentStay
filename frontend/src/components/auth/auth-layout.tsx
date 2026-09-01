"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}

        <section className="hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 lg:flex">

          <div className="mx-auto flex max-w-xl flex-col justify-center px-12 text-white">

            <Link
              href="/"
              className="text-5xl font-black"
            >
              ZentStay
            </Link>

            <h2 className="mt-16 text-5xl font-black leading-tight">
              Find your
              <br />
              perfect student home.
            </h2>

            <p className="mt-8 text-lg leading-8 text-blue-100">
              Join thousands of students discovering verified PGs,
              hostels and apartments near their colleges.
            </p>

          </div>

        </section>

        {/* Right */}

        <section className="flex items-center justify-center p-8">

          <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-xl">

            <h1 className="text-4xl font-black">
              {title}
            </h1>

            <p className="mt-3 text-slate-500">
              {subtitle}
            </p>

            <div className="mt-10">
              {children}
            </div>

          </div>

        </section>

      </div>

    </main>
  );
}