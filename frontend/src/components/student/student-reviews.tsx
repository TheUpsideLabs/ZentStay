"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import reviewService, { ReviewResponse } from "@/services/review.service";

export function StudentReviews() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const data = await reviewService.getMyReviews();
        setReviews(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-yellow-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          <MessageSquare size={32} />
        </div>
        <h3 className="mt-6 text-xl font-bold text-slate-900">No Reviews Made</h3>
        <p className="mt-2 text-slate-500">You haven't left any property reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {reviews.map((review) => (
        <div key={review.id} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-slate-200"} />
                ))}
              </div>
              <span className="text-xs font-medium text-slate-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-sm font-semibold text-blue-600 mb-2">{review.property?.title}</p>
            <p className="text-slate-700 italic">&quot;{review.comment}&quot;</p>
          </div>
        </div>
      ))}
    </div>
  );
}
