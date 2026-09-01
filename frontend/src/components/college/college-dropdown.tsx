import { College } from "@/data/colleges";

import { CollegeSearchItem } from "./college-search-item";

interface CollegeDropdownProps {
  colleges: College[];
  onSelect: (college: College) => void;
}

export function CollegeDropdown({
  colleges,
  onSelect,
}: CollegeDropdownProps) {
  if (colleges.length === 0) {
    return (
      <div className="absolute z-50 mt-3 w-full rounded-3xl border bg-white p-6 shadow-2xl">
        <p className="text-center text-slate-500">
          No colleges found.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute z-50 mt-3 max-h-[380px] w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl">

      {colleges.map((college) => (
        <CollegeSearchItem
          key={college.id}
          college={college}
          onSelect={onSelect}
        />
      ))}

    </div>
  );
}