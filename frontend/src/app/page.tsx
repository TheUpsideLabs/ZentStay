import { Footer } from "@/components/footer";
import { WhyZentStay } from "@/components/features";
import { FAQSection } from "@/components/faq";
import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/home";
import { Navbar } from "@/components/navbar";
import { TestimonialsSection } from "@/components/testimonials";

import { PageWrapper } from "@/components/layout/page-wrapper";

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />

      <Hero />

      <FeaturedProperties />

      <WhyZentStay />

      <TestimonialsSection />

      <FAQSection />

      <Footer />
    </PageWrapper>
  );
}