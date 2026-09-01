"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/constants/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-10 lg:flex">
      {navigation.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href}
            className="group relative"
          >
            <span
              className={`text-[15px] font-semibold transition-colors duration-300 ${
                active
                  ? "text-blue-600"
                  : "text-slate-700 group-hover:text-blue-600"
              }`}
            >
              {item.title}
            </span>

            <span
              className={`absolute -bottom-2 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 ${
                active
                  ? "w-8"
                  : "w-0 group-hover:w-8"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}