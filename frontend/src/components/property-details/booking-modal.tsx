"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import bookingService from "@/services/booking.service";

interface BookingModalProps {
  propertyId: string;
  propertyName: string;
  rent: number;
  rentPeriod: "MONTHLY" | "YEARLY";
  securityDeposit: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({
  propertyId,
  propertyName,
  rent,
  rentPeriod,
  securityDeposit,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [checkInDate, setCheckInDate] = useState("");
  
  // For monthly properties, default to 1 month. For yearly, default to 12 months (1 year).
  const [expectedStayDuration, setExpectedStayDuration] = useState(rentPeriod === "YEARLY" ? "12" : "1");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const durationInMonths = Number(expectedStayDuration);
  const isYearly = rentPeriod === "YEARLY";

  const estimatedRent = useMemo(() => {
    if (!Number.isFinite(durationInMonths) || durationInMonths < 1) {
      return 0;
    }
    
    if (isYearly) {
      // For yearly, rent is per year. 12 months = 1 year.
      return rent * (durationInMonths / 12);
    }

    return rent * durationInMonths;
  }, [rent, durationInMonths, isYearly]);

  const estimatedTotal = estimatedRent + securityDeposit;

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!checkInDate) {
      setError("Please select a check-in date.");
      return;
    }

    if (!Number.isInteger(durationInMonths) || durationInMonths < 1 || durationInMonths > 24) {
      setError("Expected stay must be valid.");
      return;
    }

    try {
      setLoading(true);

      await bookingService.createBooking({
        propertyId,
        checkInDate: new Date(`${checkInDate}T00:00:00`).toISOString(),
        expectedStayMonths: durationInMonths,
      });

      onSuccess();
    } catch (error: any) {
      console.error("Failed to create booking:", error);
      setError(
        error?.response?.data?.message || "Failed to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Generate options based on rent period
  const durationOptions = isYearly 
    ? [ { label: "1 Year", value: 12 }, { label: "2 Years", value: 24 } ]
    : Array.from({ length: 24 }, (_, i) => ({ label: `${i + 1} Months`, value: i + 1 }));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close booking modal"
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
        >
          <X size={22} />
        </button>

        <div className="pr-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Book Property
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Start Your Booking</h2>
          <p className="mt-2 text-slate-500">{propertyName}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="check-in-date" className="mb-2 block text-sm font-semibold text-slate-700">
              Check-in Date
            </label>
            <input
              id="check-in-date"
              type="date"
              value={checkInDate}
              min={today}
              onChange={(e) => setCheckInDate(e.target.value)}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
            />
          </div>

          <div>
            <label htmlFor="stay-duration" className="mb-2 block text-sm font-semibold text-slate-700">
              Expected Stay
            </label>
            <select
              id="stay-duration"
              value={expectedStayDuration}
              onChange={(e) => setExpectedStayDuration(e.target.value)}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
            >
              {durationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Booking Summary
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">
                  {isYearly ? "Yearly Rent" : "Monthly Rent"}
                </span>
                <span className="font-bold text-slate-900">₹{rent.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Stay Duration</span>
                <span className="font-bold text-slate-900">
                  {isYearly ? `${durationInMonths / 12} Year(s)` : `${durationInMonths} Month(s)`}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Estimated Rent</span>
                <span className="font-bold text-slate-900">₹{estimatedRent.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500">Security Deposit</span>
                <span className="font-bold text-slate-900">₹{securityDeposit.toLocaleString("en-IN")}</span>
              </div>

              <div className="my-3 border-t border-slate-200" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-slate-900">Estimated Total</span>
                <span className="text-xl font-black text-blue-600">₹{estimatedTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
            {/* PAYMENT FROZEN NOTICE (PRD SCOPE) */}
            <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50/80 p-3.5 text-xs text-blue-900">
              <p className="font-bold flex items-center gap-1.5 text-blue-800">
                🔒 Zero Upfront Online Payment
              </p>
              <p className="mt-1 text-blue-700 leading-relaxed">
                Online gateway payment is disabled. Submitting this request reserves your booking with the host. Rent and security deposit are settled directly with the host upon physical check-in.
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-2xl border border-slate-200 py-3.5 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-bold text-white shadow-lg shadow-blue-200/50 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
