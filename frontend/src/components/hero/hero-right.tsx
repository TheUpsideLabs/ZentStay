"use client";

import { Floating } from "@/components/animations/Floating";

import { HeroCommunityCard } from "./cards/hero-community-card";
import { HeroPropertyCard } from "./cards/hero-property-card";

export function HeroRight() {
  return (
    <div
      className="
      relative
      hidden
      h-full
      items-center
      justify-center
      lg:flex
      "
    >
      {/* Background Glow */}
      <div className="absolute h-[620px] w-[620px] rounded-full bg-blue-400/10 blur-[180px]" />

      <div
        className="
        relative
        flex
        w-full
        max-w-[480px]
        flex-col
        items-center
        gap-10
        "
      >
        {/* Community Card */}
        <Floating>
          <div className="ml-auto">
            <HeroCommunityCard />
          </div>
        </Floating>

        {/* Property Card */}
        <Floating>
          <HeroPropertyCard />
        </Floating>
      </div>
    </div>
  );
}