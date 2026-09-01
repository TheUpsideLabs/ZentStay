import { Sparkles } from "lucide-react";

export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2">

      <Sparkles className="h-4 w-4 text-blue-600" />

      <span className="text-sm font-semibold text-blue-700">
        India's Next Generation Student Housing
      </span>

    </div>
  );
}