import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Novo projeto" };

export default async function NewProjectPage() {
  await requireAdmin();
  const [technologies, last] = await Promise.all([
    prisma.technology.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }] }),
    prisma.project.aggregate({ _max: { order: true } }),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 font-display text-3xl font-bold">Novo projeto</h1>
      <ProjectForm
        technologies={technologies}
        initial={{
          slug: "",
          githubUrl: "",
          siteUrl: "",
          coverImage: "",
          images: [],
          featured: false,
          published: true,
          order: (last._max.order ?? 0) + 1,
          technologyIds: [],
          translations: { pt: { title: "", summary: "", content: "" } },
        }}
      />
    </div>
  );
}
