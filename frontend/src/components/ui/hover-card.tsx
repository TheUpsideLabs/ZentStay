import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({
  children,
  className,
}: HoverCardProps) {
  return (
    <div
      className={cn(
        `
        rounded-[30px]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-xl
        hover:shadow-blue-100/30
        `,
        className
      )}
    >
      {children}
    </div>
  );
}