import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export function HeroCommunityCard() {
  return (
    <div
      className="
        w-[290px]
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-xl
        shadow-blue-100/30
      "
    >
      <div className="flex -space-x-4">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="relative">
            <Image
              src={`/images/avatars/avatar-${id}.png`}
              alt={`Student ${id}`}
              width={54}
              height={54}
              className="rounded-full border-2 border-white object-cover"
            />

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <BadgeCheck className="h-5 w-5 text-blue-600" />

        <span className="text-sm font-semibold text-blue-600">
          Trusted Community
        </span>
      </div>

      <h3 className="mt-4 text-4xl font-black">
        10,000+
      </h3>

      <p className="mt-2 leading-7 text-slate-500">
        Students trust ZentStay to discover verified accommodation near their
        colleges.
      </p>
    </div>
  );
}