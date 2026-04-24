"use client";

import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { PROFILE } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";

export function ProjectsGrid() {
  const pinned = PROFILE.projects.pinned;
  const selected = PROFILE.projects.selected;

  const cardMotion = {
    initial: { opacity: 1, y: 14, scale: 0.995, filter: "blur(0px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  } as const;

  return (
    <div className="grid gap-10">
      <div>
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-4">
            <div className="text-sm font-semibold text-fg">Pinned on GitHub</div>
            <div className="text-xs text-muted">{pinned.length} projects</div>
          </div>
          <div className="text-sm text-muted">Recent open-source work and experiments.</div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {pinned.map((p, idx) => (
            <motion.div key={p.title} {...cardMotion} transition={{ ...cardMotion.transition, delay: Math.min(idx * 0.04, 0.2) }}>
              <Card className="relative overflow-hidden p-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10"
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-base font-semibold">{p.title}</div>
                      <div className="mt-1 text-sm text-muted">{p.stack}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.links.repo ? (
                        <ButtonLink href={p.links.repo} variant="ghost" className="px-3 py-2">
                          <FaGithub className="h-4 w-4" />
                        </ButtonLink>
                      ) : null}
                      {p.links.demo ? (
                        <ButtonLink href={p.links.demo} variant="ghost" className="px-3 py-2">
                          <FaArrowUpRightFromSquare className="h-4 w-4" />
                        </ButtonLink>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-muted">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} className="text-fg/90">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <ul className="mt-4 grid gap-2 text-sm text-muted">
                    {p.points.map((pt) => (
                      <li key={pt}>• {pt}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-4">
            <div className="text-sm font-semibold text-fg">Selected Work</div>
            <div className="text-xs text-muted">{selected.length} projects</div>
          </div>
          <div className="text-sm text-muted">Enterprise and longer-term projects from my career.</div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {selected.map((p, idx) => (
            <motion.div key={p.title} {...cardMotion} transition={{ ...cardMotion.transition, delay: Math.min(idx * 0.04, 0.16) }}>
              <Card className="p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-base font-semibold">{p.title}</div>
                    <div className="mt-1 text-sm text-muted">{p.stack}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.links.demo ? (
                      <ButtonLink href={p.links.demo} variant="ghost" className="px-3 py-2">
                        <FaArrowUpRightFromSquare className="h-4 w-4" />
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="text-fg/90">
                      {t}
                    </Badge>
                  ))}
                </div>

                <ul className="mt-4 grid gap-2 text-sm text-muted">
                  {p.points.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
