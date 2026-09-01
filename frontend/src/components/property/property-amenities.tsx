interface PropertyAmenitiesProps {
  amenities: string[];
}

export function PropertyAmenities({
  amenities,
}: PropertyAmenitiesProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">

      {amenities.map((amenity) => (
        <span
          key={amenity}
          className="
            rounded-full
            bg-blue-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-blue-700
            transition-colors
            duration-300
            hover:bg-blue-600
            hover:text-white
          "
        >
          {amenity}
        </span>
      ))}

    </div>
  );
}