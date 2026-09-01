"use client";

interface FilterCheckboxProps {
  label: string;
}

export function FilterCheckbox({
  label,
}: FilterCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition hover:bg-slate-50">

      <span className="text-sm">
        {label}
      </span>

      <input
        type="checkbox"
        className="h-4 w-4 accent-blue-600"
      />

    </label>
  );
}