"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Search, Clock, CheckCircle2, XCircle } from "lucide-react";
import adminService, { AdminBookingResponse } from "@/services/admin.service";

export function AdminBookings() {
  const [bookings, setBookings] = useState<AdminBookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        const data = await adminService.getAllBookings();
        setBookings(data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  function getStatusStyle(status: string) {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-50 text-emerald-700";
      case "PENDING":
        return "bg-amber-50 text-amber-700";
      case "REJECTED":
        return "bg-rose-50 text-rose-700";
      case "CANCELLED":
        return "bg-slate-100 text-slate-600";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        search.trim() === "" ||
        (b.property?.title && b.property.title.toLowerCase().includes(search.toLowerCase())) ||
        (b.student?.name && b.student.name.toLowerCase().includes(search.toLowerCase())) ||
        (b.student?.email && b.student.email.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm font-semibold text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings by property, tenant, or email..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-xs sm:text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "REJECTED", "CANCELLED"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                statusFilter === status
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status === "ALL" ? `All (${bookings.length})` : status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-slate-900 border-b border-slate-200 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="p-4">Stay Property</th>
                <th className="p-4">Tenant / Seeker</th>
                <th className="p-4">Check-In Date</th>
                <th className="p-4">Gross Move-In Value</th>
                <th className="p-4 text-center">Tenancy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs text-slate-500">
                    No booking records found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <CalendarCheck size={15} />
                      </div>
                      {booking.property?.title || "Property Stay"}
                    </td>
                    <td className="p-4">
                      <span className="block text-xs font-bold text-slate-900">{booking.student?.name || "Seeker"}</span>
                      <span className="block text-[11px] text-slate-400">{booking.student?.email}</span>
                    </td>
                    <td className="p-4 text-xs sm:text-sm text-slate-500">
                      {new Date(booking.checkInDate).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                    <td className="p-4 text-xs sm:text-sm font-bold text-slate-900">
                      ₹{booking.totalAmount?.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

