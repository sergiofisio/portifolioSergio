import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Content } from "@/components/site/content";
import { Experience } from "@/components/site/experience";
import { Hero } from "@/components/site/hero";
import { ProjectsGrid } from "@/components/site/projects";
import { Section, SectionHeading } from "@/components/site/section";
import { Services } from "@/components/site/services";
import { Skills } from "@/components/site/skills";
import type { Locale } from "@/i18n/routing";
import { getPublishedProjects, getSkills } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const [projects, skills, t] = await Promise.all([
    getPublishedProjects(locale),
    getSkills(),
    getTranslations("projects"),
  ]);

  return (
    <>
      <Hero />
      <About projectCount={projects.length} />
      <Experience />
      <Skills skills={skills} />
      <Section id="projects">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <ProjectsGrid projects={projects} />
      </Section>
      <Services />
      <Content />
      <Contact />
    </>
  );
}
