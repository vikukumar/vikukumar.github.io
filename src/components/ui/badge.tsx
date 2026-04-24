import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  variant = "primary"
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}) {
  const variants = {
    primary: "border-border/70 bg-card/40 text-muted",
    secondary: "border-brand/20 bg-brand/10 text-brand",
    outline: "border-brand/50 bg-transparent text-brand"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
