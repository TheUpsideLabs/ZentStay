import { Container } from "@/components/layout/container";

import { HeroLeft } from "./hero-left";
import { HeroRight } from "./hero-right";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-32">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[220px] sm:h-[820px] sm:w-[820px]" />

        <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="absolute left-0 bottom-16 h-48 w-48 rounded-full bg-blue-200/20 blur-3xl" />

        {/* Dot Pattern */}

        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(#2563eb 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

      </div>

      <Container>

        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            items-center
            gap-20
            pt-32
            pb-24
            lg:min-h-[780px]
            lg:grid-cols-[58%_42%]
            lg:gap-20
            lg:pt-36
            lg:pb-28
          "
        >

          <HeroLeft />

          <HeroRight />

        </div>

      </Container>

    </section>
  );
}