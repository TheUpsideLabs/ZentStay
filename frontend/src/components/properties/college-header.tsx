import Image from "next/image";
import {
  Building2,
  GraduationCap,
  MapPin,
  Star,
} from "lucide-react";

import { College } from "@/data/colleges";

interface CollegeHeaderProps {
  college: College | null;
}

export function CollegeHeader({
  college,
}: CollegeHeaderProps) {
  if (!college) return null;

  return (
    <section className="mb-10 overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-xl">

      {/* Banner */}

      <div className="relative h-64">

        <Image
          src={college.banner}
          alt={college.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      </div>

      <div className="relative px-10 pb-10">

        {/* Logo */}

        <div className="-mt-16 flex h-32 w-32 items-center justify-center overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-2xl">

          <Image
            src={college.logo}
            alt={college.shortName}
            width={90}
            height={90}
            className="object-contain"
          />

        </div>

        {/* Name */}

        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900">
          {college.name}
        </h1>

        <p className="mt-2 text-lg font-semibold text-blue-600">
          {college.shortName}
        </p>

        {/* Stats */}

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl bg-slate-50 p-5">

            <MapPin className="mb-3 h-6 w-6 text-blue-600" />

            <h3 className="font-bold">
              {college.city}
            </h3>

            <p className="text-sm text-slate-500">
              {college.state}
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <Building2 className="mb-3 h-6 w-6 text-blue-600" />

            <h3 className="font-bold">
              {college.totalProperties}
            </h3>

            <p className="text-sm text-slate-500">
              Verified PGs
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <GraduationCap className="mb-3 h-6 w-6 text-blue-600" />

            <h3 className="font-bold">
              {college.studentCount.toLocaleString()}+
            </h3>

            <p className="text-sm text-slate-500">
              Students
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <Star className="mb-3 h-6 w-6 fill-yellow-400 text-yellow-400" />

            <h3 className="font-bold">
              {college.rating}
            </h3>

            <p className="text-sm text-slate-500">
              Rating
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}