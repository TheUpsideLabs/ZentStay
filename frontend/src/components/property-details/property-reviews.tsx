"use client";

import { Star, ShieldCheck, Sparkles } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  reviews: Review[];
}

export function PropertyReviews({ reviews }: Props) {
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";

  return (
    <section className="rounded-[32px] bg-white p-6 shadow-sm sm:p-8">
      {/* Header with Average Rating */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Sparkles className="h-3 w-3" />
            Tenant Experiences
          </span>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            Verified Reviews & Ratings
          </h2>
        </div>

        {totalReviews > 0 && (
          <div className="flex items-center gap-3 rounded-2xl bg-amber-50/80 px-5 py-3 border border-amber-200/60">
            <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            <div>
              <p className="text-xl font-black text-amber-900 leading-tight">
                {averageRating} <span className="text-xs font-bold text-amber-600">/ 5.0</span>
              </p>
              <p className="text-[11px] font-semibold text-amber-700">
                {totalReviews} verified {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        )}
      </div>

      {totalReviews === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50/70 p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Star className="h-7 w-7 text-slate-300" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-800">
            No reviews published yet
          </h3>
          <p className="mx-auto mt-1.5 max-w-md text-xs text-slate-500 leading-relaxed">
            Reviews are submitted exclusively by verified tenants after completing their stay.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-sm">
                    T
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">Verified Tenant</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        <ShieldCheck className="h-3 w-3" />
                        Completed Stay
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 border border-amber-200/50">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-800">
                    {review.rating}.0
                  </span>
                </div>
              </div>

              <p className="mt-3.5 text-xs text-slate-600 leading-relaxed sm:text-sm">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}