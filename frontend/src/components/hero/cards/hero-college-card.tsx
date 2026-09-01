import { GraduationCap } from "lucide-react";

export function HeroCollegeCard() {
  return (
    <div className="w-60 rounded-3xl border bg-white p-5 shadow-xl">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-blue-100 p-3">
          <GraduationCap className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h3 className="font-bold">
            AKGEC
          </h3>

          <p className="text-sm text-slate-500">
            120 Properties Nearby
          </p>
        </div>

      </div>

    </div>
  );
}