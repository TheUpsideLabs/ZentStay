"use client";

import Image from "next/image";
import { useState } from "react";

interface PropertyImage {
  id: string;
  imageUrl: string;
  publicId: string;
}

interface Props {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({
  images,
  title,
}: Props) {
  const [activeImage, setActiveImage] =
    useState(0);

  const imageUrls =
    images.length > 0
      ? images.map((image) => image.imageUrl)
      : ["/images/properties/property-1.jpeg"];

  return (
    <section>
      <div className="relative h-[520px] overflow-hidden rounded-[32px] bg-slate-200">
        <Image
          src={imageUrls[activeImage]}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {imageUrls.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {imageUrls.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() =>
                setActiveImage(index)
              }
              className={`
                relative
                h-20
                w-28
                shrink-0
                overflow-hidden
                rounded-xl
                border-2
                transition
                ${
                  activeImage === index
                    ? "border-blue-600"
                    : "border-transparent"
                }
              `}
            >
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}