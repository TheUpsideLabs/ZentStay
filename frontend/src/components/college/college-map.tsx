"use client";

import {
  MapPin,
  Navigation,
  School,
} from "lucide-react";

import { Container } from "@/components/layout/container";

interface Props {
  slug: string;
}

export function CollegeMap({
  slug,
}: Props) {
  return (
    <section className="py-20">

      <Container>

        <div className="mb-12">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Location
          </span>

          <h2 className="mt-4 text-4xl font-black">
            College Location
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Explore the college location and nearby student
            accommodation.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[65%_35%]">

          {/* Map */}

          <div className="flex h-[520px] items-center justify-center rounded-[32px] border border-slate-200 bg-slate-100">

            <div className="text-center">

              <MapPin className="mx-auto h-16 w-16 text-blue-600" />

              <h3 className="mt-6 text-2xl font-bold">
                Interactive Map
              </h3>

              <p className="mt-3 text-slate-500">
                Google Maps will be integrated here.
              </p>

            </div>

          </div>

          {/* Sidebar */}

          <div className="space-y-6">

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-4">

                <School className="h-8 w-8 text-blue-600" />

                <div>

                  <h3 className="font-bold">
                    College Campus
                  </h3>

                  <p className="text-sm text-slate-500">
                    Main Entrance
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-4">

                <Navigation className="h-8 w-8 text-blue-600" />

                <div>

                  <h3 className="font-bold">
                    Nearby PGs
                  </h3>

                  <p className="text-sm text-slate-500">
                    248 Verified Properties
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="mb-5 text-xl font-bold">
                Walking Distance
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Metro</span>

                  <span className="font-semibold">
                    12 min
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Bus Stop</span>

                  <span className="font-semibold">
                    3 min
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Hospital</span>

                  <span className="font-semibold">
                    6 min
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Market</span>

                  <span className="font-semibold">
                    4 min
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}