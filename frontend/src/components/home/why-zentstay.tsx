import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
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
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
}