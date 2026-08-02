import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-24 lg:py-36">

      {/* Background Blur */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <Container>

        <div className="relative z-10 mx-auto max-w-5xl text-center">

          <span className="inline-flex rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            🇮🇳 India's Smart Student Accommodation Platform
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">

            Find Your

            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">

              Perfect Stay

            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">

            Discover verified PGs, Hostels and Student
            Accommodations near your college with
            transparent pricing, verified owners and
            zero brokerage.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Button size="lg">

              Explore Properties

            </Button>

            <Button
              size="lg"
              variant="outline"
            >

              List Your Property

            </Button>

          </div>

        </div>

      </Container>

    </section>
  );
}