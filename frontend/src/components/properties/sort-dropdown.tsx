"use client";

export function SortDropdown() {
  return (
    <select
      className="
      h-14
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-5
      outline-none
      "
      defaultValue="recommended"
    >
      <option value="recommended">
        Recommended
      </option>

      <option value="price-low">
        Price: Low to High
      </option>

      <option value="price-high">
        Price: High to Low
      </option>

      <option value="rating">
        Highest Rated
      </option>

      <option value="distance">
        Nearest College
      </option>
    </select>
  );
}