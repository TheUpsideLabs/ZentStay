import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/ui/section-title/section-title";
import { CategoryCard } from "@/components/category/category-card";
import { categories } from "@/data/categories";

export function Categories() {
  return (
    <Section>
      <Container>

        <SectionTitle
          badge="Categories"
          title="Find Your Perfect Match"
          description="Browse accommodations based on your lifestyle and preferences."
        />

        <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </Container>
    </Section>
  );
}