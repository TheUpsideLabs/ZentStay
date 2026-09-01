"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import notificationService from "@/services/notification.service";
import { Notification } from "@/types/api/notification";

export function OwnerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        const data = await notificationService.getMyNotifications();
        setNotifications(data);
      } catch (err: any) {
        setError(err.message || "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    }
    loadNotifications();
  }, []);

  async function markAsRead(id: string) {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  }

  async function markAllAsRead() {
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  }

  if (loading) {
    return (
      <section className="mt-20">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">Notifications</h2>
        <div className="flex h-32 items-center justify-center rounded-3xl border border-slate-200 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-20">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">Notifications</h2>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <p className="mt-1 text-slate-500">Updates and alerts regarding your properties</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <Bell size={32} />
          </div>
          <h3 className="mt-6 text-xl font-bold text-slate-900">All Caught Up</h3>
          <p className="mt-2 text-slate-500">You have no new notifications.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`flex items-start justify-between rounded-2xl border p-6 transition-all ${
                notification.isRead ? "border-slate-200 bg-white" : "border-blue-100 bg-blue-50 shadow-sm"
              }`}
            >
              <div>
                <h4 className="text-lg font-bold text-slate-900">{notification.title}</h4>
                <p className="mt-1 text-slate-600">{notification.message}</p>
                <p className="mt-3 text-xs font-medium text-slate-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              
              {!notification.isRead && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="flex items-center justify-center rounded-full text-blue-600 hover:text-blue-800 transition"
                  title="Mark as read"
                >
                  <CheckCircle2 size={24} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
