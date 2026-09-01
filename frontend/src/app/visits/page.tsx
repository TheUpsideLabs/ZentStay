"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";

import visitRequestService from "@/services/visit-request.service";
import {
  ApiVisitRequest,
  VisitStatus,
} from "@/types/api/visit-request";

function getStatusStyles(status: VisitStatus) {
  switch (status) {
    case "CONFIRMED":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";

    case "REJECTED":
      return "bg-rose-100 text-rose-700 border border-rose-200";

    case "CANCELLED":
      return "bg-slate-100 text-slate-600 border border-slate-200";

    case "COMPLETED":
      return "bg-blue-100 text-blue-700 border border-blue-200";

    default:
      return "bg-amber-100 text-amber-800 border border-amber-200";
  }
}

function formatStatus(status: VisitStatus) {
  switch (status) {
    case "PENDING":
      return "Pending Host Confirmation";
    case "CONFIRMED":
      return "Confirmed by Host";
    case "REJECTED":
      return "Host Unavailable";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
}

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

export default function VisitsPage() {
  const [visits, setVisits] = useState<
    ApiVisitRequest[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [cancellingId, setCancellingId] =
    useState<string | null>(null);

  async function loadVisits() {
    try {
      setLoading(true);
      setError(null);

      const data =
        await visitRequestService.getMyVisitRequests();

      setVisits(data);
    } catch (error: any) {
      console.error(
        "Failed to load visit requests:",
        error
      );

      setError(
        error?.response?.data?.message ??
          "Failed to load your visit requests."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVisits();
  }, []);

  async function handleCancel(id: string) {
    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this visit request?"
      );

    if (!confirmed) return;

    try {
      setCancellingId(id);

      await visitRequestService.deleteVisitRequest(
        id
      );

      setVisits((current) =>
        current.map((visit) =>
          visit.id === id
            ? {
                ...visit,
                status: "CANCELLED",
              }
            : visit
        )
      );
    } catch (error: any) {
      console.error(
        "Failed to cancel visit:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to cancel visit request."
      );
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-32">
        <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10">
          <p className="font-semibold uppercase tracking-[0.2em] text-blue-600">
            ZentStay
          </p>

          <h1 className="mt-3 text-4xl font-black text-slate-900 md:text-5xl">
            My Visits
          </h1>

          <p className="mt-3 text-slate-500">
            Track your property visit requests
            and their status.
          </p>
        </div>

        {/* Loading */}

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

              <p className="mt-4 font-medium text-slate-500">
                Loading your visits...
              </p>

            </div>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-xl font-bold text-red-700">
              Something went wrong
            </h2>

            <p className="mt-2 text-red-600">
              {error}
            </p>

            <button
              onClick={loadVisits}
              className="
                mt-6
                rounded-xl
                bg-red-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          visits.length === 0 && (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <CalendarDays className="h-8 w-8 text-blue-600" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No visit requests yet
              </h2>

              <p className="mt-2 text-slate-500">
                Find a property and request a
                visit to get started.
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

        {/* Visit Cards */}

        {!loading &&
          !error &&
          visits.length > 0 && (
            <div className="space-y-6">

              {visits.map((visit) => (
                <div
                  key={visit.id}
                  className="
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-sm
                    transition
                    hover:shadow-md
                  "
                >

                  <div className="p-6 md:p-8">

                    {/* Top */}

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                      <div>
                        <h2 className="text-2xl font-black text-slate-900">
                          {visit.property.title}
                        </h2>

                        <div className="mt-3 flex items-center gap-2 text-slate-500">
                          <MapPin className="h-4 w-4 text-blue-600" />

                          <span>
                            {visit.property.address},{" "}
                            {visit.property.city}
                          </span>
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
                          ${getStatusStyles(
                            visit.status
                          )}
                        `}
                      >
                        {formatStatus(
                          visit.status
                        )}
                      </span>

                    </div>

                    {/* Visit Information */}

                    <div className="mt-7 grid gap-4 md:grid-cols-3">

                      <div className="rounded-2xl bg-slate-50 p-5">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="h-5 w-5 text-blue-600" />

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Visit Date
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                              {formatDate(
                                visit.visitDate
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-5">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-blue-600" />

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Visit Time
                            </p>

                            <p className="mt-1 font-bold text-slate-900">
                              {formatTime(
                                visit.visitDate
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Monthly Rent
                        </p>

                        <p className="mt-1 text-xl font-black text-blue-600">
                          ₹
                          {visit.property.rent.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                    </div>

                    {/* Message */}

                    {visit.message && (
                      <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Your Message
                        </p>

                        <p className="mt-2 text-slate-600">
                          {visit.message}
                        </p>
                      </div>
                    )}

                    {/* Actions */}

                    <div className="mt-7 flex flex-wrap gap-3">

                      <Link
                        href={`/properties/${visit.propertyId}`}
                        className="
                          rounded-xl
                          bg-blue-600
                          px-5
                          py-3
                          font-semibold
                          text-white
                          transition
                          hover:bg-blue-700
                        "
                      >
                        View Property
                      </Link>

                      {visit.status ===
                        "PENDING" && (
                        <button
                          onClick={() =>
                            handleCancel(
                              visit.id
                            )
                          }
                          disabled={
                            cancellingId ===
                            visit.id
                          }
                          className="
                            rounded-xl
                            border
                            border-red-200
                            px-5
                            py-3
                            font-semibold
                            text-red-600
                            transition
                            hover:bg-red-50
                            disabled:opacity-50
                          "
                        >
                          {cancellingId ===
                          visit.id
                            ? "Cancelling..."
                            : "Cancel Visit"}
                        </button>
                      )}

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}