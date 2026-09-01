"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  User,
  XCircle,
  IndianRupee,
  Home,
} from "lucide-react";

import visitRequestService from "@/services/visit-request.service";
import bookingService from "@/services/booking.service";

import {
  OwnerVisitRequest,
  VisitStatus,
} from "@/types/api/visit-request";

import {
  OwnerBooking,
  BookingStatus,
} from "@/types/api/booking";

type FilterType =
  | "ALL"
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

function formatStatus(
  status: VisitStatus | BookingStatus
) {
  return status
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function getStatusClass(
  status: VisitStatus | BookingStatus
) {
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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function OwnerPage() {
  // ==========================================
  // VISIT REQUESTS
  // ==========================================

  const [requests, setRequests] =
    useState<OwnerVisitRequest[]>([]);

  const [loadingVisits, setLoadingVisits] =
    useState(true);

  const [visitError, setVisitError] =
    useState<string | null>(null);

  const [activeVisitFilter, setActiveVisitFilter] =
    useState<FilterType>("ALL");

  const [processingVisitId, setProcessingVisitId] =
    useState<string | null>(null);

  // ==========================================
  // BOOKING REQUESTS
  // ==========================================

  const [bookings, setBookings] =
    useState<OwnerBooking[]>([]);

  const [loadingBookings, setLoadingBookings] =
    useState(true);

  const [bookingError, setBookingError] =
    useState<string | null>(null);

  const [activeBookingFilter, setActiveBookingFilter] =
    useState<FilterType>("ALL");

  const [processingBookingId, setProcessingBookingId] =
    useState<string | null>(null);

  // ==========================================
  // LOAD VISIT REQUESTS
  // ==========================================

  async function loadVisitRequests() {
    try {
      setLoadingVisits(true);
      setVisitError(null);

      const data =
        await visitRequestService.getOwnerVisitRequests();

      setRequests(data);
    } catch (error: any) {
      console.error(
        "Failed to load owner visit requests:",
        error
      );

      setVisitError(
        error?.response?.data?.message ??
          "Failed to load visit requests."
      );
    } finally {
      setLoadingVisits(false);
    }
  }

  // ==========================================
  // LOAD BOOKING REQUESTS
  // ==========================================

  async function loadBookingRequests() {
    try {
      setLoadingBookings(true);
      setBookingError(null);

      const data =
        await bookingService.getOwnerBookings();

      setBookings(data);
    } catch (error: any) {
      console.error(
        "Failed to load owner booking requests:",
        error
      );

      setBookingError(
        error?.response?.data?.message ??
          "Failed to load booking requests."
      );
    } finally {
      setLoadingBookings(false);
    }
  }

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadVisitRequests();
    loadBookingRequests();
  }, []);

  // ==========================================
  // VISIT CONFIRM
  // ==========================================

  async function handleVisitConfirm(
    id: string
  ) {
    try {
      setProcessingVisitId(id);

      const updated =
        await visitRequestService.confirmVisitRequest(
          id
        );

      setRequests((current) =>
        current.map((request) =>
          request.id === id
            ? updated
            : request
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to confirm visit request:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to confirm visit request."
      );
    } finally {
      setProcessingVisitId(null);
    }
  }

  // ==========================================
  // VISIT REJECT
  // ==========================================

  async function handleVisitReject(
    id: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to reject this visit request?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingVisitId(id);

      const updated =
        await visitRequestService.rejectVisitRequest(
          id
        );

      setRequests((current) =>
        current.map((request) =>
          request.id === id
            ? updated
            : request
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to reject visit request:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to reject visit request."
      );
    } finally {
      setProcessingVisitId(null);
    }
  }

  // ==========================================
  // BOOKING CONFIRM
  // ==========================================

  async function handleBookingConfirm(
    id: string
  ) {
    try {
      setProcessingBookingId(id);

      const updated =
        await bookingService.confirmBooking(id);

      setBookings((current) =>
        current.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                ...updated,
                student:
                  booking.student,
                property:
                  booking.property,
              }
            : booking
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to confirm booking:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to confirm booking."
      );
    } finally {
      setProcessingBookingId(null);
    }
  }

  // ==========================================
  // BOOKING REJECT
  // ==========================================

  async function handleBookingReject(
    id: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to reject this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingBookingId(id);

      const updated =
        await bookingService.rejectBooking(id);

      setBookings((current) =>
        current.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                ...updated,
                student:
                  booking.student,
                property:
                  booking.property,
              }
            : booking
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to reject booking:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to reject booking."
      );
    } finally {
      setProcessingBookingId(null);
    }
  }

  // ==========================================
  // VISIT FILTER
  // ==========================================

  const filteredRequests = useMemo(() => {
    if (activeVisitFilter === "ALL") {
      return requests;
    }

    return requests.filter(
      (request) =>
        request.status === activeVisitFilter
    );
  }, [requests, activeVisitFilter]);

  // ==========================================
  // BOOKING FILTER
  // ==========================================

  const filteredBookings = useMemo(() => {
    if (activeBookingFilter === "ALL") {
      return bookings;
    }

    return bookings.filter(
      (booking) =>
        booking.status === activeBookingFilter
    );
  }, [
    bookings,
    activeBookingFilter,
  ]);

  // ==========================================
  // VISIT COUNTS
  // ==========================================

  const pendingVisitCount =
    requests.filter(
      (request) =>
        request.status === "PENDING"
    ).length;

  const confirmedVisitCount =
    requests.filter(
      (request) =>
        request.status === "CONFIRMED"
    ).length;

  const rejectedVisitCount =
    requests.filter(
      (request) =>
        request.status === "REJECTED"
    ).length;

  // ==========================================
  // BOOKING COUNTS
  // ==========================================

  const pendingBookingCount =
    bookings.filter(
      (booking) =>
        booking.status === "PENDING"
    ).length;

  const confirmedBookingCount =
    bookings.filter(
      (booking) =>
        booking.status === "CONFIRMED"
    ).length;

  const rejectedBookingCount =
    bookings.filter(
      (booking) =>
        booking.status === "REJECTED"
    ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-600">
              ZentStay Owner
            </p>

            <h1 className="mt-3 text-4xl font-black text-slate-900 md:text-5xl">
              Owner Dashboard
            </h1>

            <p className="mt-3 text-slate-500">
              Manage your visit requests and
              booking requests from one place.
            </p>
          </div>

          <Link
            href="/properties"
            className="
              w-fit
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              font-semibold
              text-slate-700
              transition
              hover:border-blue-600
              hover:text-blue-600
            "
          >
            View Properties
          </Link>

        </div>

        {/* ===================================== */}
        {/* OVERVIEW */}
        {/* ===================================== */}

        <section className="mb-12">

          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-900">
              Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quick summary of your current
              requests.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Pending Visits */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Pending Visits
                  </p>

                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {pendingVisitCount}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50">
                  <Clock3 className="h-6 w-6 text-yellow-600" />
                </div>

              </div>
            </div>

            {/* Confirmed Visits */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Confirmed Visits
                  </p>

                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {confirmedVisitCount}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                  <CalendarDays className="h-6 w-6 text-green-600" />
                </div>

              </div>
            </div>

            {/* Pending Bookings */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Pending Bookings
                  </p>

                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {pendingBookingCount}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                  <Home className="h-6 w-6 text-orange-600" />
                </div>

              </div>
            </div>

            {/* Confirmed Bookings */}

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Confirmed Bookings
                  </p>

                  <p className="mt-2 text-3xl font-black text-slate-900">
                    {confirmedBookingCount}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>

              </div>
            </div>

          </div>

        </section>

        {/* ===================================== */}
        {/* VISIT REQUESTS */}
        {/* ===================================== */}

        <section className="mb-14">

          <div className="mb-6">
            <h2 className="text-3xl font-black text-slate-900">
              Visit Requests
            </h2>

            <p className="mt-2 text-slate-500">
              Review students who want to visit
              your properties.
            </p>
          </div>

          {/* Visit Filters */}

          <div className="mb-8 flex flex-wrap gap-3">

            {(
              [
                ["ALL", "All"],
                ["PENDING", "Pending"],
                ["CONFIRMED", "Confirmed"],
                ["REJECTED", "Rejected"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() =>
                  setActiveVisitFilter(value)
                }
                className={`
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition
                  ${
                    activeVisitFilter === value
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                  }
                `}
              >
                {label}
              </button>
            ))}

          </div>

          {/* Visit Loading */}

          {loadingVisits && (
            <div className="flex min-h-[220px] items-center justify-center rounded-3xl bg-white shadow-sm">

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

                <p className="mt-4 font-medium text-slate-500">
                  Loading visit requests...
                </p>

              </div>

            </div>
          )}

          {/* Visit Error */}

          {!loadingVisits &&
            visitError && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

                <h3 className="text-xl font-bold text-red-700">
                  Failed to load visit requests
                </h3>

                <p className="mt-2 text-red-600">
                  {visitError}
                </p>

                <button
                  onClick={loadVisitRequests}
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

          {/* Visit Empty */}

          {!loadingVisits &&
            !visitError &&
            filteredRequests.length === 0 && (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                  <CalendarDays className="h-8 w-8 text-blue-600" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  No visit requests found
                </h3>

                <p className="mt-2 text-slate-500">
                  There are no requests under this
                  filter.
                </p>

              </div>
            )}

          {/* Visit Cards */}

          {!loadingVisits &&
            !visitError &&
            filteredRequests.length > 0 && (
              <div className="space-y-6">

                {filteredRequests.map(
                  (request) => (
                    <div
                      key={request.id}
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

                      {/* Student */}

                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>

                          <div>

                            <h3 className="text-xl font-black text-slate-900">
                              {request.student.name}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                              <Mail className="h-4 w-4" />
                              {request.student.email}
                            </div>

                          </div>

                        </div>

                        <span
                          className={`
                            inline-flex
                            w-fit
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-bold
                            ${getStatusClass(
                              request.status
                            )}
                          `}
                        >
                          {formatStatus(
                            request.status
                          )}
                        </span>

                      </div>

                      {/* Property */}

                      <div className="mt-7 rounded-2xl bg-slate-50 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Property
                        </p>

                        <h4 className="mt-2 text-xl font-bold text-slate-900">
                          {request.property.title}
                        </h4>

                        <div className="mt-2 flex items-center gap-2 text-slate-500">

                          <MapPin className="h-4 w-4 text-blue-600" />

                          <span>
                            {request.property.address},{" "}
                            {request.property.city}
                          </span>

                        </div>

                      </div>

                      {/* Visit Date / Time */}

                      <div className="mt-5 grid gap-4 md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 p-5">

                          <div className="flex items-center gap-3">

                            <CalendarDays className="h-5 w-5 text-blue-600" />

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Visit Date
                              </p>

                              <p className="mt-1 font-bold text-slate-900">
                                {formatDate(
                                  request.visitDate
                                )}
                              </p>

                            </div>

                          </div>

                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5">

                          <div className="flex items-center gap-3">

                            <Clock3 className="h-5 w-5 text-blue-600" />

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Visit Time
                              </p>

                              <p className="mt-1 font-bold text-slate-900">
                                {formatTime(
                                  request.visitDate
                                )}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* Message */}

                      {request.message && (
                        <div className="mt-5 rounded-2xl border border-slate-200 p-5">

                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Student Message
                          </p>

                          <p className="mt-2 leading-7 text-slate-600">
                            {request.message}
                          </p>

                        </div>
                      )}

                      {/* Visit Actions */}

                      {request.status ===
                        "PENDING" && (
                        <div className="mt-7 flex flex-wrap gap-3">

                          <button
                            onClick={() =>
                              handleVisitConfirm(
                                request.id
                              )
                            }
                            disabled={
                              processingVisitId ===
                              request.id
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              bg-green-600
                              px-6
                              py-3
                              font-semibold
                              text-white
                              transition
                              hover:bg-green-700
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            <CheckCircle2 className="h-5 w-5" />

                            {processingVisitId ===
                            request.id
                              ? "Processing..."
                              : "Confirm"}
                          </button>

                          <button
                            onClick={() =>
                              handleVisitReject(
                                request.id
                              )
                            }
                            disabled={
                              processingVisitId ===
                              request.id
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              border
                              border-red-200
                              px-6
                              py-3
                              font-semibold
                              text-red-600
                              transition
                              hover:bg-red-50
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            <XCircle className="h-5 w-5" />
                            Reject
                          </button>

                        </div>
                      )}

                    </div>
                  )
                )}

              </div>
            )}

        </section>

        {/* ===================================== */}
        {/* BOOKING REQUESTS */}
        {/* ===================================== */}

        <section>

          <div className="mb-6">
            <h2 className="text-3xl font-black text-slate-900">
              Booking Requests
            </h2>

            <p className="mt-2 text-slate-500">
              Review and manage students who want
              to book your properties.
            </p>
          </div>

          {/* Booking Filters */}

          <div className="mb-8 flex flex-wrap gap-3">

            {(
              [
                ["ALL", "All"],
                ["PENDING", "Pending"],
                ["CONFIRMED", "Confirmed"],
                ["REJECTED", "Rejected"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() =>
                  setActiveBookingFilter(value)
                }
                className={`
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition
                  ${
                    activeBookingFilter === value
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                  }
                `}
              >
                {label}
              </button>
            ))}

          </div>

          {/* Booking Loading */}

          {loadingBookings && (
            <div className="flex min-h-[220px] items-center justify-center rounded-3xl bg-white shadow-sm">

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

                <p className="mt-4 font-medium text-slate-500">
                  Loading booking requests...
                </p>

              </div>

            </div>
          )}

          {/* Booking Error */}

          {!loadingBookings &&
            bookingError && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

                <h3 className="text-xl font-bold text-red-700">
                  Failed to load booking requests
                </h3>

                <p className="mt-2 text-red-600">
                  {bookingError}
                </p>

                <button
                  onClick={loadBookingRequests}
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

          {/* Booking Empty */}

          {!loadingBookings &&
            !bookingError &&
            filteredBookings.length === 0 && (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  No booking requests found
                </h3>

                <p className="mt-2 text-slate-500">
                  There are no bookings under this
                  filter.
                </p>

              </div>
            )}

          {/* Booking Cards */}

          {!loadingBookings &&
            !bookingError &&
            filteredBookings.length > 0 && (
              <div className="space-y-6">

                {filteredBookings.map(
                  (booking) => (
                    <div
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

                      {/* Student + Status */}

                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>

                          <div>

                            <h3 className="text-xl font-black text-slate-900">
                              {booking.student.name}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">

                              <Mail className="h-4 w-4" />

                              {booking.student.email}

                            </div>

                          </div>

                        </div>

                        <span
                          className={`
                            inline-flex
                            w-fit
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-bold
                            ${getStatusClass(
                              booking.status
                            )}
                          `}
                        >
                          {formatStatus(
                            booking.status
                          )}
                        </span>

                      </div>

                      {/* Property */}

                      <div className="mt-7 rounded-2xl bg-slate-50 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Property
                        </p>

                        <h4 className="mt-2 text-xl font-bold text-slate-900">
                          {booking.property.title}
                        </h4>

                        <div className="mt-2 flex items-center gap-2 text-slate-500">

                          <MapPin className="h-4 w-4 text-blue-600" />

                          <span>
                            {booking.property.address},{" "}
                            {booking.property.city}
                          </span>

                        </div>

                      </div>

                      {/* Booking Details */}

                      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Check-in */}

                        <div className="rounded-2xl border border-slate-200 p-5">

                          <div className="flex items-center gap-3">

                            <CalendarDays className="h-5 w-5 text-blue-600" />

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Check-in
                              </p>

                              <p className="mt-1 font-bold text-slate-900">
                                {formatDate(
                                  booking.checkInDate
                                )}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* Stay */}

                        <div className="rounded-2xl border border-slate-200 p-5">

                          <div className="flex items-center gap-3">

                            <Clock3 className="h-5 w-5 text-blue-600" />

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Stay
                              </p>

                              <p className="mt-1 font-bold text-slate-900">
                                {
                                  booking.expectedStayMonths
                                }{" "}
                                {booking.expectedStayMonths ===
                                1
                                  ? "Month"
                                  : "Months"}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* Monthly Rent */}

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

                        {/* Security */}

                        <div className="rounded-2xl border border-slate-200 p-5">

                          <div className="flex items-center gap-3">

                            <IndianRupee className="h-5 w-5 text-blue-600" />

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Security
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

                      {/* Total */}

                      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                          <p className="text-sm font-semibold text-blue-700">
                            Total Booking Amount
                          </p>

                          <p className="mt-1 text-sm text-blue-600">
                            Rent for{" "}
                            {
                              booking.expectedStayMonths
                            }{" "}
                            months + security
                            deposit
                          </p>

                        </div>

                        <p className="text-2xl font-black text-blue-700">
                          {formatCurrency(
                            booking.totalAmount
                          )}
                        </p>

                      </div>

                      {/* Booking Actions */}

                      {booking.status ===
                        "PENDING" && (
                        <div className="mt-7 flex flex-wrap gap-3">

                          <button
                            onClick={() =>
                              handleBookingConfirm(
                                booking.id
                              )
                            }
                            disabled={
                              processingBookingId ===
                              booking.id
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              bg-green-600
                              px-6
                              py-3
                              font-semibold
                              text-white
                              transition
                              hover:bg-green-700
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >

                            <CheckCircle2 className="h-5 w-5" />

                            {processingBookingId ===
                            booking.id
                              ? "Processing..."
                              : "Confirm Booking"}

                          </button>

                          <button
                            onClick={() =>
                              handleBookingReject(
                                booking.id
                              )
                            }
                            disabled={
                              processingBookingId ===
                              booking.id
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              border
                              border-red-200
                              px-6
                              py-3
                              font-semibold
                              text-red-600
                              transition
                              hover:bg-red-50
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >

                            <XCircle className="h-5 w-5" />

                            Reject Booking

                          </button>

                        </div>
                      )}

                    </div>
                  )
                )}

              </div>
            )}

        </section>

      </div>
    </main>
  );
}