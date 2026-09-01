"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { colleges } from "@/data/colleges";

interface Props {
  slug: string;
}

export function CollegeRelated({
  slug,
}: Props) {
  const related = colleges
    .filter((college) => college.slug !== slug)
    .slice(0, 4);

  return (
    <section className="py-20 bg-white">

      <Container>

        <div className="mb-12">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Explore More
          </span>

          <h2 className="mt-4 text-4xl font-black">
            Related Colleges
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Discover verified PGs near other popular colleges.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {related.map((college) => (
            <Link
              key={college.id}
              href={`/college/${college.slug}`}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="relative h-52">

                <Image
                  src={college.banner}
                  alt={college.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              <div className="p-6">

                <h3 className="text-xl font-bold">
                  {college.shortName}
                </h3>

                <p className="mt-2 text-slate-500">
                  {college.city}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="font-semibold text-blue-600">
                    {college.totalProperties} PGs
                  </span>

                  <span className="text-sm text-slate-500">
                    ⭐ {college.rating}
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </Container>

    </section>
  );
}