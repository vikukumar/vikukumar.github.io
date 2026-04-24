import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/reveal";

export function SkillsGrid() {
  const groups = PROFILE.skills;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {groups.map((g, idx) => (
        <Reveal key={g.title} delay={Math.min(idx * 0.05, 0.2)}>
          <Card className="p-6">
            <h3 className="text-base font-semibold">{g.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <Badge key={s} className="text-fg/90">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
