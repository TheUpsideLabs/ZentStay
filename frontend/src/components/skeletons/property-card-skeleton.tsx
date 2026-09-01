import { Skeleton } from "@/components/ui/skeleton";

export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6">

      <Skeleton className="h-56 w-full rounded-2xl" />

      <Skeleton className="mt-6 h-7 w-2/3" />

      <Skeleton className="mt-4 h-4 w-1/2" />

      <div className="mt-6 flex gap-2">

        <Skeleton className="h-8 w-16 rounded-full" />

        <Skeleton className="h-8 w-20 rounded-full" />

        <Skeleton className="h-8 w-14 rounded-full" />

      </div>

      <div className="mt-8 flex items-center justify-between">

        <Skeleton className="h-10 w-32" />

        <Skeleton className="h-12 w-36 rounded-2xl" />

      </div>

    </div>
  );
}