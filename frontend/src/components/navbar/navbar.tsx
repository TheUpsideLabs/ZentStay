"use client";

import { useEffect, useState } from "react";

import { MobileNav } from "./mobile-nav";
import { NavActions } from "./nav-actions";
import { NavLinks } from "./nav-links";
import { NavLogo } from "./nav-logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-2 sm:pt-5">
        <div
          className={`
            flex
            h-16
            sm:h-20
            items-center
            justify-between
            rounded-2xl
            sm:rounded-[24px]
            px-4
            sm:px-8
            transition-all
            duration-300
            ${
              scrolled
                ? "border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur-xl"
                : "border border-slate-200/50 bg-white/90 shadow-xs backdrop-blur-md sm:border-transparent sm:bg-transparent sm:shadow-none"
            }
          `}
        >
          <NavLogo />

          <NavLinks />

          <NavActions />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}