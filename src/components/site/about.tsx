import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

export function About({ projectCount }: { projectCount: number }) {
  const t = useTranslations("about");

  const stats = [
    { value: "15%", label: t("stats.savings") },
    { value: "+100%", label: t("stats.productivity") },
    { value: `${projectCount}+`, label: t("stats.projects") },
  ];

  return (
    <Section id="about">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p className="pt-2 font-mono text-sm text-foreground/70">{t("softSkills")}</p>
        </Reveal>
        <div className="grid gap-4 self-start">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1}>
              <div className="glass group rounded-2xl p-6 transition hover:border-primary/50">
                <p className="font-display text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
