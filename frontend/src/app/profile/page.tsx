"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context";
import { User, CalendarCheck, Heart, MessageSquare, Bell } from "lucide-react";

import { StudentBookings } from "@/components/student/student-bookings";
import { StudentWishlist } from "@/components/student/student-wishlist";
import { StudentReviews } from "@/components/student/student-reviews";
import { StudentNotifications } from "@/components/student/student-notifications";

export default function StudentProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'reviews' | 'notifications'>('bookings');

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = window.setTimeout(() => {
        if (!localStorage.getItem("accessToken")) {
          router.replace("/login");
        }
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: CalendarCheck },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'reviews', label: 'My Reviews', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-5">
      <div className="mx-auto max-w-5xl">
        
        {/* Profile Header */}
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl font-bold uppercase">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <p className="mt-1 text-slate-500">{user.email}</p>
              <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {user.role}
              </span>
            </div>
          </div>
          <div>
            <button
              onClick={() => logout()}
              className="rounded-2xl border border-red-200 bg-red-50 px-6 py-3 font-bold text-red-600 transition hover:bg-red-100"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex overflow-x-auto no-scrollbar gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-semibold transition ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'bookings' && <StudentBookings />}
          {activeTab === 'wishlist' && <StudentWishlist />}
          {activeTab === 'reviews' && <StudentReviews />}
          {activeTab === 'notifications' && <StudentNotifications />}
        </div>

      </div>
    </div>
  );
}
