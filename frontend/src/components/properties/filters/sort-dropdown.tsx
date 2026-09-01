"use client";

import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({
  value,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-11
          appearance-none
          rounded-xl
          border
          border-slate-200
          bg-white
          py-2
          pl-4
          pr-10
          text-sm
          font-semibold
          text-slate-700
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      >
        <option value="">
          Recommended
        </option>

        <option value="rent">
          Price: Low to High
        </option>

        <option value="-rent">
          Price: High to Low
        </option>

        <option value="-createdAt">
          Newest First
        </option>

        <option value="createdAt">
          Oldest First
        </option>
      </select>

      <ChevronDown
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-500
        "
      />
    </div>
  );
}