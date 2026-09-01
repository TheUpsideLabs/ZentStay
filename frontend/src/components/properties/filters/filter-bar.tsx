"use client";

import { Check, Zap, RotateCcw, SlidersHorizontal } from "lucide-react";
import { SortDropdown } from "./sort-dropdown";

interface FilterBarProps {
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean | ((prev: boolean) => boolean)) => void;

  availableOnly: boolean;
  setAvailableOnly: (value: boolean | ((prev: boolean) => boolean)) => void;

  rentPeriod: string;
  setRentPeriod: (value: string) => void;

  gender: string;
  setGender: (value: string) => void;

  roomType: string;
  setRoomType: (value: string) => void;

  furnishing: string;
  setFurnishing: (value: string) => void;

  minRent: string;
  setMinRent: (value: string) => void;

  maxRent: string;
  setMaxRent: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  clearAllFilters: () => void;
  hasActiveFilters: boolean;
}

export function FilterBar({
  verifiedOnly,
  setVerifiedOnly,

  availableOnly,
  setAvailableOnly,

  rentPeriod,
  setRentPeriod,

  gender,
  setGender,

  roomType,
  setRoomType,

  furnishing,
  setFurnishing,

  minRent,
  setMinRent,

  maxRent,
  setMaxRent,

  sort,
  setSort,

  clearAllFilters,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all sm:p-6">
      {/* Top Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="hidden items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 sm:inline-flex">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters:
        </span>

        {/* Verified Toggle */}
        <button
          type="button"
          onClick={() => setVerifiedOnly((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            verifiedOnly
              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
              : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Check className={`h-3.5 w-3.5 ${verifiedOnly ? "text-white" : "text-blue-600"}`} />
          Verified Only
        </button>

        {/* Available Now Toggle */}
        <button
          type="button"
          onClick={() => setAvailableOnly((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            availableOnly
              ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30"
              : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Zap className={`h-3.5 w-3.5 ${availableOnly ? "text-white" : "text-emerald-600"}`} />
          Available Now
        </button>

        {/* Rent Period Dropdown */}
        <select
          value={rentPeriod}
          onChange={(e) => setRentPeriod(e.target.value)}
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 outline-none transition hover:bg-slate-100 focus:border-blue-500"
        >
          <option value="">Rent: All Periods</option>
          <option value="MONTHLY">Monthly Stays</option>
          <option value="YEARLY">Yearly Stays</option>
        </select>

        {/* Gender Dropdown */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 outline-none transition hover:bg-slate-100 focus:border-blue-500"
        >
          <option value="">Gender: All Types</option>
          <option value="BOYS">Boys Only</option>
          <option value="GIRLS">Girls Only</option>
          <option value="UNISEX">Unisex / Co-living</option>
        </select>

        {/* Room Type Dropdown */}
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 outline-none transition hover:bg-slate-100 focus:border-blue-500"
        >
          <option value="">Room: All Types</option>
          <option value="SINGLE">Single Occupancy</option>
          <option value="DOUBLE">Double Sharing</option>
          <option value="TRIPLE">Triple Sharing</option>
        </select>

        {/* Furnishing Dropdown */}
        <select
          value={furnishing}
          onChange={(e) => setFurnishing(e.target.value)}
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 outline-none transition hover:bg-slate-100 focus:border-blue-500"
        >
          <option value="">Furnishing: All</option>
          <option value="FURNISHED">Furnished</option>
          <option value="SEMI_FURNISHED">Semi-Furnished</option>
          <option value="UNFURNISHED">Unfurnished</option>
        </select>
      </div>

      {/* Bottom Row: Budget Inputs + Sorting + Reset Button */}
      <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Budget:</span>
          <input
            type="number"
            min="0"
            placeholder="Min ₹"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            className="w-24 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
          />
          <span className="text-slate-400">—</span>
          <input
            type="number"
            min="0"
            placeholder="Max ₹"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="w-24 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="ml-2 inline-flex items-center gap-1 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>
    </div>
  );
}