"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Clock3,
  Loader2,
  Trash2,
  XCircle,
} from "lucide-react";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";
import { useNotifications } from "@/context";
import { Notification } from "@/types/api/notification";

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    loading,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);

  const filteredNotifications = useMemo(() => {
    if (activeTab === "UNREAD") return notifications.filter((n) => !n.isRead);
    if (activeTab === "READ") return notifications.filter((n) => n.isRead);
    return notifications;
  }, [notifications, activeTab]);

  // ==========================================
  // REFRESH
  // ==========================================

  async function handleRefresh() {
    try {
      setError(null);
      await refreshNotifications();
    } catch (error: any) {
      console.error(
        "Failed to refresh notifications:",
        error
      );

      setError(
        error?.response?.data?.message ??
          "Failed to load notifications."
      );
    }
  }

  // ==========================================
  // MARK ONE AS READ
  // ==========================================

  async function handleMarkAsRead(
    notificationId: string
  ) {
    try {
      setError(null);
      setProcessingId(notificationId);

      await markAsRead(notificationId);
    } catch (error: any) {
      console.error(
        "Failed to mark notification as read:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to mark notification as read."
      );
    } finally {
      setProcessingId(null);
    }
  }

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  async function handleMarkAllAsRead() {
    try {
      setError(null);
      setMarkingAll(true);

      await markAllAsRead();
    } catch (error: any) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to mark all notifications as read."
      );
    } finally {
      setMarkingAll(false);
    }
  }

  // ==========================================
  // DELETE
  // ==========================================

  async function handleDelete(
    notificationId: string
  ) {
    try {
      setError(null);
      setProcessingId(notificationId);

      await deleteNotification(
        notificationId
      );
    } catch (error: any) {
      console.error(
        "Failed to delete notification:",
        error
      );

      alert(
        error?.response?.data?.message ??
          "Failed to delete notification."
      );
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">

          {/* ================= HEADER ================= */}

          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                    Activity & Updates
                  </p>

                  <h1 className="text-4xl font-black text-slate-900">
                    Notifications
                  </h1>
                </div>

              </div>

              <p className="mt-4 text-slate-500">
                Stay updated about your visits, booking requests, and property activity.
              </p>
            </div>

            {/* ================= ACTIONS & MARK ALL ================= */}

            <div className="flex flex-wrap items-center gap-3">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  disabled={markingAll}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    shadow-md
                    shadow-blue-500/20
                    transition
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {markingAll ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCheck className="h-3.5 w-3.5" />
                  )}

                  {markingAll ? "Updating..." : "Mark all as read"}
                </button>
              )}
            </div>

          </div>

          {/* ================= FILTER TABS ================= */}

          <div className="mb-6 flex gap-2 rounded-2xl bg-white p-1.5 border border-slate-200 text-xs font-bold w-fit">
            {(
              [
                { label: "All", value: "ALL" },
                { label: `Unread (${unreadCount})`, value: "UNREAD" },
                { label: "Read", value: "READ" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-xl px-4 py-2 transition-all ${
                  activeTab === tab.value
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600" />

              <p className="font-semibold text-red-700">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="
                mt-4
                rounded-xl
                bg-red-600
                px-5
                py-2
                font-semibold
                text-white
                hover:bg-red-700
              "
            >
              Try Again
            </button>

          </div>
        )}

        {/* ================= UNREAD COUNT ================= */}

        {!loading &&
          !error &&
          notifications.length > 0 && (
            <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">

              <div className="flex items-center justify-between">

                <p className="font-semibold text-blue-700">
                  {unreadCount === 0
                    ? "You're all caught up!"
                    : `${unreadCount} unread ${
                        unreadCount === 1
                          ? "notification"
                          : "notifications"
                      }`}
                </p>

                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                  {notifications.length} Total
                </span>

              </div>

            </div>
          )}

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white shadow-sm">

            <div className="text-center">

              <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />

              <p className="mt-4 text-slate-500">
                Loading notifications...
              </p>

            </div>

          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading &&
          !error &&
          filteredNotifications.length === 0 && (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <Bell className="h-8 w-8 text-blue-600" />
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-900">
                {activeTab === "UNREAD" ? "No unread notifications" : "No notifications"}
              </h2>

              <p className="mt-2 text-slate-500">
                {activeTab === "UNREAD"
                  ? "You have read all your notifications."
                  : "You're all caught up. New activity will appear here."}
              </p>

            </div>
          )}

        {/* ================= NOTIFICATIONS ================= */}

        {!loading &&
          !error &&
          filteredNotifications.length > 0 && (
            <div className="space-y-4">

              {filteredNotifications.map(
                (notification: Notification) => {

                  const isProcessing =
                    processingId ===
                    notification.id;

                  return (
                    <article
                      key={notification.id}
                      className={`
                        rounded-3xl
                        border
                        p-5
                        transition
                        sm:p-6
                        ${
                          notification.isRead
                            ? "border-slate-200 bg-white"
                            : "border-blue-200 bg-blue-50/60 shadow-sm"
                        }
                      `}
                    >

                      <div className="flex gap-4">

                        {/* ================= ICON ================= */}

                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            ${
                              notification.isRead
                                ? "bg-slate-100 text-slate-500"
                                : "bg-blue-100 text-blue-600"
                            }
                          `}
                        >
                          <Bell className="h-5 w-5" />
                        </div>

                        {/* ================= CONTENT ================= */}

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                            <div>

                              <div className="flex items-center gap-2">

                                <h2
                                  className={`
                                    text-lg
                                    ${
                                      notification.isRead
                                        ? "font-semibold text-slate-800"
                                        : "font-black text-slate-900"
                                    }
                                  `}
                                >
                                  {notification.title}
                                </h2>

                                {!notification.isRead && (
                                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                )}

                              </div>

                              <p className="mt-2 leading-6 text-slate-600">
                                {notification.message}
                              </p>

                            </div>

                          </div>

                          {/* ================= DATE ================= */}

                          <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">

                            <Clock3 className="h-4 w-4" />

                            <span>
                              {formatDate(
                                notification.createdAt
                              )}
                            </span>

                          </div>

                          {/* ================= ACTIONS ================= */}

                          <div className="mt-5 flex flex-wrap gap-3">

                            {!notification.isRead && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleMarkAsRead(
                                    notification.id
                                  )
                                }
                                disabled={isProcessing}
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  border
                                  border-blue-200
                                  bg-white
                                  px-4
                                  py-2
                                  text-sm
                                  font-semibold
                                  text-blue-600
                                  transition
                                  hover:bg-blue-50
                                  disabled:cursor-not-allowed
                                  disabled:opacity-60
                                "
                              >
                                {isProcessing ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}

                                Mark as read
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  notification.id
                                )
                              }
                              disabled={isProcessing}
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-red-200
                                bg-white
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-red-600
                                transition
                                hover:bg-red-50
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                              "
                            >
                              {isProcessing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}

                              Delete
                            </button>

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          )}

      </div>
    </main>
    <Footer />
    </>
  );
}