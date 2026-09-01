"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Home } from "lucide-react";
import bookingService from "@/services/booking.service";
import { Booking } from "@/types/api/booking";

export function StudentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        const data = await bookingService.getMyBookings();
        setBookings(data);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          <CalendarCheck size={32} />
        </div>
        <h3 className="mt-6 text-xl font-bold text-slate-900">No Bookings Found</h3>
        <p className="mt-2 text-slate-500">You haven't made any property bookings yet.</p>
      </div>
    );
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'REJECTED': return 'bg-red-100 text-red-700';
      case 'CANCELLED': return 'bg-slate-100 text-slate-700';
      case 'COMPLETED': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(booking.status)}`}>
                {booking.status}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                ₹{booking.totalAmount}
              </span>
            </div>
            
            <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Home size={18} className="text-blue-600" />
              {booking.property?.title || "Unknown Property"}
            </h4>
            <p className="text-sm text-slate-500">Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
