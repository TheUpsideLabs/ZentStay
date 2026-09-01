import { Eye, MapPin, Star } from "lucide-react";

import { Property } from "@/types/property";

import { PropertyAmenities } from "./property-amenities";

interface PropertyContentProps {
  property: Property;
}

export function PropertyContent({
  property,
}: PropertyContentProps) {
  return (
    <div className="p-6">

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-slate-900">
            {property.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

            <MapPin className="h-4 w-4 text-blue-600" />

            <span className="line-clamp-1">
              {property.location} • {property.distance}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">

        <div className="flex items-center gap-2">

          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

          <span className="font-bold">
            {property.rating}
          </span>

        </div>

        <div className="flex items-center gap-2 text-slate-500">

          <Eye className="h-4 w-4" />

          <span className="text-sm">
            {property.views.toLocaleString()} Views
          </span>

        </div>

      </div>

      <PropertyAmenities
        amenities={property.amenities}
      />

    </div>
  );
}