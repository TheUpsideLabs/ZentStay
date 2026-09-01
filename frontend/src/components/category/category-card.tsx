import { Category } from "@/types/category";

interface Props {
  category: Category;
}

export function CategoryCard({ category }: Props) {
  return (
    <div className="group cursor-pointer rounded-3xl border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">

      <div className="text-5xl">
        {category.icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {category.name}
      </h3>

      <p className="mt-2 text-slate-500">
        {category.properties} Properties
      </p>

    </div>
  );
}