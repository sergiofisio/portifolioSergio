import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Editar projeto" };

export default async function EditProjectPage({ params }: PageProps<"/admin/projetos/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const [project, technologies] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: { translations: true, technologies: { select: { id: true } } },
    }),
    prisma.technology.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }] }),
  ]);
  if (!project) notFound();

  const title = project.translations.find((t) => t.locale === "pt")?.title ?? project.slug;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm text-muted">Editando</p>
      <h1 className="mb-8 font-display text-3xl font-bold">{title}</h1>
      <ProjectForm
        technologies={technologies}
        initial={{
          id: project.id,
          slug: project.slug,
          githubUrl: project.githubUrl ?? "",
          siteUrl: project.siteUrl ?? "",
          coverImage: project.coverImage ?? "",
          images: project.images,
          featured: project.featured,
          published: project.published,
          order: project.order,
          technologyIds: project.technologies.map((t) => t.id),
          translations: Object.fromEntries(
            project.translations.map(({ locale, title, summary, content }) => [locale, { title, summary, content }]),
          ),
        }}
      />
    </div>
  );
}
