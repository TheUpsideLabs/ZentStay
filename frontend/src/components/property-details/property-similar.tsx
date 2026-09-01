"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { PropertyCard } from "@/components/property/property-card";
import propertyService from "@/services/property.service";
import { Property } from "@/types/property";

interface Props {
  currentId: string;
  collegeId?: string;
  city?: string;
}

export function PropertySimilar({
  currentId,
  city,
}: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSimilarProperties() {
      try {
        setLoading(true);
        // Prioritize same city verified properties
        const response = await propertyService.getAllProperties({
          search: city || undefined,
          verified: true,
          limit: 6,
        });

        let similar = response.properties.filter(
          (property) => property.id !== currentId
        );

        // Fallback to any properties if city has fewer results
        if (similar.length === 0) {
          const fallback = await propertyService.getAllProperties({
            limit: 4,
          });
          similar = fallback.properties.filter(
            (property) => property.id !== currentId
          );
        }

        setProperties(similar.slice(0, 3));
      } catch (error) {
        console.error("Failed to load similar properties:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSimilarProperties();
  }, [currentId, city]);

  if (loading) {
    return (
      <section className="mt-12">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Sparkles className="h-3 w-3" />
            Personalized For You
          </span>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            Similar Verified Stays Nearby
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[380px] animate-pulse rounded-[32px] bg-slate-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          <Sparkles className="h-3 w-3" />
          Personalized Recommendations
        </span>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Similar Verified Stays {city ? `in ${city}` : "Nearby"}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}