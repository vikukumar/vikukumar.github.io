"use client";

import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { PROFILE } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { Reveal, RevealItem } from "@/components/reveal";

export function ProjectsGrid() {
  const pinned = PROFILE.projects.pinned;
  const selected = PROFILE.projects.selected;

  return (
    <div className="grid gap-20">
      <Reveal staggerChildren={0.1}>
        <div className="mb-10 flex items-center justify-between">
          <h3 className="text-xl font-bold">Pinned Projects</h3>
          <Badge variant="secondary">{pinned.length} total</Badge>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {pinned.map((p) => (
            <RevealItem key={p.title}>
              <Card className="group relative h-full overflow-hidden p-6 sm:p-8 bg-card/40 border-border/50 hover:border-brand/30 transition-all duration-500">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/5 blur-3xl transition-all duration-500 group-hover:bg-brand/10" />
                
                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h4 className="text-xl font-bold text-fg group-hover:text-brand transition-colors">{p.title}</h4>
                      <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted">{p.stack}</p>
                    </div>
                    <div className="flex gap-2">
                      {p.links.repo && (
                        <ButtonLink href={p.links.repo} variant="secondary" className="h-10 w-10 p-0 rounded-xl">
                          <FaGithub size={18} />
                        </ButtonLink>
                      )}
                      {p.links.demo && (
                        <ButtonLink href={p.links.demo} variant="secondary" className="h-10 w-10 p-0 rounded-xl">
                          <FaArrowUpRightFromSquare size={16} />
                        </ButtonLink>
                      )}
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-muted">{p.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} className="bg-brand/5 text-brand border-brand/10 text-[10px] px-2 py-0">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <ul className="mt-8 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-xs text-muted leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand/50" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </RevealItem>
          ))}
        </div>
      </Reveal>

      <Reveal staggerChildren={0.1}>
        <div className="mb-10 flex items-center justify-between">
          <h3 className="text-xl font-bold">Selected Work</h3>
          <Badge variant="secondary">{selected.length} total</Badge>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {selected.map((p) => (
            <RevealItem key={p.title}>
              <Card className="group h-full p-6 sm:p-8 bg-card/40 border-border/50 hover:border-brand/30 transition-all">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-fg group-hover:text-brand transition-colors">{p.title}</h4>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted">{p.stack}</p>
                  </div>
                  {p.links.demo && (
                    <ButtonLink href={p.links.demo} variant="secondary" className="h-10 w-10 p-0 rounded-xl">
                      <FaArrowUpRightFromSquare size={16} />
                    </ButtonLink>
                  )}
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="bg-white/5 text-muted border-white/5 text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>

                <ul className="mt-8 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-xs text-muted leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted/50" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
