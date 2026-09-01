import Image from "next/image";
import {
  Heart,
  MapPin,
  ShieldCheck,
  Star,
  Wifi,
  Utensils,
  AirVent,
} from "lucide-react";

export function HeroPropertyCard() {
  return (
    <div
      className="
      group
      w-[380px]
      overflow-hidden
      rounded-[32px]
      border
      border-slate-200
      bg-white
      shadow-xl
      shadow-blue-100/40
      transition-all
      duration-500
      hover:-translate-y-2
      "
    >

      <div className="relative h-60 overflow-hidden">

        <Image
          src="/images/properties/property-1.jpeg"
          alt="Urban Nest PG"
          fill
          priority
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute left-5 top-5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
          VERIFIED
        </div>

        <button className="absolute right-5 top-5 rounded-full bg-white/95 p-3 shadow-lg backdrop-blur">

          <Heart className="h-5 w-5 text-slate-500 transition hover:text-red-500" />

        </button>

      </div>

      <div className="space-y-6 p-7">

        <div className="flex items-start justify-between">

          <div>

            <h3 className="text-2xl font-black">
              Urban Nest PG
            </h3>

            <div className="mt-2 flex items-center gap-2 text-slate-500">

              <MapPin className="h-4 w-4" />

              AKGEC • 650m

            </div>

          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-2">

            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <span className="font-bold">
              4.9
            </span>

          </div>

        </div>

        <div className="flex flex-wrap gap-2">

          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-sm">
            <Wifi className="h-4 w-4" />
            WiFi
          </span>

          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-sm">
            <AirVent className="h-4 w-4" />
            AC
          </span>

          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-sm">
            <Utensils className="h-4 w-4" />
            Food
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-black text-blue-600">
              ₹8,500
            </h2>

            <p className="text-sm text-slate-500">
              per month
            </p>

          </div>

          <div className="rounded-full bg-emerald-50 px-4 py-3">

            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">

              <ShieldCheck className="h-4 w-4" />

              Verified

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}