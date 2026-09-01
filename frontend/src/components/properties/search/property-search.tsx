"use client";

import { MapPin, Search, X } from "lucide-react";

interface PropertySearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export function PropertySearch({
  search,
  setSearch,
}: PropertySearchProps) {
  return (
    <section className="mb-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-md shadow-slate-100 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Search className="h-5 w-5" />
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city (e.g. Bangalore), area (Koramangala), college (AKGEC), or pincode..."
            className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
          />

          {search.length > 0 && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}