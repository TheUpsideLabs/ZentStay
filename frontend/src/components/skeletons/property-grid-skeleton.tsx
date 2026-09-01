import { PropertyCardSkeleton } from "./property-card-skeleton";

export function PropertyGridSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {Array.from({ length: 6 }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}

    </div>
  );
}