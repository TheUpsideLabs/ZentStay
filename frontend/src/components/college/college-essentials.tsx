"use client";

import {
  Bus,
  Coffee,
  Hospital,
  ShoppingCart,
  UtensilsCrossed,
  Landmark,
  Train,
} from "lucide-react";

import { Container } from "@/components/layout/container";

const essentials = [
  {
    icon: Hospital,
    title: "Hospital",
    distance: "450m",
  },
  {
    icon: ShoppingCart,
    title: "Grocery",
    distance: "300m",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    distance: "200m",
  },
  {
    icon: Coffee,
    title: "Cafe",
    distance: "350m",
  },
  {
    icon: Landmark,
    title: "ATM",
    distance: "250m",
  },
  {
    icon: Bus,
    title: "Bus Stop",
    distance: "180m",
  },
  {
    icon: Train,
    title: "Metro",
    distance: "2.8 km",
  },
];

export function CollegeEssentials() {
  return (
    <section className="py-20">

      <Container>

        <div className="mb-12">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Nearby Essentials
          </span>

          <h2 className="mt-4 text-4xl font-black">
            Everything Around Campus
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Explore the facilities available near the college.
          </p>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {essentials.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 transition group-hover:bg-blue-600">

                  <Icon className="h-7 w-7 text-blue-600 transition group-hover:text-white" />

                </div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-500">
                  {item.distance}
                </p>

              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}