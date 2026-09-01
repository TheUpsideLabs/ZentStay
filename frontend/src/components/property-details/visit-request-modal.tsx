"use client";

import { useState } from "react";
import { X, Calendar, Clock, Phone, MessageSquare, Sparkles } from "lucide-react";

import visitRequestService from "@/services/visit-request.service";

interface VisitRequestModalProps {
  propertyId: string;
  propertyName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function VisitRequestModal({
  propertyId,
  propertyName,
  onClose,
  onSuccess,
}: VisitRequestModalProps) {
  const [visitDate, setVisitDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (10:00 AM - 1:00 PM)");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!visitDate) {
      setError("Please select a preferred visit date.");
      return;
    }

    if (phone && !/^[0-9+ -]{10,14}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);

      const formattedMessage = [
        `[Preferred Slot: ${timeSlot}]`,
        phone.trim() ? `[Phone: ${phone.trim()}]` : null,
        message.trim() ? message.trim() : null,
      ]
        .filter(Boolean)
        .join(" — ");

      await visitRequestService.createVisitRequest({
        propertyId,
        visitDate: new Date(`${visitDate}T10:00:00`).toISOString(),
        message: formattedMessage || undefined,
      });

      onSuccess();
    } catch (error: any) {
      console.error("Failed to create visit request:", error);
      setError(
        error?.response?.data?.message ||
          "Failed to send visit request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Sparkles className="h-3 w-3" />
            Zero-Commitment Visit
          </span>

          <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Schedule a Physical Visit
          </h2>

          <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
            {propertyName}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs font-semibold sm:text-sm">
          {/* Visit Date */}
          <div>
            <label className="mb-1.5 block text-slate-700">
              <span className="flex items-center gap-1.5 font-bold">
                <Calendar className="h-4 w-4 text-blue-600" />
                Preferred Visit Date
              </span>
            </label>
            <input
              type="date"
              value={visitDate}
              min={today}
              onChange={(e) => setVisitDate(e.target.value)}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Preferred Time Slot */}
          <div>
            <label className="mb-1.5 block text-slate-700">
              <span className="flex items-center gap-1.5 font-bold">
                <Clock className="h-4 w-4 text-blue-600" />
                Preferred Time Slot
              </span>
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white cursor-pointer"
            >
              <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
              <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
              <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
            </select>
          </div>

          {/* Contact Phone */}
          <div>
            <label className="mb-1.5 block text-slate-700">
              <span className="flex items-center gap-1.5 font-bold">
                <Phone className="h-4 w-4 text-blue-600" />
                Contact Phone Number
              </span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Optional Message */}
          <div>
            <label className="mb-1.5 block text-slate-700">
              <span className="flex items-center gap-1.5 font-bold">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                Note for Property Host <span className="font-normal text-slate-400">(Optional)</span>
              </span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="E.g., I'm coming with a friend to inspect double-sharing rooms..."
              rows={3}
              disabled={loading}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-2xl border border-slate-200 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Scheduling..." : "Confirm Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}