import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CollegeCardProps {
  name: string;
  image: string;
  properties: number;
  startingPrice: number;
  slug?: string;
}

export function CollegeCard({
  name,
  image,
  properties,
  startingPrice,
  slug,
}: CollegeCardProps) {
  return (
    <Link
      href={slug ? `/colleges/${slug}` : "#"}
      className="
        group
        overflow-hidden
        rounded-[30px]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-2xl
        hover:shadow-blue-100/30
      "
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="
            object-cover
            transition
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-2xl font-bold text-white">
            {name}
          </h3>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <p className="text-slate-500">
            {properties} Verified Properties
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <p className="text-2xl font-black text-blue-600">
              ₹{startingPrice.toLocaleString("en-IN")}
            </p>
          </div>

          <span
            className="
              inline-flex
              items-center
              gap-2
              font-semibold
              text-blue-600
              transition-all
              duration-300
              group-hover:gap-3
            "
          >
            Explore
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}