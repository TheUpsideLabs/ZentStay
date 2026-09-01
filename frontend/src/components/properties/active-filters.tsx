export function ActiveFilters() {
  const filters = [
    "Verified",
    "WiFi",
    "Near College",
  ];

  return (
    <div className="mt-6 flex flex-wrap gap-3">

      {filters.map((filter) => (
        <span
          key={filter}
          className="
          rounded-full
          bg-blue-50
          px-4
          py-2
          text-sm
          font-medium
          text-blue-700
          "
        >
          {filter} ×
        </span>
      ))}

    </div>
  );
}