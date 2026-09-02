export function HeroHeading() {
  return (
    <div className="mt-4 sm:mt-6">
      <h1
        className="
          mx-auto
          max-w-[700px]
          text-3xl
          font-black
          leading-[1.15]
          tracking-tight
          text-slate-900
          sm:text-5xl
          sm:leading-[1.08]
          lg:mx-0
          lg:text-7xl
        "
      >
        Where do you
        <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          want to stay?
        </span>
        <span className="block text-2xl sm:text-4xl lg:text-5xl text-slate-800 font-extrabold mt-2 sm:mt-3">
          Find your perfect PG.
        </span>
      </h1>
    </div>
  );
}