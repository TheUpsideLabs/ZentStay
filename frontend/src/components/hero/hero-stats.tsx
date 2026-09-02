import {
  Building2,
  GraduationCap,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "2,000+",
    label: "Verified PGs",
  },
  {
    icon: GraduationCap,
    value: "150+",
    label: "Colleges",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Student Rating",
  },
];

export function HeroStats() {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
            group
            rounded-2xl
            sm:rounded-[28px]
            border
            border-slate-200
            bg-white
            p-3.5
            sm:p-6
            text-center
            shadow-xs
            transition-all
            duration-300
            hover:shadow-md
            "
          >
            <div
              className="
              mx-auto
              mb-2.5
              sm:mb-4
              flex
              h-9
              w-9
              sm:h-12
              sm:w-12
              items-center
              justify-center
              rounded-xl
              sm:rounded-2xl
              bg-blue-50
              text-blue-600
              "
            >
              <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>

            <h3 className="text-base sm:text-2xl lg:text-3xl font-black text-slate-900">
              {item.value}
            </h3>

            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold text-slate-500">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}