import type { TechCategory } from "@/generated/prisma/enums";
import { Database, Layers, MonitorSmartphone, ServerCog, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PublicTechnology } from "@/lib/data";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { TechIcon } from "./tech-icon";

const categoryIcons: Record<TechCategory, typeof Layers> = {
  FRONTEND: MonitorSmartphone,
  BACKEND: ServerCog,
  DATABASE: Database,
  TOOLS: Wrench,
};

const categories: TechCategory[] = ["FRONTEND", "BACKEND", "DATABASE", "TOOLS"];

export function Skills({ skills }: { skills: PublicTechnology[] }) {
  const t = useTranslations("skills");

  const languages = [
    { name: t("languages.pt"), level: t("languages.native") },
    { name: t("languages.en"), level: "C1" },
    { name: t("languages.fr"), level: "B2" },
  ];

  return (
    <Section id="skills">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((category, index) => {
          const items = skills.filter((s) => s.category === category);
          if (!items.length) return null;
          const Icon = categoryIcons[category];
          return (
            <Reveal key={category} delay={index * 0.08}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
                  <Icon size={18} className="text-accent" />
                  {t(`categories.${category}`)}
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-2/70 py-2 pl-2 pr-4 text-sm transition hover:-translate-y-0.5 hover:border-primary/50"
                    >
                      <TechIcon name={skill.name} icon={skill.icon} size={28} />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-5">
        <div className="glass flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-center md:justify-between">
          <h3 className="font-display text-lg font-semibold">{t("languagesTitle")}</h3>
          <ul className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <li key={lang.name} className="flex items-center gap-2 rounded-xl bg-surface-2/70 px-4 py-2 text-sm">
                {lang.name}
                <span className="font-mono text-xs text-accent">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
