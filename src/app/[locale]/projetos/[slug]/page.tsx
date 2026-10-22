import { ArrowLeft, Globe } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GithubIcon } from "@/components/icons";
import { ContactBanner } from "@/components/site/contact-cta";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { TechIcon } from "@/components/site/tech-icon";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPublishedProject, getPublishedProjects } from "@/lib/data";
import { isOptimizable } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projetos/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getPublishedProject(slug, locale);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/projetos/${slug}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/projetos/${slug}`])),
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projetos/[slug]">) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);

  const [project, all, t] = await Promise.all([
    getPublishedProject(slug, locale),
    getPublishedProjects(locale),
    getTranslations("projects"),
  ]);
  if (!project) notFound();

  const others = all.filter((p) => p.id !== project.id).slice(0, 3);
  const gallery = project.images.filter((src) => src !== project.coverImage);

  return (
    <article className="relative pt-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-linear-to-b from-primary/15 to-transparent" />
      <div className="mx-auto max-w-5xl px-5">
        <Link href={{ pathname: "/", hash: "projects" }} className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
          <ArrowLeft size={16} /> {t("back")}
        </Link>

        <Reveal className="mt-8">
          <h1 className="font-display text-4xl font-bold md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.siteUrl && (
              <a href={project.siteUrl} target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg" })}>
                <Globe size={18} /> {t("live")}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg", variant: "outline" })}>
                <GithubIcon size={18} /> {t("code")}
              </a>
            )}
          </div>
        </Reveal>

        {project.coverImage && (
          <Reveal className="mt-12" delay={0.1}>
            <div className="glass relative aspect-video overflow-hidden rounded-3xl">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 1024px, 100vw"
                unoptimized={!isOptimizable(project.coverImage)}
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
          <Reveal className="prose-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
          </Reveal>
          <aside className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <h2 className="mb-4 font-display font-semibold">{t("technologies")}</h2>
              <ul className="space-y-2.5">
                {project.technologies.map((tech) => (
                  <li key={tech.id} className="flex items-center gap-3 text-sm">
                    <TechIcon name={tech.name} icon={tech.icon} size={24} />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {gallery.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-semibold">{t("gallery")}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {gallery.map((src, index) => (
                <Reveal key={src} delay={index * 0.05}>
                  <a href={src} target="_blank" rel="noreferrer" className="glass relative block aspect-16/10 overflow-hidden rounded-2xl">
                    <Image
                      src={src}
                      alt={`${project.title} ${index + 1}`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      unoptimized={!isOptimizable(src)}
                      className="object-cover object-top transition duration-500 hover:scale-105"
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <ContactBanner className="mt-20" />

        {others.length > 0 && (
          <section className="mt-24 pb-24">
            <h2 className="mb-6 font-display text-2xl font-semibold">{t("otherProjects")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
