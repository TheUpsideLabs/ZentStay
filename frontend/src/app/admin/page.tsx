"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context";
import adminService, { DashboardStats } from "@/services/admin.service";
import { AdminUsers } from "@/components/admin/admin-users";
import { AdminProperties } from "@/components/admin/admin-properties";
import { AdminBookings } from "@/components/admin/admin-bookings";
import { AdminColleges } from "@/components/admin/admin-colleges";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { Users, Home, CalendarCheck, Star, Heart, Bell, Shield, Sparkles, IndianRupee } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = window.setTimeout(() => {
        if (!localStorage.getItem("accessToken")) {
          router.replace("/login");
        }
      }, 100);
      return () => window.clearTimeout(timer);
    }

    if (user?.role !== "ADMIN") {
      router.replace("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboard();
        setStats(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              ZentStay Platform Governance
            </span>
            <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Admin Operations Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">Live platform metrics, user directory, property verification, and master college records</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Users Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{stats.users.total}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-sm text-slate-500">
              <span>{stats.users.students} Students</span>
              <span>{stats.users.owners} Owners</span>
            </div>
          </div>

          {/* Properties Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Home size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Properties</p>
                <p className="text-2xl font-bold text-slate-900">{stats.properties.total}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-sm text-slate-500">
              <span>{stats.properties.available} Available</span>
            </div>
          </div>

          {/* Bookings Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <CalendarCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Bookings</p>
                <p className="text-2xl font-bold text-slate-900">{stats.bookings.total}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-sm text-slate-500">
              <span>{stats.bookings.pending} Pending</span>
              <span>{stats.bookings.confirmed} Confirmed</span>
            </div>
          </div>
          
          {/* Reviews Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                <Star size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Reviews</p>
                <p className="text-2xl font-bold text-slate-900">{stats.reviews}</p>
              </div>
            </div>
          </div>

          {/* Wishlists Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Wishlisted Items</p>
                <p className="text-2xl font-bold text-slate-900">{stats.wishlists}</p>
              </div>
            </div>
          </div>

          {/* Notifications Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Bell size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Notifications Sent</p>
                <p className="text-2xl font-bold text-slate-900">{stats.notifications}</p>
              </div>
            </div>
          </div>

          {/* Revenue Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <span className="text-xl font-bold">₹</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900">₹{stats.financials?.totalRevenue?.toLocaleString('en-IN') || 0}</p>
              </div>
            </div>
          </div>

          {/* Pending Revenue Stat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <span className="text-xl font-bold">₹</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Revenue</p>
                <p className="text-2xl font-bold text-slate-900">₹{stats.financials?.totalPendingRevenue?.toLocaleString('en-IN') || 0}</p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
              <p className="mt-1 text-slate-500">View and manage all registered accounts on the platform</p>
            </div>
          </div>
          <AdminUsers />
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">College Management</h2>
              <p className="mt-1 text-slate-500">Manage institution data, verify records, and fix missing coordinates</p>
            </div>
          </div>
          <AdminColleges />
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Platform Properties</h2>
              <p className="mt-1 text-slate-500">All properties listed by owners</p>
            </div>
          </div>
          <AdminProperties />
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Booking Requests</h2>
              <p className="mt-1 text-slate-500">All active and historical booking requests</p>
            </div>
          </div>
          <AdminBookings />
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
}
