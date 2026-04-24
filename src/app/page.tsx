/* eslint-disable @next/next/no-img-element */

import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HeroOrbs } from "@/components/hero-orbs";
import { Reveal, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { Parallax } from "@/components/parallax";
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
    <main className="relative">
      {/* Background Decor */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgb(var(--bg))_90%)]" />
      </div>

      <section id="top" className="relative flex min-h-screen flex-col justify-center">
        <HeroOrbs />
        <div className="container relative z-10 py-20 sm:py-32">
          <Reveal variant="fade" delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-xs font-medium text-brand shadow-glow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span>{PROFILE.now}</span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <Reveal staggerChildren={0.1} delay={0.2}>
              <RevealItem>
                <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-8xl">
                  <span className="gradient-text bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-300">
                    {PROFILE.name}
                  </span>
                </h1>
              </RevealItem>
              <RevealItem className="mt-6">
                <p className="text-pretty text-xl font-medium text-fg/90 sm:text-2xl">
                  {PROFILE.headline}
                </p>
              </RevealItem>
              <RevealItem className="mt-6">
                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted">
                  {PROFILE.summary}
                </p>
              </RevealItem>

              <RevealItem className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href={PROFILE.links.resume} variant="primary" className="h-12 px-8 text-base shadow-glow transition-all hover:scale-105">
                  Download Resume
                </ButtonLink>
                <div className="flex gap-2">
                  <ButtonLink href={PROFILE.links.github} variant="secondary" className="h-12 w-12 p-0">
                    <FaGithub className="h-5 w-5" />
                  </ButtonLink>
                  <ButtonLink href={PROFILE.links.linkedin} variant="secondary" className="h-12 w-12 p-0">
                    <FaLinkedin className="h-5 w-5" />
                  </ButtonLink>
                  <ButtonLink href={`mailto:${PROFILE.email}`} variant="ghost" className="h-12 w-12 p-0">
                    <Mail className="h-5 w-5" />
                  </ButtonLink>
                </div>
              </RevealItem>

              <RevealItem className="mt-12 flex flex-wrap gap-2">
                {PROFILE.keywords.map((k) => (
                  <Badge key={k} className="bg-card/50 px-3 py-1 text-xs border-border/50">{k}</Badge>
                ))}
              </RevealItem>
            </Reveal>

            <Reveal variant="scale" delay={0.4} className="lg:block">
              <Parallax offset={30}>
                <Card className="overflow-hidden border-brand/10 bg-card/40 backdrop-blur-xl">
                  <div className="aspect-[4/3] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                    <img
                      alt={`${PROFILE.name} avatar`}
                      src={PROFILE.avatarUrl}
                      className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 relative z-20 -mt-20">
                    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-2xl">
                      <div className="min-w-0">
                        <div className="truncate text-lg font-bold text-fg">{PROFILE.name}</div>
                        <div className="truncate text-sm text-muted">Technology Analyst @ Infosys</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                          <MapPin size={16} />
                        </div>
                        <span className="text-muted">{PROFILE.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                          <Mail size={16} />
                        </div>
                        <span className="text-muted">{PROFILE.email}</span>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {PROFILE.highlights.slice(0, 2).map((h) => (
                        <div key={h.label} className="rounded-xl border border-white/5 bg-white/5 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-muted">{h.label}</div>
                          <div className="mt-1 text-sm font-bold text-fg">{h.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Parallax>
            </Reveal>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-muted h-6 w-6" />
        </div>
      </section>

      <ScrollTicker />

      <Section id="github" title="GitHub Intelligence" subtitle="Live data directly from GitHub API. Open source contributions and activity.">
        <GitHubStats />
      </Section>

      <Section
        id="skills"
        title="Technical Arsenal"
        subtitle="Core competencies in platform engineering, backend systems, and cloud architecture."
      >
        <SkillsGrid />
      </Section>

      <Section
        id="story"
        title="Engineering Philosophy"
        subtitle="How I conceptualize, build, and scale production-grade systems."
      >
        <Scrollytelling />
      </Section>

      <Section id="experience" title="Professional Journey" subtitle="My career progression and key milestones.">
        <ExperienceTimeline />
      </Section>

      <Section id="projects" title="Featured Work" subtitle="Selected projects showcasing architecture and problem-solving.">
        <ProjectsGrid />
      </Section>

      <Section id="certifications" title="Validation & Awards">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal variant="slide-right">
            <Card className="h-full p-8 bg-card/30 border-brand/5">
              <h3 className="text-xl font-bold">Certifications</h3>
              <ul className="mt-6 grid gap-4">
                {PROFILE.certifications.map((c) => (
                  <RevealItem key={c} className="flex items-center gap-3 text-muted hover:text-fg transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span className="text-sm font-medium">{c}</span>
                  </RevealItem>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal variant="slide-left">
            <Card className="h-full p-8 bg-card/30 border-brand/5">
              <h3 className="text-xl font-bold">Awards & Highlights</h3>
              <ul className="mt-6 grid gap-4">
                {PROFILE.awards.map((a) => (
                  <RevealItem key={a} className="flex items-center gap-3 text-muted hover:text-fg transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium">{a}</span>
                  </RevealItem>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section id="education" title="Academic Background">
        <Reveal variant="scale">
          <Card className="p-8 bg-card/30 border-brand/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 text-brand/10">
              <div className="text-8xl font-black">{PROFILE.education.years.split("-")[1]}</div>
            </div>
            <div className="relative z-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-2xl font-bold text-fg">{PROFILE.education.degree}</div>
                <Badge variant="secondary" className="w-fit">{PROFILE.education.years}</Badge>
              </div>
              <div className="mt-2 text-lg text-muted font-medium">{PROFILE.education.institute}</div>
              <div className="mt-6 flex items-center gap-2 text-sm text-brand">
                <div className="h-px w-8 bg-brand" />
                <span>First Class with Distinction</span>
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      <Section id="contact" title="Get in Touch" subtitle="Let's build something amazing together.">
        <Reveal variant="slide-up">
          <Card className="p-10 bg-gradient-to-br from-card/80 to-card/40 border-brand/10 text-center">
            <h3 className="text-3xl font-bold">Have a project in mind?</h3>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              I'm always open to discussing platform engineering, backend architecture, or GenAI integrations.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href={`mailto:${PROFILE.email}`} variant="primary" className="h-12 px-10 text-base shadow-glow">
                <Mail className="mr-2 h-5 w-5" />
                {PROFILE.email}
              </ButtonLink>
              <ButtonLink href={PROFILE.links.linkedin} variant="secondary" className="h-12 px-10 text-base">
                <FaLinkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </ButtonLink>
            </div>
          </Card>
        </Reveal>
      </Section>
    </main>
  );
}
