import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  college: string;
  review: string;
  image?: string;
  rating?: number;
}

export function TestimonialCard({
  name,
  college,
  review,
  image,
  rating = 5,
}: TestimonialCardProps) {
  const hasImage =
    image && image.trim().length > 0;

  return (
    <div
      className="
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        hover:shadow-blue-100/30
      "
    >
      <div className="flex items-center gap-4">
        {hasImage ? (
          <Image
            src={image}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-600
              to-cyan-500
              text-lg
              font-bold
              text-white
            "
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h3 className="text-lg font-bold">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            {college}
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-1">
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300"
              }`}
            />
          )
        )}
      </div>

      <p className="mt-5 leading-7 text-slate-600">
        &quot;{review}&quot;
      </p>
    </div>
  );
}