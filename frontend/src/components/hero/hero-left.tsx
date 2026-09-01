"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Stagger } from "@/components/animations/Stagger";

import { HeroBadge } from "./hero-badge";
import { HeroDescription } from "./hero-description";
import { HeroHeading } from "./hero-heading";
import { HeroSearch } from "./hero-search";
import { HeroStats } from "./hero-stats";

export function HeroLeft() {
  return (
    <div className="mx-auto w-full max-w-[680px] text-center lg:mx-0 lg:text-left">
      <Stagger>
        <FadeIn>
          <HeroBadge />
        </FadeIn>

        <FadeIn>
          <HeroHeading />
        </FadeIn>

        <FadeIn>
          <HeroDescription />
        </FadeIn>

        <FadeIn>
          <div className="mt-10">
            <HeroSearch />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-12">
            <HeroStats />
          </div>
        </FadeIn>
      </Stagger>
    </div>
  );
}