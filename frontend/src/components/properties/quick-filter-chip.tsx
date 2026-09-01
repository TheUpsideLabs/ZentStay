"use client";

interface QuickFilterChipProps {
  label: string;
}

export function QuickFilterChip({
  label,
}: QuickFilterChipProps) {
  return (
    <button
      className="
      rounded-full
      border
      border-slate-200
      px-4
      py-2
      text-sm
      transition
      hover:border-blue-500
      hover:bg-blue-50
      hover:text-blue-600
      "
    >
      {label}
    </button>
  );
}