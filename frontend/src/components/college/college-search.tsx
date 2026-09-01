"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { College, colleges } from "@/data/colleges";
import { CollegeDropdown } from "./college-dropdown";

export function CollegeSearch() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return colleges;

    return colleges.filter((college) =>
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      college.shortName.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  function handleSelect(college: College) {
    setQuery(college.shortName);
    setOpen(false);

    router.push(`/properties?college=${college.slug}`);
  }

  return (
    <div className="relative w-full">

      <div className="flex items-center gap-4 rounded-[30px] border border-slate-200 bg-white px-6 py-5 shadow-xl">

        <Search className="h-5 w-5 text-blue-600" />

        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Search your college..."
          className="w-full bg-transparent text-lg outline-none"
        />

      </div>

      {open && (
        <CollegeDropdown
          colleges={filtered}
          onSelect={handleSelect}
        />
      )}

    </div>
  );
}