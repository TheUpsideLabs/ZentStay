import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/ui/section-title/section-title";
import { CollegeCard } from "@/components/college/college-card";
import { colleges } from "@/data/colleges";

export function NearbyColleges() {
  return (
    <Section>
      <Container>
        <SectionTitle
          badge="Nearby Colleges"
          title="Find a Stay Near Your Campus"
          description="Explore student accommodation around the colleges that matter most to you."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {colleges.map((college) => (
            <CollegeCard
              key={college.id}
              name={college.shortName}
              image={college.banner}
              properties={college.totalProperties}
              startingPrice={0}
              slug={college.slug}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}