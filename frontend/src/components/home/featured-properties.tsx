"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PropertyCard } from "@/components/property/property-card";

import propertyService from "@/services/property.service";
import { Property } from "@/types/property";

export function FeaturedProperties() {
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

      console.log(
        "ZentStay Featured Properties:",
        response
      );

      setProperties(response.properties);
    } catch (error) {
      console.error(
        "Failed to load properties:",
        error
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white py-32">
      <Container>

        {/* Header */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-3xl">

            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Featured Properties
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Find Your

              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Perfect Student Stay
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              Discover handpicked verified PGs, hostels and student
              apartments located near top colleges with premium
              amenities, transparent pricing and zero brokerage.
            </p>

          </div>

          <Link
            href="/properties"
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-slate-200
              px-6
              py-3
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-600
              hover:bg-blue-600
              hover:text-white
            "
          >
            View All Properties

            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-[32px] bg-slate-100"
              />
            ))}
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="mt-20 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <p className="font-semibold text-red-600">
              Failed to load properties.
            </p>

            <button
              onClick={loadProperties}
              className="mt-4 rounded-xl bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Properties */}

        {!loading &&
          !error &&
          properties.length > 0 && (
            <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}

            </div>
          )}

        {/* Empty */}

        {!loading &&
          !error &&
          properties.length === 0 && (
            <div className="mt-20 rounded-2xl bg-slate-50 p-12 text-center">

              <p className="text-lg font-semibold text-slate-600">
                No properties available right now.
              </p>

            </div>
          )}

      </Container>
    </section>
  );
}