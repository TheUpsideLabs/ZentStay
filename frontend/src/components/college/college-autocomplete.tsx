"use client";

import React, { useState, useEffect, useRef } from "react";
import collegeService, { College } from "@/services/college.service";

interface CollegeAutocompleteProps {
  value: string;
  onChange: (collegeId: string) => void;
  disabled?: boolean;
}

export function CollegeAutocomplete({ value, onChange, disabled }: CollegeAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial load if editing
  useEffect(() => {
    if (value && !selectedCollege) {
      collegeService.getCollegeById(value).then((college) => {
        if (college) {
          setSelectedCollege(college);
          setQuery(college.name);
        }
      }).catch(console.error);
    }
  }, [value]);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = setTimeout(() => {
      setLoading(true);
      collegeService.getAllColleges({ search: query, limit: 10 })
        .then((res) => {
          setResults(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, isOpen]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (selectedCollege) {
          setQuery(selectedCollege.name);
        } else if (query === "") {
          onChange("");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCollege, query]);

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
        placeholder="Search for a college..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          if (e.target.value === "") {
            setSelectedCollege(null);
            onChange("");
          }
        }}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
      />

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-2xl border border-slate-200 bg-white py-2 shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-2 text-slate-500">Searching...</div>
          ) : results.length > 0 ? (
            results.map((college) => (
              <div
                key={college.id}
                className="cursor-pointer px-4 py-2 hover:bg-slate-50"
                onClick={() => {
                  setSelectedCollege(college);
                  setQuery(college.name);
                  onChange(college.id);
                  setIsOpen(false);
                }}
              >
                <div className="font-medium text-slate-800">{college.name}</div>
                <div className="text-sm text-slate-500">{college.city}, {college.state}</div>
              </div>
            ))
          ) : query.length > 0 ? (
            <div className="px-4 py-2 text-slate-500">No colleges found.</div>
          ) : (
            <div className="px-4 py-2 text-slate-500">Type to search colleges</div>
          )}
        </div>
      )}
    </div>
  );
}
