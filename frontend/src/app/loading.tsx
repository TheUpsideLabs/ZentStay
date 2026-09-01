export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">

      <div className="text-center">

        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

        <p className="mt-6 text-slate-600">
          Loading...
        </p>

      </div>

    </main>
  );
}