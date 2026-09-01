"use client";

import { Container } from "@/components/layout/container";

import { useCollege } from "@/hooks/useCollege";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";

import { CollegeHeader } from "./college-header";
import { FilterBar } from "./filters/filter-bar";
import { PropertyCount } from "./grid/property-count";
import { PropertyGrid } from "./grid/property-grid";
import { PropertyPagination } from "./pagination/property-pagination";
import { PropertySearch } from "./search/property-search";

export function ListingPage() {
  const { college } = useCollege();

  const {
    properties,

    search,
    setSearch,

    verifiedOnly,
    setVerifiedOnly,

    availableOnly,
    setAvailableOnly,

    rentPeriod,
    setRentPeriod,

    gender,
    setGender,

    roomType,
    setRoomType,

    furnishing,
    setFurnishing,

    minRent,
    setMinRent,

    maxRent,
    setMaxRent,

    sort,
    setSort,

    clearAllFilters,
    hasActiveFilters,

    page,
    total,
    totalPages,
    setPage,

    loading,
    error,
  } = usePropertyFilters();

  return (
    <section className="py-12">
      <Container>

        <PropertySearch
          search={search}
          setSearch={setSearch}
        />

        <CollegeHeader
          college={college}
        />

        <FilterBar
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}

          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}

          rentPeriod={rentPeriod}
          setRentPeriod={setRentPeriod}

          gender={gender}
          setGender={setGender}

          roomType={roomType}
          setRoomType={setRoomType}

          furnishing={furnishing}
          setFurnishing={setFurnishing}

          minRent={minRent}
          setMinRent={setMinRent}

          maxRent={maxRent}
          setMaxRent={setMaxRent}

          sort={sort}
          setSort={setSort}

          clearAllFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {loading ? (
          <div className="mt-16 flex min-h-[300px] items-center justify-center">
            <div className="text-center">

              <div
                className="
                  mx-auto
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-slate-200
                  border-t-blue-600
                "
              />

              <p className="mt-4 font-medium text-slate-500">
                Loading properties...
              </p>

            </div>
          </div>
        ) : error ? (
          <div className="mt-16 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

            <p className="font-semibold text-red-600">
              {error}
            </p>

          </div>
        ) : (
          <>
            <PropertyCount
              total={total}
            />

            {properties.length > 0 ? (
              <PropertyGrid
                properties={properties}
              />
            ) : (
              <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">

                <h3 className="text-xl font-bold text-slate-900">
                  No properties found
                </h3>

                <p className="mt-2 text-slate-500">
                  Try changing your search or filters.
                </p>

              </div>
            )}

            {totalPages > 1 && (
              <PropertyPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}

      </Container>
    </section>
  );
}