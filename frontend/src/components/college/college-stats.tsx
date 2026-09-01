import {
  Building2,
  GraduationCap,
  MapPin,
  Star,
} from "lucide-react";
import { College } from "@/services/college.service";

interface Props {
  college: College;
}

export function CollegeStats({ college }: Props) {
  const propertyCount = college.properties?.length ?? college._count?.properties ?? 0;

  const stats = [
    {
      icon: Building2,
      title: `${propertyCount}`,
      subtitle: propertyCount === 1 ? "Verified Property" : "Verified Properties",
    },
    {
      icon: MapPin,
      title: college.city,
      subtitle: college.state,
    },
    {
      icon: GraduationCap,
      title: college.shortName || college.name.slice(0, 10),
      subtitle: "Institution Code",
    },
    {
      icon: Star,
      title: college.rating > 0 ? college.rating.toFixed(1) : "New",
      subtitle: college.rating > 0 ? "College Rating" : "Verified Institution",
    },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.subtitle + item.title}
              className="flex flex-col rounded-[30px] bg-white p-8 shadow-xl min-h-[160px] justify-center"
            >
              <Icon className="mb-4 h-8 w-8 shrink-0 text-blue-600" />
              <h3 className="text-3xl font-black truncate" title={item.title}>
                {item.title}
              </h3>
              <p className="mt-1 text-slate-500 truncate" title={item.subtitle}>
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}