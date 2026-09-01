"use client";

import {
  useEffect,
  useState,
} from "react";

import propertyService from "@/services/property.service";

import { Property } from "@/types/property";

import { PropertyCard } from "@/components/property/property-card";

export function PropertyGrid() {
  const [properties, setProperties] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      setLoading(true);
      setError(false);

      const response =
        await propertyService.getAllProperties({
          page: 1,
          limit: 6,
        });

      setProperties(
        response.properties
      );
    } catch (err) {
      console.error(
        "Failed to load properties:",
        err
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">
          Loading Properties...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="font-semibold text-red-500">
          Failed to load properties.
        </p>

        <button
          onClick={loadProperties}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">
          No properties available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}