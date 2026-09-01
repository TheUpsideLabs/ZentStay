"use client";

import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Star,
} from "lucide-react";

interface College {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  city: string;
  state: string;
  logo: string;
  banner: string;
  latitude: number;
  longitude: number;
  rating: number;
}

interface Props {
  college: College;
}

export function PropertyNearbyCollege({
  college,
}: Props) {
  return (
    <section className="rounded-[32px] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-black">
        Nearby College
      </h2>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50">
            {college.logo ? (
              <img
                src={college.logo}
                alt={college.shortName}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <GraduationCap className="h-8 w-8 text-blue-600" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold">
              {college.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">

              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {college.city}, {college.state}
              </span>

              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {college.rating}
              </span>

            </div>
          </div>

        </div>

        <Link
          href={`/college/${college.slug}`}
          className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          View College
        </Link>

      </div>
    </section>
  );
}