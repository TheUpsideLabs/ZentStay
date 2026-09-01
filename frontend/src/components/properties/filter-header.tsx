import { Button } from "@/components/ui/button";

export function FilterHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold">
          Filters
        </h2>

        <p className="text-sm text-slate-500">
          Customize your search
        </p>

      </div>

      <Button
        variant="ghost"
        size="sm"
      >
        Reset
      </Button>

    </div>
  );
}