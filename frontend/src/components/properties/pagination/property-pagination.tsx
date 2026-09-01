"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PropertyPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (
    page: number
  ) => void;
}

export function PropertyPagination({
  page,
  totalPages,
  onPageChange,
}: PropertyPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-center gap-2 py-12">
      <button
        type="button"
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-600
          transition
          hover:border-blue-500
          hover:text-blue-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() =>
            onPageChange(pageNumber)
          }
          className={`
            h-11
            min-w-11
            rounded-xl
            px-3
            font-semibold
            transition
            ${
              pageNumber === page
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:text-blue-600"
            }
          `}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={
          page === totalPages
        }
        onClick={() =>
          onPageChange(page + 1)
        }
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-600
          transition
          hover:border-blue-500
          hover:text-blue-600
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}