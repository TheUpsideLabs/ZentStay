"use client";

import Link from "next/link";
import { Bell, Heart, Loader2, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { useNotifications } from "@/context/notification-context";
import { useWishlist } from "@/context/wishlist-context";

export function NavActions() {
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount, loading } = useNotifications();
  const { wishlist, loading: wishlistLoading } = useWishlist();

  const isStudent = user?.role === "STUDENT";
  
  function getDashboardLink() {
    if (!user) return "/";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "OWNER") return "/owner";
    return "/profile";
  }

  function handleLogout() {
    logout();
    window.dispatchEvent(new Event("zentstay-auth-changed"));
    router.push("/");
  }

  function handleNotificationClick() {
    router.push("/notifications");
  }

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          {/* ================= WISHLIST ================= */}
          {isStudent && (
            <Link
              href="/wishlist"
              aria-label="My Wishlist"
              title="My Wishlist"
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 text-slate-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-md"
            >
              <Heart className="h-5 w-5" fill="none" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black leading-none text-white ring-2 ring-white">
                  {wishlist.length > 99 ? "99+" : wishlist.length}
                </span>
              )}
            </Link>
          )}

          {/* ================= NOTIFICATION ================= */}
          <button
            type="button"
            onClick={handleNotificationClick}
            aria-label={unreadCount > 0 ? "\ unread notifications" : "Notifications"}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Bell className="h-5 w-5" />
            )}
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black leading-none text-white ring-2 ring-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* ================= DASHBOARD ================= */}
          <Link href={getDashboardLink()}>
            <Button
              className="rounded-2xl bg-slate-900 px-6 text-white hover:bg-slate-800 flex gap-2 items-center"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          {/* ================= LOGOUT ================= */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-2xl border-red-500 px-6 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost" className="rounded-2xl px-6">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 shadow-lg shadow-blue-200/40 transition-all duration-300 hover:scale-[1.03]">
              Get Started
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
