import { Container } from "@/components/layout/container";
import { TestimonialCard } from "./testimonial-card";

const testimonials = [
  {
    name: "Rahul Sharma",
    college: "AKGEC • CSE",
    image: "/images/testimonials/student-1.jpg",
    review:
      "I found a verified PG within two days without paying brokerage. The process was smooth and transparent.",
  },
  {
    name: "Ananya Gupta",
    college: "KIET • IT",
    image: "/images/testimonials/student-2.jpg",
    review:
      "The filters helped me compare nearby hostels quickly. Booking a visit was much easier than searching manually.",
  },
  {
    name: "Aditya Singh",
    college: "ABES • AIML",
    image: "/images/testimonials/student-3.jpg",
    review:
      "The property details and student reviews gave me confidence before choosing my accommodation.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Student Stories
          </span>

          <h2 className="mt-5 text-5xl font-black tracking-tight">
            Trusted by Students
            <br />
            Across Campuses
          </h2>

          <p className="mt-6 text-lg text-slate-500">
            Hear what students have to say about finding their accommodation through ZentStay.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}