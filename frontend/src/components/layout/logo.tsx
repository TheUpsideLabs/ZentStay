export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
        Z
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">
          ZentStay
        </h1>

        <p className="text-xs text-muted-foreground">
          Student Accommodation
        </p>
      </div>
    </div>
  );
}