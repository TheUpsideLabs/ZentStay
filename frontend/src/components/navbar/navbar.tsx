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
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div
          className={`
            flex
            h-20
            items-center
            justify-between
            rounded-[24px]
            px-8
            transition-all
            duration-500
            ${
              scrolled
                ? "border border-white/60 bg-white/80 shadow-2xl shadow-blue-100/20 backdrop-blur-xl"
                : "bg-transparent"
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