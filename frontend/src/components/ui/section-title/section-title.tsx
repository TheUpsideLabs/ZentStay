interface SectionTitleProps {
  badge: string;
  title: string;
  description: string;
}

export function SectionTitle({
  badge,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        {badge}
      </span>

      <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
        {description}
      </p>
    </div>
  );
}