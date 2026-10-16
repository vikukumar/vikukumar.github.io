import { cn } from "@/lib/cn";

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass portfolio-card-3d rounded-2xl shadow-glow transition-all hover:border-brand/30 hover:bg-card/70",
        className
      )}
    >
      {children}
    </div>
  );
}
