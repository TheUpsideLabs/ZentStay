"use client";

import {
  MapPin,
  Navigation,
  ExternalLink,
  Bus,
  ShoppingCart,
  UtensilsCrossed,
  Hospital,
} from "lucide-react";

interface Props {
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export function PropertyMap({
  address,
  city,
  state,
  latitude,
  longitude,
}: Props) {
  const mapQuery = encodeURIComponent(`${address}, ${city}, ${state}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    latitude && longitude ? `${latitude},${longitude}` : `${address}, ${city}, ${state}`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="rounded-[32px] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Neighborhood & Proximity
          </span>
          <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
            Location & Connectivity
          </h2>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 w-fit"
        >
          <ExternalLink className="h-4 w-4" />
          Get Directions in Google Maps
        </a>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-xs sm:text-sm">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
        <div>
          <p className="font-bold text-slate-900">{address}</p>
          <p className="mt-0.5 text-slate-500">{city}, {state}</p>
        </div>
      </div>

      {/* EMBEDDED MAP VIEW */}
      <div className="mt-6 h-[280px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner sm:h-[340px]">
        <iframe
          title="Property Location Map"
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0 filter saturate-[1.1]"
          src={embedUrl}
        />
      </div>

      {/* NEIGHBORHOOD & TRANSIT HIGHLIGHTS */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2.5 text-blue-600">
            <Bus className="h-4 w-4" />
            <p className="text-xs font-bold text-slate-800">Public Transit</p>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
            Walking distance to local bus stops and auto stands.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2.5 text-blue-600">
            <ShoppingCart className="h-4 w-4" />
            <p className="text-xs font-bold text-slate-800">Groceries & Market</p>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
            Supermarkets & convenience stores within 5-10 mins.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2.5 text-blue-600">
            <UtensilsCrossed className="h-4 w-4" />
            <p className="text-xs font-bold text-slate-800">Food & Tiffin</p>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
            Cafes, student-friendly dining, and tiffin services.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2.5 text-blue-600">
            <Hospital className="h-4 w-4" />
            <p className="text-xs font-bold text-slate-800">Healthcare</p>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
            Pharmacies and clinics readily accessible nearby.
          </p>
        </div>
      </div>
    </section>
  );
}