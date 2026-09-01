"use client";

import { Star } from "lucide-react";

import { Container } from "@/components/layout/container";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    college: "AKGEC",
    rating: 5,
    review:
      "Finding a PG near campus became super easy with ZentStay. The verification process gave me confidence before booking.",
  },
  {
    id: 2,
    name: "Priya Singh",
    college: "KIET",
    rating: 5,
    review:
      "Loved the nearby PG recommendations. Photos matched the actual property and pricing was transparent.",
  },
  {
    id: 3,
    name: "Aditya Verma",
    college: "ABES",
    rating: 4,
    review:
      "Very clean UI and verified listings. Saved me a lot of time during admission.",
  },
];

export function CollegeReviews() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Student Reviews
          </span>

          <h2 className="mt-4 text-4xl font-black">
            What Students Say
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Experiences shared by students who found accommodation using
            ZentStay.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-slate-600">
                "{review.review}"
              </p>

              <div className="mt-8">
                <h4 className="font-bold">
                  {review.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {review.college}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}