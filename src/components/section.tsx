import { Reveal } from "@/components/reveal";

export function Section({
  id,
  title,
  subtitle,
  children
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border/70">
      <div className="container py-16">
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400" />
            <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
            {subtitle ? <p className="text-muted">{subtitle}</p> : null}
          </div>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
