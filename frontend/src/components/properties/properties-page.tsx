import { Navbar } from "@/components/navbar/navbar";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Container } from "@/components/layout/container";
import { FilterSidebar } from "./filter-sidebar";
import { PropertyGrid } from "./property-grid";
import { ResultsHeader } from "./results-header";

export function PropertiesPage() {
  return (
    <PageWrapper>
      <Navbar />

      <main className="pt-36 pb-20">
        <Container>

          <ResultsHeader />

          <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">

            <FilterSidebar />

            <PropertyGrid />

          </div>

        </Container>
      </main>
    </PageWrapper>
  );
}