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
        "glass rounded-2xl shadow-glow transition hover:border-blue-300/30 hover:bg-card/70",
        className
      )}
    >
      {children}
    </div>
  );
}
