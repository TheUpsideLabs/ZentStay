import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PropertyCard } from "@/components/property";
import { College } from "@/services/college.service";
import { mapProperty } from "@/mappers/property.mapper";

interface Props {
  college: College;
}

export function CollegeNearby({ college }: Props) {
  const rawProperties = college.properties || [];
  const nearbyProperties = rawProperties.map((p) =>
    mapProperty({
      ...p,
      college: p.college || {
        id: college.id,
        name: college.name,
        shortName: college.shortName,
        slug: college.slug,
      },
      images: p.images || [],
    })
  );

  return (
    <section className="py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              Nearby Accommodations
            </span>

            <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
              Verified Stays Near {college.shortName || college.name}
            </h2>
          </div>

          <Link
            href={`/properties?collegeId=${college.id}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-5 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
          >
            Find Stays Near This College →
          </Link>
        </div>

        {nearbyProperties.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              No Accommodations Listed Yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Be the first owner to list a student stay near {college.name}.
            </p>

            <Link
              href="/owner/properties/new"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              + List Property Near This College
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {nearbyProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}