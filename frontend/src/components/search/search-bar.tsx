"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  GraduationCap,
  IndianRupee,
  Users,
  Navigation,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [locating, setLocating] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("search", search.trim());
    }
    if (gender) {
      params.set("gender", gender);
    }
    if (budgetRange) {
      if (budgetRange === "under-8k") {
        params.set("maxRent", "8000");
      } else if (budgetRange === "8k-12k") {
        params.set("minRent", "8000");
        params.set("maxRent", "12000");
      } else if (budgetRange === "12k-plus") {
        params.set("minRent", "12000");
      }
    }

    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      router.push("/properties");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocating(false);
        // Navigate to properties with location intent
        router.push("/properties");
      },
      () => {
        setLocating(false);
        router.push("/properties");
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="mt-8 w-full">
      {/* Top Meta Bar: Mode Switcher & College Route */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Sparkles className="h-3 w-3" />
            Find Verified PGs & Stays
          </span>
        </div>

        <Link
          href="/colleges"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
        >
          <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
          <span>🎓 Search by College</span>
        </Link>
      </div>

      {/* Main Search Card Form */}
      <form
        onSubmit={handleSearch}
        className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/50 transition-all md:p-6"
      >
        {/* Universal Search Input */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
          <MapPin className="h-5 w-5 shrink-0 text-blue-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city, area, college or pincode (e.g. Koramangala, Ghaziabad, AKGEC)..."
            className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
          />
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={locating}
            title="Use current location"
            className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition"
          >
            <Navigation className={`h-3 w-3 text-blue-600 ${locating ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{locating ? "Locating..." : "Near Me"}</span>
          </button>
        </div>

        {/* Filters Row + Submit Button */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Budget Dropdown */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <IndianRupee className="h-4 w-4 shrink-0 text-slate-400" />
            <div className="w-full">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Budget
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer"
              >
                <option value="">Any Budget</option>
                <option value="under-8k">Under ₹8,000 / mo</option>
                <option value="8k-12k">₹8,000 – ₹12,000 / mo</option>
                <option value="12k-plus">₹12,000+ / mo</option>
              </select>
            </div>
          </div>

          {/* Gender Dropdown */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <Users className="h-4 w-4 shrink-0 text-slate-400" />
            <div className="w-full">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer"
              >
                <option value="">All Types (Boys/Girls/Unisex)</option>
                <option value="BOYS">Boys Only</option>
                <option value="GIRLS">Girls Only</option>
                <option value="UNISEX">Unisex / Co-living</option>
              </select>
            </div>
          </div>

          {/* Submit Search Button */}
          <Button
            type="submit"
            className="h-full min-h-[50px] w-full rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 hover:shadow-blue-500/35"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Stays
          </Button>
        </div>
      </form>

      {/* Suggested Quick Search Chips */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 px-2 text-xs">
        <span className="font-semibold text-slate-400">Popular:</span>
        {["Ghaziabad", "AKGEC", "Greater Noida", "ABES", "KIET", "201009"].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              router.push(`/properties?search=${encodeURIComponent(tag)}`);
            }}
            className="rounded-full bg-white px-3 py-1 font-medium text-slate-600 border border-slate-200 shadow-2xs hover:border-blue-300 hover:text-blue-600 transition"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}