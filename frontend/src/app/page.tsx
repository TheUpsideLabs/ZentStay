import { Hero } from "@/components/hero/hero";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <Hero />
    </PageWrapper>
  );
}