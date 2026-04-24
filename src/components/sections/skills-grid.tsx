"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import { Reveal, RevealItem } from "@/components/reveal";

export function SkillsGrid() {
  return (
    <Reveal staggerChildren={0.05} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {PROFILE.skills.map((s) => (
        <RevealItem key={s.title}>
          <Card className="h-full p-6 bg-card/40 border-border/50 hover:border-brand/30 transition-all group">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand group-hover:text-fg transition-colors">
              {s.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <Badge 
                  key={item} 
                  className="bg-white/5 text-fg/80 border-border/50 hover:bg-brand/10 hover:text-brand transition-all"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        </RevealItem>
      ))}
    </Reveal>
  );
}
