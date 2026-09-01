import { SearchX } from "lucide-react";

import { Button } from "./button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

export function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-300 bg-slate-50 px-8 py-20 text-center">

      <div className="rounded-full bg-blue-100 p-5">

        <SearchX className="h-10 w-10 text-blue-600" />

      </div>

      <h2 className="mt-6 text-3xl font-black text-slate-900">
        {title}
      </h2>

      <p className="mt-3 max-w-md leading-8 text-slate-500">
        {description}
      </p>

      {buttonText && (
        <Button
          onClick={onClick}
          className="mt-8 rounded-2xl"
        >
          {buttonText}
        </Button>
      )}

    </div>
  );
}