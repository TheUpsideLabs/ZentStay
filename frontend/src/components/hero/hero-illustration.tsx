import { Floating } from "@/components/animations/Floating";
import {
  MapPin,
  ShieldCheck,
  Star,
  Wifi,
  Building2,
} from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="relative hidden min-h-[620px] items-center justify-center lg:flex">

      {/* Background Glow */}

      <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Building */}

      <div className="relative z-10 flex h-[340px] w-[250px] items-center justify-center rounded-[32px] border border-slate-200 bg-white shadow-2xl">

        <Building2 className="h-28 w-28 text-blue-600" />

      </div>

      {/* Card 1 */}

      <Floating>

        <div className="absolute left-0 top-8 w-64 rounded-3xl border bg-white p-5 shadow-xl">

          <div className="flex items-center justify-between">

            <h3 className="font-bold">
              Urban Nest PG
            </h3>

            <ShieldCheck className="h-5 w-5 text-emerald-500" />

          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

            <MapPin className="h-4 w-4" />

            AKGEC • 650m

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="font-bold text-blue-600">
              ₹8,500
            </span>

            <div className="flex items-center gap-1">

              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

              4.9

            </div>

          </div>

        </div>

      </Floating>

      {/* Card 2 */}

      <Floating>

        <div className="absolute -right-2 top-36 w-60 rounded-3xl border bg-white p-5 shadow-xl">

          <h3 className="font-bold">
            Girls Premium PG
          </h3>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

            <Wifi className="h-4 w-4" />

            WiFi • AC • Food

          </div>

          <p className="mt-4 text-blue-600 font-bold">
            ₹9,200
          </p>

        </div>

      </Floating>

      {/* Card 3 */}

      <Floating>

        <div className="absolute bottom-6 left-16 w-56 rounded-3xl border bg-white p-5 shadow-xl">

          <p className="text-sm text-slate-500">
            Students Helped
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            10K+
          </h2>

          <p className="mt-2 text-sm text-emerald-600">
            Trusted Across India
          </p>

        </div>

      </Floating>

    </div>
  );
}