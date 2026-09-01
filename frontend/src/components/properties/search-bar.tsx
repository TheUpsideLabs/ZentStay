"use client";

import { Search } from "lucide-react";

export function PropertySearchBar() {
  return (
    <div className="relative w-full">

      <Search
        className="
        absolute
        left-5
        top-1/2
        h-5
        w-5
        -translate-y-1/2
        text-slate-400
        "
      />

      <input
        placeholder="Search by property, college or location..."
        className="
        h-14
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        pl-14
        pr-4
        outline-none
        transition
        focus:border-blue-500
        "
      />

    </div>
  );
}