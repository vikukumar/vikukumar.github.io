import { cn } from "@/lib/cn";

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const isExternal = /^https?:\/\//i.test(href);
  const styles =
    variant === "primary"
      ? "bg-brand text-bg hover:bg-blue-300"
      : variant === "secondary"
        ? "bg-card/60 text-fg hover:bg-card"
        : "bg-transparent text-muted hover:text-fg";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 px-4 py-2 text-sm transition",
        styles,
        className
      )}
    >
      {children}
    </a>
  );
}
