import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <Section>
      <Container>
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-8 py-20 text-center text-white shadow-2xl md:px-16">

          <h2 className="text-4xl font-black md:text-6xl">
            Ready to Find Your Perfect Stay?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Join thousands of students who found verified accommodation with
            ZentStay.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100"
            >
              Explore Properties
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              List Your Property
            </Button>

          </div>

        </div>
      </Container>
    </Section>
  );
}