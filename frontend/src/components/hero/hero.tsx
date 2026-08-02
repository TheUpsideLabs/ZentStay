import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const stats = [
  {
    value: "500+",
    label: "Verified Properties",
  },
  {
    value: "40+",
    label: "Partner Colleges",
  },
  {
    value: "10K+",
    label: "Students Helped",
  },
  {
    value: "4.9★",
    label: "Average Rating",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-24 lg:py-36">

      {/* Background Blur */}
      <div className="absolute left-1/2 top-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <Container>

        <div className="relative z-10 mx-auto max-w-5xl text-center">

          <span className="inline-flex rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            🇮🇳 India's Smart Student Accommodation Platform
          </span>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-7xl">

            Find Your

            <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">

              Perfect Stay

            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">

            Discover verified PGs, hostels and student
            accommodations near your college with
            transparent pricing, verified owners and
            zero brokerage.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

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

          {/* Trust Badges */}

          <div className="mt-12 flex flex-wrap justify-center gap-3">

            <div className="rounded-full border bg-white px-4 py-2 shadow-sm">
              ✅ Verified Owners
            </div>

            <div className="rounded-full border bg-white px-4 py-2 shadow-sm">
              💰 Zero Brokerage
            </div>

            <div className="rounded-full border bg-white px-4 py-2 shadow-sm">
              🔒 Secure Booking
            </div>

          </div>

          {/* Statistics */}

          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">

            {stats.map((item) => (

              <div
                key={item.label}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <h2 className="text-3xl font-bold text-blue-600">

                  {item.value}

                </h2>

                <p className="mt-2 text-sm text-slate-500">

                  {item.label}

                </p>

              </div>

            ))}

          </div>

        </div>

      </Container>

    </section>
  );
}