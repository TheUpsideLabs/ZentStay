"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Heart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { navigation } from "@/constants/navigation";
import { useAuth } from "@/context";
import { useNotifications } from "@/context/notification-context";
import { useWishlist } from "@/context/wishlist-context";

export function MobileNav() {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  const {
    unreadCount,
  } = useNotifications();

  const {
    wishlist,
  } = useWishlist();

  const isStudent =
    user?.role === "STUDENT";

  function handleNotifications() {
    setOpen(false);
    router.push("/notifications");
  }

  function handleWishlist() {
    setOpen(false);
    router.push("/wishlist");
  }

  function handleLogout() {
    setOpen(false);

    logout();

    window.dispatchEvent(
      new Event("zentstay-auth-changed")
    );

    router.push("/");
  }

  function handleLogin() {
    setOpen(false);
    router.push("/login");
  }

  function handleRegister() {
    setOpen(false);
    router.push("/register");
  }

  return (
    <>
      {/* ================= MENU BUTTON ================= */}

      <Button
        variant="ghost"
        size="icon"
        className="rounded-xl lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* ================= MOBILE DRAWER ================= */}

      {open && (
        <>
          {/* Overlay */}

          <div
            className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-sm
            "
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}

          <aside
            className="
              fixed
              right-0
              top-0
              z-50
              flex
              h-screen
              w-[340px]
              max-w-[90vw]
              flex-col
              bg-white
              p-8
              shadow-2xl
            "
          >
            {/* ================= HEADER ================= */}

            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-black">
                ZentStay
              </h2>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  rounded-xl
                  p-2
                  transition
                  hover:bg-slate-100
                "
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* ================= NAVIGATION ================= */}

            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    rounded-xl
                    px-3
                    py-3
                    text-lg
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* ================= AUTHENTICATED ================= */}

            {isAuthenticated ? (
              <div className="mt-8 space-y-4">

                {/* User */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                  "
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Welcome
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {user?.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {user?.role}
                  </p>
                </div>

                {/* ================= WISHLIST ================= */}

                {isStudent && (
                  <button
                    type="button"
                    onClick={handleWishlist}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-red-100
                      bg-red-50
                      px-4
                      py-3
                      text-left
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-100
                    "
                  >
                    <span className="flex items-center gap-3">
                      <Heart
                        className="h-5 w-5"
                        fill="currentColor"
                      />

                      Wishlist
                    </span>

                    {wishlist.length > 0 && (
                      <span
                        className="
                          flex
                          min-h-6
                          min-w-6
                          items-center
                          justify-center
                          rounded-full
                          bg-red-500
                          px-1.5
                          text-xs
                          font-black
                          text-white
                        "
                      >
                        {wishlist.length > 99
                          ? "99+"
                          : wishlist.length}
                      </span>
                    )}
                  </button>
                )}

                {/* ================= NOTIFICATIONS ================= */}

                <button
                  type="button"
                  onClick={
                    handleNotifications
                  }
                  className="
                    relative
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-blue-100
                    bg-blue-50
                    px-4
                    py-3
                    text-left
                    font-semibold
                    text-blue-700
                    transition
                    hover:bg-blue-100
                  "
                >
                  <span className="flex items-center gap-3">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </span>

                  {unreadCount > 0 && (
                    <span
                      className="
                        flex
                        min-h-6
                        min-w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        px-1.5
                        text-xs
                        font-black
                        text-white
                      "
                    >
                      {unreadCount > 99
                        ? "99+"
                        : unreadCount}
                    </span>
                  )}
                </button>

                {/* ================= LOGOUT ================= */}

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border-red-500
                    text-red-500
                    hover:bg-red-500
                    hover:text-white
                  "
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>

              </div>
            ) : (
              /* ================= GUEST ================= */

              <div className="mt-auto space-y-4">

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLogin}
                  className="w-full rounded-2xl"
                >
                  Login
                </Button>

                <Button
                  type="button"
                  onClick={handleRegister}
                  className="
                    w-full
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                  "
                >
                  Get Started
                </Button>

              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
}