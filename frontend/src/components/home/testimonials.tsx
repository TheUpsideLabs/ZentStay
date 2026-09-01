import { testimonials } from "@/data/testimonials";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/ui/section-title/section-title";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";

export function Testimonials() {
  return (
    <Section>
      <Container>
        <SectionTitle
          badge="Testimonials"
          title="Loved by Students"
          description="Thousands of students trust ZentStay to find their next home."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              college={testimonial.college}
              rating={testimonial.rating}
              review={testimonial.review}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}