import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PropertyFooterProps {
  id: string;
  price: number;
  rentPeriod?: "MONTHLY" | "YEARLY";
}

export function PropertyFooter({
  id,
  price,
  rentPeriod = "MONTHLY",
}: PropertyFooterProps) {
  const periodLabel =
    rentPeriod === "YEARLY"
      ? "per year"
      : "per month";

  return (
    <div className="mt-6 flex items-center justify-between">
      <div>
        <p className="text-3xl font-black text-blue-600">
          ₹{price.toLocaleString("en-IN")}
        </p>

        <span className="text-sm text-slate-500">
          {periodLabel}
        </span>
      </div>

      <Link href={`/properties/${id}`}>
        <Button
          className="
            rounded-2xl
            px-6
            shadow-md
            transition-all
            duration-300
            hover:scale-105
          "
        >
          View Details

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}