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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
            group
            rounded-[28px]
            border
            border-slate-200
            bg-white
            p-6
            text-center
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-xl
            hover:shadow-blue-100/30
            lg:text-left
            "
          >
            <div
              className="
              mx-auto
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              transition
              group-hover:bg-blue-600
              lg:mx-0
              "
            >
              <Icon className="h-7 w-7 text-blue-600 transition group-hover:text-white" />
            </div>

            <h3 className="text-3xl font-black text-slate-900">
              {item.value}
            </h3>

            <p className="mt-2 text-sm font-medium text-slate-500">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}