import { Property } from "@/types/property";

import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/ui/empty-state";

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({
  properties,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        description="Try changing your search or filters to discover more properties."
        buttonText="Reset Filters"
      />
    );
  }

  return (
    <section className="pb-12">

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}

      </div>

    </section>
  );
}