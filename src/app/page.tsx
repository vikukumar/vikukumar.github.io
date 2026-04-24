/* eslint-disable @next/next/no-img-element */

import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HeroOrbs } from "@/components/hero-orbs";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/data/site";
import { GitHubStats } from "@/components/sections/github-stats";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { SkillsGrid } from "@/components/sections/skills-grid";
import { Scrollytelling } from "@/components/sections/scrollytelling";
import { ScrollTicker } from "@/components/scroll-ticker";

export default function HomePage() {
  return (
    <main>
      <section id="top" className="relative">
        <HeroOrbs />
        <div className="container pb-10 pt-28 sm:pb-16 sm:pt-32">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/40 px-4 py-2 text-xs text-muted shadow-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span>{PROFILE.now}</span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <Reveal>
                <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
                  <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-emerald-200 bg-clip-text text-transparent">
                    {PROFILE.name}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="mt-4 text-pretty text-lg text-muted sm:text-xl">
                  {PROFILE.headline}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-pretty text-muted">
                  {PROFILE.summary}
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={PROFILE.links.resume} variant="primary">
                    Download Resume
                  </ButtonLink>
                  <ButtonLink href={PROFILE.links.github} variant="secondary">
                    <FaGithub className="h-4 w-4" />
                    GitHub
                  </ButtonLink>
                  <ButtonLink href={PROFILE.links.linkedin} variant="secondary">
                    <FaLinkedin className="h-4 w-4" />
                    LinkedIn
                  </ButtonLink>
                  <ButtonLink href={`mailto:${PROFILE.email}`} variant="ghost">
                    <Mail className="h-4 w-4" />
                    Email
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {PROFILE.keywords.map((k) => (
                    <Badge key={k}>{k}</Badge>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {PROFILE.highlights.map((h) => (
                    <div key={h.label} className="glass rounded-2xl p-4">
                      <div className="text-xs text-muted">{h.label}</div>
                      <div className="mt-1 text-sm font-semibold text-fg">{h.value}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-8">
                  <ButtonLink href="#github" variant="ghost" className="rounded-full">
                    Explore my work <ChevronDown className="h-4 w-4" />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <Card className="p-6">
                <div className="text-sm text-muted">Quick info</div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card/40 p-4">
                    <img
                      alt={`${PROFILE.name} avatar`}
                      src={PROFILE.avatarUrl}
                      className="h-14 w-14 rounded-full border border-border/70"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-fg">{PROFILE.name}</div>
                      <div className="truncate text-xs text-muted">Technology Analyst • Infosys</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-brand" />
                    <div>
                      <div className="font-medium text-fg">Location</div>
                      <div className="text-muted">{PROFILE.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-brand" />
                    <div>
                      <div className="font-medium text-fg">Phone</div>
                      <div className="text-muted">{PROFILE.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-brand" />
                    <div>
                      <div className="font-medium text-fg">Email</div>
                      <div className="text-muted">{PROFILE.email}</div>
                    </div>
                  </div>
                  <div className="mt-2 grid gap-1 rounded-xl border border-border/70 bg-card/40 p-4">
                    <div className="text-xs text-muted">Career snapshot</div>
                    <div className="mt-1 text-sm text-muted">
                      <span className="text-fg/90">4+ years</span> • Infosys • Telecom + Finance • API Platforms +
                      GenAI
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <ButtonLink href={SITE.url} variant="ghost">
                      {SITE.url.replace("https://", "")}
                    </ButtonLink>
                    <ButtonLink href={PROFILE.links.portfolio} variant="ghost">
                      linktr.ee
                    </ButtonLink>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
        <ScrollTicker />
      </section>

      <Section id="github" title="GitHub Profile">
        <GitHubStats />
      </Section>

      <Section
        id="skills"
        title="Skills"
        subtitle="Backend, platform engineering, cloud-native, API gateways, GenAI."
      >
        <SkillsGrid />
      </Section>

      <Section
        id="story"
        title="How I Build Systems"
        subtitle="Scroll-linked scrollytelling: design → build → secure → scale → AI enablement."
      >
        <Scrollytelling />
      </Section>

      <Section id="experience" title="Career Timeline">
        <ExperienceTimeline />
      </Section>

      <Section id="projects" title="Projects">
        <ProjectsGrid />
      </Section>

      <Section id="certifications" title="Certifications & Awards">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-base font-semibold">Certifications</h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted">
              {PROFILE.certifications.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-base font-semibold">Awards & Highlights</h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted">
              {PROFILE.awards.map((a) => (
                <li key={a}>• {a}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="education" title="Education">
        <Card className="p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="text-lg font-semibold">{PROFILE.education.degree}</div>
            <div className="text-sm text-muted">{PROFILE.education.years}</div>
          </div>
          <div className="mt-1 text-sm text-muted">{PROFILE.education.institute}</div>
        </Card>
      </Section>

      <Section id="contact" title="Contact">
        <Card className="p-6">
          <p className="text-sm text-muted">
            Want to collaborate or discuss backend / platform engineering / GenAI systems? Reach out.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${PROFILE.email}`} variant="primary">
              <Mail className="h-4 w-4" />
              {PROFILE.email}
            </ButtonLink>
            <ButtonLink href={PROFILE.links.linkedin} variant="secondary">
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </ButtonLink>
            <ButtonLink href={PROFILE.links.github} variant="secondary">
              <FaGithub className="h-4 w-4" />
              GitHub
            </ButtonLink>
            <ButtonLink href={PROFILE.links.resume} variant="ghost">
              Resume PDF
            </ButtonLink>
          </div>
        </Card>
      </Section>
    </main>
  );
}
