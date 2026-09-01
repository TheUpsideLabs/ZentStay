import Link from "next/link";

import { Property } from "@/types/property";

import { PropertyContent } from "./property-content";
import { PropertyFooter } from "./property-footer";
import { PropertyImage } from "./property-image";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* =====================================
          PROPERTY IMAGE
      ===================================== */}

      <Link
        href={`/properties/${property.id}`}
        className="block"
      >
        <div
          className="
            relative
            h-64
            overflow-hidden
          "
        >
          <PropertyImage
            propertyId={property.id}
            image={property.image}
            verified={property.verified}
          />
        </div>
      </Link>

      {/* =====================================
          PROPERTY CONTENT
      ===================================== */}

      <div className="p-6">
        <PropertyContent
          property={property}
        />

        {/* =====================================
            PROPERTY FOOTER
        ===================================== */}

        <div className="mt-6 border-t border-slate-100 pt-6">
          <PropertyFooter
            id={property.id}
            price={property.price}
            rentPeriod={
              property.rentPeriod
            }
          />
        </div>
      </div>
    </article>
  );
}