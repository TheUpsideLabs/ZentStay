"use client";

import { Star } from "lucide-react";

const ratings = [5, 4, 3];

export function RatingFilter() {
  return (
    <div className="space-y-3">
      {ratings.map((rating) => (
        <button
          key={rating}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-slate-50"
        >
          {Array.from({ length: rating }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}

          <span className="text-sm text-slate-600">
            & Up
          </span>
        </button>
      ))}
    </div>
  );
}