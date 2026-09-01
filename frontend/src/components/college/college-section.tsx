import { Container } from "@/components/layout/container";
import { CollegeCard } from "./college-card";

const colleges = [
  {
    name: "AKGEC",
    image: "/images/colleges/akgec.jpg",
    properties: 128,
    startingPrice: 6500,
  },
  {
    name: "KIET",
    image: "/images/colleges/kiet.jpg",
    properties: 96,
    startingPrice: 7200,
  },
  {
    name: "ABES",
    image: "/images/colleges/abes.jpg",
    properties: 154,
    startingPrice: 7000,
  },
  {
    name: "GL Bajaj",
    image: "/images/colleges/glbajaj.jpg",
    properties: 102,
    startingPrice: 7600,
  },
  {
    name: "NIET",
    image: "/images/colleges/niet.jpg",
    properties: 88,
    startingPrice: 6800,
  },
  {
    name: "IMS",
    image: "/images/colleges/ims.jpg",
    properties: 65,
    startingPrice: 6400,
  },
];

export function CollegeSection() {
  return (
    <section className="bg-slate-50 py-28">

      <Container>

        <div className="mx-auto max-w-2xl text-center">

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            Explore by College
          </span>

          <h2 className="mt-4 text-5xl font-black">
            Find Accommodation
            <br />
            Near Your Campus
          </h2>

          <p className="mt-6 text-lg text-slate-500">
            Browse verified PGs around India's top colleges.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {colleges.map((college) => (
            <CollegeCard
              key={college.name}
              {...college}
            />
          ))}

        </div>

      </Container>

    </section>
  );
}