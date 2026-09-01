"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({
  reset,
}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

      <div className="text-center">

        <h1 className="text-6xl font-black text-red-600">
          Oops!
        </h1>

        <p className="mt-5 text-slate-600">
          Something went wrong.
        </p>

        <button
          onClick={reset}
          className="
            mt-8
            rounded-2xl
            bg-blue-600
            px-8
            py-4
            font-semibold
            text-white
          "
        >
          Try Again
        </button>

      </div>

    </main>
  );
}