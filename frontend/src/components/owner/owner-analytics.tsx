"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Home, CalendarCheck, IndianRupee, Sparkles, PieChart } from "lucide-react";
import ownerService, { OwnerAnalyticsResponse } from "@/services/owner.service";

export function OwnerAnalytics() {
  const [analytics, setAnalytics] = useState<OwnerAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);
        const data = await ownerService.getAnalytics();
        setAnalytics(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900">Financial & Occupancy Analytics</h2>
        </div>
        <div className="flex h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      </section>
    );
  }

  if (error || !analytics) {
    return (
      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900">Financial & Occupancy Analytics</h2>
        </div>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm font-semibold text-red-600">
          {error || "Unable to load analytics."}
        </div>
      </section>
    );
  }

  const totalCapacity = analytics.activeBookings + analytics.totalAvailableRooms;
  const occupancyRate =
    totalCapacity > 0
      ? Math.round((analytics.activeBookings / totalCapacity) * 100)
      : 0;

  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Sparkles className="h-3 w-3" />
            Performance & Insights
          </span>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Financial & Occupancy Analytics</h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">Consolidated earnings, booking velocity, and room utilization</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Realized Revenue */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Realized Revenue</p>
              <p className="text-2xl font-black text-slate-900 sm:text-3xl">
                ₹{analytics.financials.totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>From active & completed stays</span>
            <span className="font-bold text-emerald-600">Realized</span>
          </div>
        </div>

        {/* Pending Pipeline Revenue */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pipeline Revenue</p>
              <p className="text-2xl font-black text-slate-900 sm:text-3xl">
                ₹{analytics.financials.totalPendingRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>Awaiting owner confirmation</span>
            <span className="font-bold text-amber-600">Pipeline</span>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <PieChart size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Occupancy Rate</p>
              <p className="text-2xl font-black text-purple-700 sm:text-3xl">{occupancyRate}%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-purple-600 transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-400 font-medium">
              <span>{analytics.activeBookings} Occupied</span>
              <span>{analytics.totalAvailableRooms} Available</span>
            </div>
          </div>
        </div>

        {/* Active Reservations */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CalendarCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Bookings</p>
              <p className="text-2xl font-black text-slate-900 sm:text-3xl">{analytics.totalBookings}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>{analytics.activeBookings} Active tenancies</span>
            <span className="font-bold text-blue-600">{analytics.totalProperties} Stays</span>
          </div>
        </div>
      </div>
    </section>
  );
}
