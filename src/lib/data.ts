import "server-only";
import type { Prisma, TechCategory } from "@/generated/prisma/client";
import { routing } from "@/i18n/routing";
import { prisma } from "./prisma";

export type PublicTechnology = {
  id: string;
  name: string;
  icon: string | null;
  category: TechCategory;
};

export type PublicProject = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  githubUrl: string | null;
  siteUrl: string | null;
  coverImage: string | null;
  images: string[];
  featured: boolean;
  technologies: PublicTechnology[];
  updatedAt: Date;
};

const projectInclude = {
  translations: true,
  technologies: { orderBy: [{ category: "asc" }, { order: "asc" }] },
} satisfies Prisma.ProjectInclude;

type ProjectWithRelations = Prisma.ProjectGetPayload<{ include: typeof projectInclude }>;

function toPublicProject(project: ProjectWithRelations, locale: string): PublicProject {
  const translation =
    project.translations.find((t) => t.locale === locale) ??
    project.translations.find((t) => t.locale === routing.defaultLocale) ??
    project.translations[0];

  return {
    id: project.id,
    slug: project.slug,
    title: translation?.title ?? project.slug,
    summary: translation?.summary ?? "",
    content: translation?.content ?? "",
    githubUrl: project.githubUrl,
    siteUrl: project.siteUrl,
    coverImage: project.coverImage,
    images: project.images,
    featured: project.featured,
    technologies: project.technologies.map(({ id, name, icon, category }) => ({
      id,
      name,
      icon,
      category,
    })),
    updatedAt: project.updatedAt,
  };
}

export async function getPublishedProjects(locale: string) {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: projectInclude,
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
  return projects.map((project) => toPublicProject(project, locale));
}

export async function getPublishedProject(slug: string, locale: string) {
  const project = await prisma.project.findFirst({
    where: { slug, published: true },
    include: projectInclude,
  });
  return project ? toPublicProject(project, locale) : null;
}

export async function getSkills() {
  return prisma.technology.findMany({
    where: { showInSkills: true },
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
    select: { id: true, name: true, icon: true, category: true },
  });
}
