"use client";

import { Building2, Globe, GraduationCap, Trophy } from "lucide-react";

import { College } from "@/services/college.service";
import { Container } from "@/components/layout/container";

interface Props {
  college: College;
}

export function CollegeAbout({ college }: Props) {
  if (!college) return null;

  return (
    <section className="py-20">
      <Container>

        <div className="rounded-[32px] bg-white p-10 shadow-xl">

          <h2 className="text-3xl font-black">
            About College
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-slate-600">
            {college.name} is one of the leading engineering
            institutions in {college.city}. Students can easily
            discover verified PGs and hostels around the campus
            using ZentStay.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-slate-50 p-6">

              <Building2 className="mb-4 h-8 w-8 text-blue-600" />

              <p className="text-sm text-slate-500">
                Established
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {college.established ?? "N/A"}
              </h3>

            </div>

            <div className="rounded-2xl bg-slate-50 p-6">

              <GraduationCap className="mb-4 h-8 w-8 text-blue-600" />

              <p className="text-sm text-slate-500">
                Students
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {college.studentCount ? `${college.studentCount.toLocaleString()}+` : "N/A"}
              </h3>

            </div>

            <div className="rounded-2xl bg-slate-50 p-6">

              <Trophy className="mb-4 h-8 w-8 text-blue-600" />

              <p className="text-sm text-slate-500">
                NIRF Rank
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {college.nirfRank ?? "--"}
              </h3>

            </div>

            <div className="rounded-2xl bg-slate-50 p-6">

              <Globe className="mb-4 h-8 w-8 text-blue-600" />

              <p className="text-sm text-slate-500">
                Website
              </p>

              <a
                href={college.officialWebsite}
                target="_blank"
                className="mt-2 block font-semibold text-blue-600"
              >
                Visit
              </a>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
