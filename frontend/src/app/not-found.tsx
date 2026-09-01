import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

      <div className="text-center">

        <h1 className="text-8xl font-black text-blue-600">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-black">
          Page Not Found
        </h2>

        <p className="mt-4 max-w-lg text-slate-500">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="
            mt-10
            inline-flex
            rounded-2xl
            bg-blue-600
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Back to Home
        </Link>

      </div>

    </main>
  );
}