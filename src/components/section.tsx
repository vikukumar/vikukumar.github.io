"use client";

import { Reveal, RevealItem } from "@/components/reveal";

export function Section({
  id,
  title,
  subtitle,
  children,
  className
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 border-t border-border/40 ${className}`}>
      <div className="container py-16 sm:py-32">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-brand" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              {id}
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">{title}</h2>
          {subtitle && (
            <p className="max-w-2xl text-xl text-muted leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="relative">
          {children}
        </div>
      </div>
    </section>
  );
}
