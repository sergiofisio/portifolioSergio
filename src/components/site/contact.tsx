import { useTranslations } from "next-intl";
import { ContactChannels } from "./contact-channels";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact">
      <div className="absolute inset-x-5 top-10 -z-10 h-96 rounded-full bg-primary/20 blur-[140px]" />
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Reveal>
        <div className="rounded-[2rem] bg-linear-to-br from-primary via-accent/50 to-primary p-px shadow-2xl shadow-primary/20">
          <div className="grid gap-10 rounded-[calc(2rem-1px)] bg-surface/95 p-6 md:p-10 lg:grid-cols-[1fr_1.4fr]">
            <ContactChannels />
            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-muted">{t("orForm")}</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
