import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function localized(path: string) {
  return Object.fromEntries(routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project
    .findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })
    .catch(() => []);

  const home = routing.locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: localized("") },
  }));

  const projectPages = projects.flatMap((project) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}/projetos/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: localized(`/projetos/${project.slug}`) },
    })),
  );

  return [...home, ...projectPages];
}
