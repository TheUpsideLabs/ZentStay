import { ShieldCheck } from "lucide-react";

export function VerifiedBadge() {
  return (
    <div
      className="
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-emerald-500
      px-4
      py-2
      text-xs
      font-bold
      uppercase
      tracking-wide
      text-white
      shadow-lg
      "
    >
      <ShieldCheck className="h-4 w-4" />

      Verified
    </div>
  );
}