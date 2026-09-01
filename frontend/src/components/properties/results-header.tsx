import { ActiveFilters } from "./active-filters";
import { PropertySearchBar } from "./search-bar";
import { SortDropdown } from "./sort-dropdown";

export function ResultsHeader() {
  return (
    <section>

      <span className="text-sm font-semibold text-blue-600">
        Verified Student Accommodation
      </span>

      <h1 className="mt-3 text-5xl font-black tracking-tight">
        Properties Near You
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-slate-500">
        Discover verified PGs, hostels and student apartments
        with transparent pricing and zero brokerage.
      </p>

      <div className="mt-10 flex flex-col gap-4 lg:flex-row">

        <div className="flex-1">
          <PropertySearchBar />
        </div>

        <SortDropdown />

      </div>

      <div className="mt-6 flex items-center justify-between">

        <p className="text-slate-500">
          <span className="font-bold text-slate-900">
            342
          </span>{" "}
          verified properties found
        </p>

      </div>

      <ActiveFilters />

    </section>
  );
}