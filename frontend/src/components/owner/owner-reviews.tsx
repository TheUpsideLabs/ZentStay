"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import reviewService, { ReviewResponse } from "@/services/review.service";

export function OwnerReviews() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const data = await reviewService.getOwnerReviews();
        setReviews(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900">Tenant Reviews & Reputation</h2>
        </div>
        <div className="flex h-32 items-center justify-center rounded-3xl border border-slate-200 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900">Tenant Reviews & Reputation</h2>
        </div>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm font-semibold text-red-600">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Sparkles className="h-3 w-3" />
            Reputation Management
          </span>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Tenant Reviews & Feedback</h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">Authentic ratings from tenants who completed their stays</p>
        </div>

        {totalReviews > 0 && (
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/70 px-5 py-3 shadow-sm">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <div>
              <p className="text-base font-black text-amber-900 leading-tight">
                {averageRating} <span className="text-xs font-bold text-amber-600">/ 5.0</span>
              </p>
              <p className="text-[11px] font-semibold text-amber-700">
                {totalReviews} verified {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <MessageSquare size={28} />
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900">No Reviews Published Yet</h3>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-500 leading-relaxed">
            Reviews will automatically populate here as tenants complete their stays and leave ratings.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md">
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-amber-400" : "text-slate-200"} />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
                
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">{review.property.title}</p>
                <p className="text-xs text-slate-700 leading-relaxed italic sm:text-sm">"{review.comment}"</p>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                <div>
                  <p className="font-bold text-slate-900">{review.student.name}</p>
                  <p className="text-[11px] text-slate-400">{review.student.email}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

