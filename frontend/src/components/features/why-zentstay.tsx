import {
  BadgeCheck,
  IndianRupee,
  ShieldCheck,
  MapPinned,
  Star,
  Zap,
} from "lucide-react";

import { Container } from "@/components/layout/container";

import { FeatureCard } from "./feature-card";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Properties",
    description:
      "Every property goes through verification before appearing on ZentStay.",
  },
  {
    icon: IndianRupee,
    title: "No Brokerage",
    description:
      "Connect directly with property owners and avoid unnecessary broker fees.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description:
      "Send booking requests quickly without lengthy paperwork.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Hygienic",
    description:
      "Browse properties with trusted facilities and a safer living environment.",
  },
  {
    icon: MapPinned,
    title: "Near Your College",
    description:
      "Find accommodation based on distance from your college campus.",
  },
  {
    icon: Star,
    title: "Student Reviews",
    description:
      "Read genuine reviews from students before making your decision.",
  },
];

export function WhyZentStay() {
  return (
    <section className="bg-slate-50 py-28">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Why Choose ZentStay
          </span>

          <h2 className="mt-5 text-5xl font-black tracking-tight">
            Everything You Need
            <br />
            To Find Your Perfect Stay
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500">
            Built especially for students looking for verified,
            affordable and convenient accommodation near their college.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}