import { Briefcase, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

const items = [
  { key: "mobilemed", from: "09/2025", to: null, icon: Briefcase },
  { key: "biointegral", from: "08/2010", to: "09/2025", icon: Briefcase },
  { key: "etec", from: "01/2024", to: "08/2025", icon: GraduationCap },
  { key: "santander", from: "2023", to: "2023", icon: GraduationCap },
  { key: "cubos", from: "08/2022", to: "04/2023", icon: GraduationCap },
  { key: "physio", from: "06/2002", to: "07/2007", icon: GraduationCap },
] as const;

export function Experience() {
  const t = useTranslations("experience");

  return (
    <Section id="experience">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <ol className="relative ml-3 border-l border-border md:ml-6">
        {items.map(({ key, from, to, icon: Icon }, index) => (
          <li key={key} className="relative pb-12 pl-10 last:pb-0 md:pl-14">
            <span className="absolute left-[-1.1rem] top-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-lg shadow-primary/10">
              <Icon size={16} />
            </span>
            <Reveal delay={index * 0.08}>
              <div className="glass rounded-2xl p-6 transition hover:border-primary/40 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold">{t(`items.${key}.role`)}</h3>
                  <span className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                    {from === to ? from : `${from} – ${to ?? t("present")}`}
                  </span>
                </div>
                <p className="mt-1 text-accent">{t(`items.${key}.company`)}</p>
                <p className="mt-4 leading-relaxed text-muted">{t(`items.${key}.description`)}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
