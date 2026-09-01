"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  GraduationCap,
  Navigation,
  X,
  History,
  Sparkles,
  Building2,
  ExternalLink,
  AlertCircle,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import collegeService, { College } from "@/services/college.service";

type SearchMode = "all" | "pincode" | "nearby";

export default function CollegesDirectoryPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [popularColleges, setPopularColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Geolocation state
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Recent searches stored in localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zentstay_recent_college_searches");
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save a new recent search
  const saveRecentSearch = (term: string) => {
    if (!term || term.trim().length < 2) return;
    const cleanTerm = term.trim();
    setRecentSearches((prev) => {
      const updated = [cleanTerm, ...prev.filter((item) => item.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem("zentstay_recent_college_searches", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("zentstay_recent_college_searches");
    } catch {
      // Ignore
    }
  };

  // 1. Fetch Popular Colleges on Initial Mount
  useEffect(() => {
    setPopularLoading(true);
    collegeService
      .getAllColleges({ popular: true, limit: 8 })
      .then((res) => {
        setPopularColleges(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load popular colleges:", err);
      })
      .finally(() => {
        setPopularLoading(false);
      });
  }, []);

  // 2. Main Search Query Pipeline (Debounced)
  useEffect(() => {
    const isSearching = search.trim().length > 0 || coords !== null;

    if (!isSearching) {
      setColleges([]);
      setTotalResults(0);
      setTotalPages(1);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      setLocationError(null);

      const isPincode = searchMode === "pincode" || /^\d{6}$/.test(search.trim());

      const queryParams: Parameters<typeof collegeService.getAllColleges>[0] = {
        page,
        limit: 12,
      };

      if (coords) {
        queryParams.lat = coords.lat;
        queryParams.lng = coords.lng;
        queryParams.radius = 50;
      } else if (isPincode) {
        queryParams.pincode = search.trim();
      } else {
        queryParams.search = search.trim();
      }

      collegeService
        .getAllColleges(queryParams)
        .then((res) => {
          setColleges(res.data || []);
          if (res.pagination) {
            setTotalPages(res.pagination.totalPages);
            setTotalResults(res.pagination.total);
          }
          if (search.trim().length >= 3) {
            saveRecentSearch(search);
          }
        })
        .catch((err) => {
          console.error("Search failed:", err);
          setColleges([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, searchMode, coords, page]);

  // Geolocation Handler
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);
    setSearch("");
    setSearchMode("nearby");
    setPage(1);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationLoading(false);
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        setLocationLoading(false);
        setCoords(null);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location access was denied. You can search by college name or pincode instead.");
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Location request timed out. Please check your network or search by name.");
        } else {
          setLocationError("Unable to retrieve your location. Please search by college name or pincode.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleClearSearch = () => {
    setSearch("");
    setCoords(null);
    setSearchMode("all");
    setLocationError(null);
    setPage(1);
    setColleges([]);
  };

  const isSearchActive = search.trim().length > 0 || coords !== null;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-28 pb-24">
        {/* =========================================================================
            HERO SECTION — FIND YOUR COLLEGE
        ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-50 py-12 md:py-20">
          <div className="mx-auto max-w-5xl px-5 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Verified College Accommodation Finder
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Find Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">College</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 sm:text-lg">
              Search across 37,000+ verified Indian institutions, enter your 6-digit campus pincode, or find colleges near your current location.
            </p>

            {/* SEARCH BOX CONTAINER */}
            <div className="mx-auto mt-8 max-w-3xl">
              {/* Search Mode Switches */}
              <div className="mb-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchMode("all");
                    setCoords(null);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    searchMode === "all" && !coords
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  All Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchMode("pincode");
                    setCoords(null);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    searchMode === "pincode"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  By Pincode
                </button>
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={locationLoading}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    coords
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-blue-600 hover:bg-blue-50 border border-blue-200"
                  }`}
                >
                  <Navigation className={`h-3 w-3 ${locationLoading ? "animate-spin" : ""}`} />
                  {locationLoading ? "Detecting..." : coords ? "Near My Location (Active)" : "Near Me"}
                </button>
              </div>

              {/* Main Search Input Bar */}
              <div className="relative flex items-center rounded-3xl bg-white p-2 shadow-xl shadow-slate-200/50 border border-slate-200 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>

                <input
                  type="text"
                  placeholder={
                    searchMode === "pincode"
                      ? "Enter 6-digit campus pincode (e.g. 201009)..."
                      : coords
                      ? "Showing colleges near your location (type to search instead)..."
                      : "Search college name, short acronym (e.g. DTU, AKGEC), or city..."
                  }
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (coords) setCoords(null);
                    setPage(1);
                  }}
                  className="h-12 w-full bg-transparent px-2 text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal"
                />

                {/* Clear Button */}
                {(search.length > 0 || coords) && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition"
                    title="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Location Quick Button */}
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={locationLoading}
                  className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-2xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100 disabled:opacity-50"
                >
                  <Navigation className={`h-3.5 w-3.5 ${locationLoading ? "animate-spin" : ""}`} />
                  {locationLoading ? "Locating..." : "Use Location"}
                </button>
              </div>

              {/* Error Alert for Location / Search */}
              {locationError && (
                <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-xs font-semibold text-amber-800 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>{locationError}</span>
                </div>
              )}

              {/* Quick Tags / Suggested Searches */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="font-semibold text-slate-400">Try searching:</span>
                {["AKGEC", "Delhi Tech", "ABES", "KIET", "Pune", "Ghaziabad", "201009"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearch(tag);
                      setCoords(null);
                      setPage(1);
                    }}
                    className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Recent Searches (Client-side localStorage) */}
              {recentSearches.length > 0 && !isSearchActive && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <History className="h-3.5 w-3.5 text-blue-600" />
                      Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs font-semibold text-slate-400 hover:text-red-500 transition"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearch(term);
                          setCoords(null);
                          setPage(1);
                        }}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <Search className="h-3 w-3 text-slate-400" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            RESULTS & DISCOVERY CONTENT SECTION
        ========================================================================= */}
        <section className="mx-auto max-w-7xl px-5">
          {/* Active Search Results Header */}
          {isSearchActive ? (
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  {coords ? "Colleges Near Your Location" : `Search Results for "${search}"`}
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  {loading
                    ? "Searching across verified college databases..."
                    : `${totalResults} ${totalResults === 1 ? "college" : "colleges"} found`}
                </p>
              </div>

              {(search.length > 0 || coords) && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  <X className="h-4 w-4" /> Reset Search
                </button>
              )}
            </div>
          ) : (
            /* Non-Search State Header: Popular Institutions */
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Live Verified Stays
                  </span>
                </div>
                <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                  Popular Student Hubs
                </h2>
                <p className="text-sm text-slate-500">
                  Top institutions with verified hostels and student PGs ready for booking.
                </p>
              </div>
            </div>
          )}

          {/* LOADING SPINNER */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
              <p className="mt-4 text-sm font-semibold text-slate-600">
                Finding colleges near your search...
              </p>
            </div>
          ) : isSearchActive ? (
            /* SEARCH RESULTS GRID */
            colleges.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm sm:p-16">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">No matching colleges found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  We couldn&apos;t find any institution matching &quot;{search}&quot;. Try checking for spelling, searching by district/city name, or using the 6-digit pincode.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                  >
                    View Popular Colleges
                  </button>
                  <button
                    type="button"
                    onClick={handleUseLocation}
                    className="rounded-full bg-blue-50 px-6 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
                  >
                    Search Near Me
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {colleges.map((college) => (
                    <CollegeResultCard key={college.id} college={college} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      disabled={page === 1}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="px-3 text-sm font-semibold text-slate-500">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => {
                        setPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      disabled={page === totalPages}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )
          ) : (
            /* POPULAR COLLEGES SHOWCASE (Initial Zero-Search State) */
            popularLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {popularColleges.map((college) => (
                  <CollegeResultCard key={college.id} college={college} isPopular />
                ))}
              </div>
            )
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

/* =========================================================================
   INDIVIDUAL COLLEGE RESULT CARD COMPONENT
========================================================================= */
function CollegeResultCard({ college, isPopular }: { college: College; isPopular?: boolean }) {
  const propertyCount = college._count?.properties ?? college.properties?.length ?? 0;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-100">
      <div>
        {/* Top Header Row with Icon and Badges */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
            {college.logo ? (
              <img
                src={college.logo}
                alt={college.shortName}
                className="h-8 w-8 object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <GraduationCap className="h-6 w-6" />
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            {college.shortName && (
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-slate-700">
                {college.shortName}
              </span>
            )}
            {college.distance !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <Navigation className="h-2.5 w-2.5" />
                {college.distance} km
              </span>
            )}
          </div>
        </div>

        {/* College Name */}
        <Link href={`/college/${college.slug}`}>
          <h3
            className="mb-2 text-base font-black text-slate-900 line-clamp-2 transition-colors group-hover:text-blue-600"
            title={college.name}
          >
            {college.name}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-500" />
          <span className="truncate">
            {college.city}, {college.state}
          </span>
        </div>

        {/* Active Stays Badge */}
        {propertyCount > 0 && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-blue-50/80 px-3 py-1 text-xs font-bold text-blue-700">
            <Building2 className="h-3.5 w-3.5" />
            <span>{propertyCount} {propertyCount === 1 ? "Verified Stay" : "Verified Stays"}</span>
          </div>
        )}
      </div>

      {/* Dual CTA Buttons */}
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
        <Link
          href={`/college/${college.slug}`}
          className="flex-1 rounded-xl bg-slate-50 py-2.5 text-center text-xs font-bold text-slate-700 transition hover:bg-slate-100"
        >
          View College
        </Link>

        <Link
          href={`/properties?collegeId=${college.id}`}
          className="flex-1 rounded-xl bg-blue-600 py-2.5 text-center text-xs font-bold text-white transition hover:bg-blue-700 shadow-sm shadow-blue-500/20"
        >
          Find Stays
        </Link>
      </div>
    </div>
  );
}

