"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  Clock3,
  Home,
  IndianRupee,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { ReviewModal } from "@/components/student/review-modal";

import bookingService from "@/services/booking.service";
import { Booking } from "@/types/api/booking";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStatusClass(status: Booking["status"]) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    case "CANCELLED":
      return "bg-slate-100 text-slate-600";

    case "COMPLETED":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function getStatusIcon(status: Booking["status"]) {
  switch (status) {
    case "CONFIRMED":
      return <CheckCircle2 className="h-4 w-4" />;

    case "REJECTED":
      return <XCircle className="h-4 w-4" />;

    case "CANCELLED":
      return <XCircle className="h-4 w-4" />;

    case "COMPLETED":
      return <CheckCircle2 className="h-4 w-4" />;

    default:
      return <AlertCircle className="h-4 w-4" />;
  }
}

function formatStatus(status: Booking["status"]) {
  return status
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "CONFIRMED" | "COMPLETED">("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [reviewModalData, setReviewModalData] = useState<{ propertyId: string; propertyName: string } | null>(null);

  async function loadBookings() {
    try {
      setLoading(true);
      setError(null);

      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error: any) {
      console.error("Failed to load bookings:", error);
      setError(
        error?.response?.data?.message ??
          "Failed to load your bookings."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelBooking(id: string) {
    const confirmed = window.confirm("Are you sure you want to cancel this booking request?");
    if (!confirmed) return;

    try {
      setCancellingId(id);
      await bookingService.deleteBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" as any } : b))
      );
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setCancellingId(null);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "PENDING") return b.status === "PENDING";
    if (activeTab === "CONFIRMED") return b.status === "CONFIRMED";
    if (activeTab === "COMPLETED") return b.status === "COMPLETED";
    return true;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-600">
              ZentStay Seeker Portal
            </p>

            <h1 className="mt-2 text-4xl font-black text-slate-900 md:text-5xl">
              My Bookings
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your accommodation reservations and status.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-1.5 border border-slate-200 text-xs font-bold">
            {(
              [
                { label: "All Bookings", value: "ALL" },
                { label: "Awaiting Host", value: "PENDING" },
                { label: "Confirmed", value: "CONFIRMED" },
                { label: "Past Stays", value: "COMPLETED" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-xl px-3.5 py-2 transition-all ${
                  activeTab === tab.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white shadow-sm">
            <div className="text-center">

              <div
                className="
                  mx-auto
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-slate-200
                  border-t-blue-600
                "
              />

              <p className="mt-4 text-slate-500">
                Loading your bookings...
              </p>

            </div>
          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

            <XCircle className="mx-auto h-10 w-10 text-red-600" />

            <h2 className="mt-4 text-xl font-bold text-red-700">
              Failed to load bookings
            </h2>

            <p className="mt-2 text-red-600">
              {error}
            </p>

            <button
              onClick={loadBookings}
              className="
                mt-6
                rounded-xl
                bg-red-600
                px-6
                py-3
                font-semibold
                text-white
                hover:bg-red-700
              "
            >
              Try Again
            </button>

          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading &&
          !error &&
          bookings.length === 0 && (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <Home className="h-8 w-8 text-blue-600" />
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-900">
                No bookings yet
              </h2>

              <p className="mt-2 text-slate-500">
                You haven't requested any property bookings yet.
              </p>

              <Link
                href="/properties"
                className="
                  mt-6
                  inline-flex
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                Explore Properties
              </Link>

            </div>
          )}

        {/* ================= BOOKINGS ================= */}

        {!loading &&
          !error &&
          filteredBookings.length > 0 && (
            <div className="space-y-6">

              {filteredBookings.map((booking) => {

                /*
                 * IMPORTANT:
                 * property is optional in the frontend TypeScript type.
                 * We safely access it using optional chaining.
                 */

                const property = booking.property;

                return (
                  <article
                    key={booking.id}
                    className="
                      rounded-3xl
                      bg-white
                      p-6
                      shadow-sm
                      transition
                      hover:shadow-md
                      md:p-8
                    "
                  >

                    {/* ================= TOP ================= */}

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                      <div>

                        <div className="flex items-center gap-3">

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                            <Home className="h-6 w-6 text-blue-600" />
                          </div>

                          <div>

                            <h2 className="text-2xl font-black text-slate-900">
                              {property?.title ?? "Property"}
                            </h2>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">

                              <MapPin className="h-4 w-4 text-blue-600" />

                              <span>
                                {property?.address ?? "Address"}

                                {property?.city
                                  ? `, ${property.city}`
                                  : ""}
                              </span>

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* ================= STATUS ================= */}

                      <div
                        className={`
                          inline-flex
                          w-fit
                          items-center
                          gap-2
                          rounded-full
                          px-4
                          py-2
                          text-sm
                          font-bold
                          ${getStatusClass(booking.status)}
                        `}
                      >
                        {getStatusIcon(booking.status)}

                        {formatStatus(booking.status)}
                      </div>

                    </div>

                    {/* ================= DETAILS ================= */}

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                      {/* CHECK IN */}

                      <div className="rounded-2xl border border-slate-200 p-5">

                        <div className="flex items-center gap-3">

                          <CalendarDays className="h-5 w-5 text-blue-600" />

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Check-in
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                              {formatDate(booking.checkInDate)}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* STAY */}

                      <div className="rounded-2xl border border-slate-200 p-5">

                        <div className="flex items-center gap-3">

                          <Clock3 className="h-5 w-5 text-blue-600" />

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Stay Duration
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                              {booking.expectedStayMonths}{" "}
                              {booking.expectedStayMonths === 1
                                ? "Month"
                                : "Months"}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* RENT */}

                      <div className="rounded-2xl border border-slate-200 p-5">

                        <div className="flex items-center gap-3">

                          <IndianRupee className="h-5 w-5 text-blue-600" />

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Monthly Rent
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                              {formatCurrency(
                                booking.rentAtBooking
                              )}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* SECURITY */}

                      <div className="rounded-2xl border border-slate-200 p-5">

                        <div className="flex items-center gap-3">

                          <IndianRupee className="h-5 w-5 text-blue-600" />

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Security Deposit
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                              {formatCurrency(
                                booking.securityDeposit
                              )}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* ================= TOTAL & PAYMENT NOTICE ================= */}

                    <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="font-bold text-blue-800">
                          Total Move-in Cost (Rent + Security)
                        </p>

                        <p className="mt-0.5 text-xs text-blue-600">
                          🔒 Zero online deduction. Settled directly with the host upon check-in.
                        </p>

                      </div>

                      <p className="text-2xl font-black text-blue-700">
                        {formatCurrency(booking.totalAmount)}
                      </p>

                    </div>

                    {/* ================= STATUS BANNERS ================= */}

                    {booking.status === "CONFIRMED" && (
                      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5">

                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <div>

                          <p className="font-bold text-green-700">
                            Booking Confirmed by Host! 🎉
                          </p>

                          <p className="mt-1 text-sm text-green-600">
                            Your reservation is confirmed. Please connect with the property host for key handover and check-in.
                          </p>

                        </div>

                      </div>
                    )}

                    {booking.status === "PENDING" && (
                      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />

                        <div>

                          <p className="font-bold text-yellow-700">
                            Awaiting Host Confirmation
                          </p>

                          <p className="mt-1 text-sm text-yellow-600">
                            Your reservation request has been submitted to the host. You will receive an update once reviewed.
                          </p>

                        </div>

                      </div>
                    )}

                    {booking.status === "REJECTED" && (
                      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">

                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                        <div>

                          <p className="font-bold text-red-700">
                            Booking Request Declined
                          </p>

                          <p className="mt-1 text-sm text-red-600">
                            The host is unable to accept reservations for this period. You can explore other verified stays nearby.
                          </p>

                        </div>

                      </div>
                    )}

                    {booking.status === "CANCELLED" && (
                      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

                        <div>

                          <p className="font-bold text-slate-700">
                            Booking Cancelled
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            This reservation request has been cancelled.
                          </p>

                        </div>

                      </div>
                    )}

                    {/* ================= ACTIONS ================= */}

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                      {booking.propertyId && (
                        <Link
                          href={`/properties/${booking.propertyId}`}
                          className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600"
                        >
                          View Property
                        </Link>
                      )}

                      {booking.status === "PENDING" && (
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancellingId === booking.id}
                          className="rounded-xl border border-red-200 px-5 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {cancellingId === booking.id ? "Cancelling..." : "Cancel Booking Request"}
                        </button>
                      )}

                      {booking.status === "COMPLETED" && (
                        <button
                          type="button"
                          onClick={() => setReviewModalData({
                            propertyId: booking.propertyId,
                            propertyName: property?.title || "Property"
                          })}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Write Review
                        </button>
                      )}
                    </div>

                  </article>
                );
              })}

            </div>
          )}

      </div>
    </main>
    <Footer />
    
    {reviewModalData && (
      <ReviewModal
        propertyId={reviewModalData.propertyId}
        propertyName={reviewModalData.propertyName}
        onClose={() => setReviewModalData(null)}
        onSuccess={() => {
          setReviewModalData(null);
          // Optional: refetch or show success alert
          alert("Review submitted successfully! You can see it in your profile.");
        }}
      />
    )}
    </>
  );
}