import { FilterHeader } from "./filter-header";
import { FilterSection } from "./filter-section";
import { FilterCheckbox } from "./filter-checkbox";
import { QuickFilterChip } from "./quick-filter-chip";
import { BudgetSlider } from "./budget-slider";
import { RatingFilter } from "./rating-filter";

export function FilterSidebar() {
  return (
    <aside className="sticky top-32 h-fit rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">

      <FilterHeader />

      <FilterSection title="Quick Filters">
        <div className="flex flex-wrap gap-3">
          <QuickFilterChip label="Near College" />
          <QuickFilterChip label="Verified" />
          <QuickFilterChip label="Budget Friendly" />
          <QuickFilterChip label="Top Rated" />
        </div>
      </FilterSection>

      <div className="mt-8 space-y-8">

        <FilterSection title="Budget">
          <BudgetSlider />
        </FilterSection>

        <FilterSection title="Minimum Rating">
          <RatingFilter />
        </FilterSection>

        <FilterSection title="Accommodation">
          <div className="space-y-2">
            <FilterCheckbox label="PG" />
            <FilterCheckbox label="Hostel" />
            <FilterCheckbox label="Apartment" />
          </div>
        </FilterSection>

        <FilterSection title="Amenities">
          <div className="space-y-2">
            <FilterCheckbox label="WiFi" />
            <FilterCheckbox label="AC" />
            <FilterCheckbox label="Food Included" />
            <FilterCheckbox label="Laundry" />
            <FilterCheckbox label="Parking" />
            <FilterCheckbox label="Power Backup" />
          </div>
        </FilterSection>

        <FilterSection title="Suitable For">
          <div className="space-y-2">
            <FilterCheckbox label="Boys" />
            <FilterCheckbox label="Girls" />
            <FilterCheckbox label="Co-Living" />
          </div>
        </FilterSection>

      </div>

    </aside>
  );
}