import { ArrowUpRight, Globe, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { PublicProject } from "@/lib/data";
import { isOptimizable } from "@/lib/images";

export function ProjectCard({ project }: { project: PublicProject }) {
  const t = useTranslations("projects");
  const visibleTechs = project.technologies.slice(0, 5);
  const extra = project.technologies.length - visibleTechs.length;

  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      <Link href={`/projetos/${project.slug}`} className="relative block aspect-video overflow-hidden bg-surface-2">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized={!isOptimizable(project.coverImage)}
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/30 to-accent/20 font-display text-3xl font-bold">
            {project.title}
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
        {project.featured && (
          <Badge className="absolute left-4 top-4 border-amber-300 bg-amber-400 font-semibold text-black shadow-lg">
            <Star size={12} className="fill-current" /> {t("featured")}
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold">
          <Link href={`/projetos/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {visibleTechs.map((tech) => (
            <li key={tech.id}>
              <Badge>{tech.name}</Badge>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <Badge>+{extra}</Badge>
            </li>
          )}
        </ul>

        <div className="relative z-10 mt-6 flex items-center gap-1 whitespace-nowrap border-t border-border/60 pt-5 text-sm">
          {project.siteUrl && (
            <a href={project.siteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-foreground/90 transition hover:bg-surface-2">
              <Globe size={15} /> {t("live")}
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-foreground/90 transition hover:bg-surface-2">
              <GithubIcon size={15} /> {t("code")}
            </a>
          )}
          <span className="ml-auto flex items-center gap-1 text-accent opacity-0 transition group-hover:opacity-100">
            {t("details")} <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </article>
  );
}
