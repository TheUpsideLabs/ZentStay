"use client";

import Image from "next/image";

import { Container } from "@/components/layout/container";

interface Props {
  slug: string;
}

const images = [
  "/images/college-gallery/gallery-1.jpg",
  "/images/college-gallery/gallery-2.jpg",
  "/images/college-gallery/gallery-3.jpg",
  "/images/college-gallery/gallery-4.jpg",
  "/images/college-gallery/gallery-5.jpg",
];

export function CollegeGallery({
  slug,
}: Props) {
  return (
    <section className="py-20">

      <Container>

        <div className="mb-12">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Gallery
          </span>

          <h2 className="mt-4 text-4xl font-black">
            Campus Life
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Explore the campus, surroundings and student lifestyle near the college.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

          {images.map((image, index) => (
            <div
              key={image}
              className={`
                group
                relative
                overflow-hidden
                rounded-[28px]
                ${
                  index === 0
                    ? "col-span-2 row-span-2 h-[520px]"
                    : "h-[250px]"
                }
              `}
            >
              <Image
                src={image}
                alt="College Gallery"
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}