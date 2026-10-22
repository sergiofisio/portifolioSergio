import { Code2, Languages, MonitorSmartphone, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

const services = [
  { key: "sites", icon: Rocket },
  { key: "apps", icon: Code2 },
  { key: "responsive", icon: MonitorSmartphone },
  { key: "multilingual", icon: Languages },
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <Section id="services">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ key, icon: Icon }, index) => (
          <Reveal key={key} delay={index * 0.08}>
            <div className="glass group h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/50">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/25 to-accent/25 text-accent transition group-hover:scale-110">
                <Icon size={22} />
              </span>
              <h3 className="font-display text-lg font-semibold">{t(`items.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(`items.${key}.description`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
