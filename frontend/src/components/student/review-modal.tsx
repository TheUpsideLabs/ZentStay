"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import reviewService from "@/services/review.service";

interface ReviewModalProps {
  propertyId: string;
  propertyName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReviewModal({
  propertyId,
  propertyName,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await reviewService.createReview({
        propertyId,
        rating,
        comment,
      });

      onSuccess();
    } catch (err: any) {
      console.error("Failed to submit review:", err);
      setError(
        err?.response?.data?.message ??
          "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-2xl">
        
        {/* Header */}
        <div className="border-b border-slate-100 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">
              Rate your stay
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-50 p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Tell us about your experience at{" "}
            <span className="font-semibold text-slate-900">{propertyName}</span>
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          
          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Star Rating */}
          <div className="mb-8 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-slate-100 text-slate-200"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Comment */}
          <div className="mb-8">
            <label
              htmlFor="comment"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Your Review
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about the property?"
              className="w-full resize-none rounded-2xl border-2 border-slate-200 p-4 outline-none transition focus:border-blue-600"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
