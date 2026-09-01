import { GraduationCap, MapPin } from "lucide-react";

import { College } from "@/data/colleges";

interface CollegeSearchItemProps {
  college: College;
  onSelect: (college: College) => void;
}

export function CollegeSearchItem({
  college,
  onSelect,
}: CollegeSearchItemProps) {
  return (
    <button
      onClick={() => onSelect(college)}
      className="
      flex
      w-full
      items-center
      gap-4
      rounded-2xl
      px-4
      py-3
      text-left
      transition-all
      duration-300
      hover:bg-blue-50
      "
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

        <GraduationCap className="h-6 w-6 text-blue-600" />

      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-slate-900">
          {college.shortName}
        </h3>

        <p className="text-sm text-slate-500">
          {college.name}
        </p>

        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">

          <MapPin className="h-3.5 w-3.5" />

          {college.city}

        </div>

      </div>

    </button>
  );
}