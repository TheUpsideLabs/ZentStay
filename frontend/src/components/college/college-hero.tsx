"use client";

import { MapPin, Star, Globe } from "lucide-react";

import { College } from "@/services/college.service";

interface Props {
  college: College;
}

export function CollegeHero({ college }: Props) {
  // Use fallback images if they are not provided (since they are optional in the DB)
  const defaultBanner = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80";
  const defaultLogo = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80";

  return (
    <section className="relative">
      {/* Banner */}
      <div className="relative h-[340px] bg-slate-900">
        <img
          src={college.banner || defaultBanner}
          alt={college.name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultBanner;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-[32px] bg-white p-8 shadow-2xl border border-slate-100">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Logo */}
            <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              {/* Using standard img tag to allow arbitrary external domains without next.config.ts limits */}
              <img
                src={college.logo || defaultLogo}
                alt={college.shortName}
                className="h-full w-full object-contain p-4"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultLogo;
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">

              <h1 className="text-4xl font-black text-slate-900">
                {college.name}
              </h1>

              <p className="mt-2 text-xl font-semibold text-blue-600">
                {college.shortName}
              </p>

              <div className="mt-6 flex flex-wrap gap-6">

                <div className="flex items-center gap-2">

                  <MapPin className="h-5 w-5 text-blue-600" />

                  <span>{college.city}</span>

                </div>

                <div className="flex items-center gap-2">

                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                  <span>{college.rating}</span>

                </div>

                {college.officialWebsite && (
                  <a
                    href={college.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Globe className="h-5 w-5" />

                    Website
                  </a>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}