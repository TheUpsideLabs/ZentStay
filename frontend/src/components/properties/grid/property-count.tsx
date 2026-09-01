interface PropertyCountProps {
  total: number;
}

export function PropertyCount({
  total,
}: PropertyCountProps) {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h2 className="text-3xl font-black text-slate-900">
          Explore Properties
        </h2>

        <p className="mt-2 text-slate-500">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {total}
          </span>{" "}
          properties
        </p>

      </div>

    </div>
  );
}