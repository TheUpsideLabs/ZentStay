interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FilterSection({
  title,
  children,
}: FilterSectionProps) {
  return (
    <section className="border-b border-slate-200 pb-6">
      <h3 className="mb-4 text-lg font-semibold">
        {title}
      </h3>

      {children}
    </section>
  );
}