"use client";

import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterChip({
  label,
  active = false,
  onClick,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `
        rounded-full
        border
        px-5
        py-2.5
        text-sm
        font-semibold
        transition-all
        duration-300
        `,
        active
          ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
      )}
    >
      {label}
    </button>
  );
}