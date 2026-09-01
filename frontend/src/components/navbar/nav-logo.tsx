import Link from "next/link";

export function NavLogo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
    >
      <div
        className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-blue-600
        to-cyan-500
        text-xl
        font-black
        text-white
        shadow-lg
        shadow-blue-300/40
        transition-all
        duration-300
        group-hover:rotate-6
        group-hover:scale-105
        "
      >
        Z
      </div>

      <div>

        <h2 className="text-xl font-black tracking-tight text-slate-900">
          ZentStay
        </h2>

        <p className="text-xs text-slate-500">
          Student Accommodation
        </p>

      </div>

    </Link>
  );
}