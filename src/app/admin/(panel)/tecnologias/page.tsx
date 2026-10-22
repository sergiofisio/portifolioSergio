import { TechnologyManager } from "@/components/admin/technology-manager";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Tecnologias" };

export default async function TechnologiesPage() {
  await requireAdmin();
  const technologies = await prisma.technology.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
  });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-3xl font-bold">Tecnologias</h1>
      <p className="mb-8 mt-1 text-sm text-muted">
        As marcadas como &quot;Exibir em Tecnologias&quot; aparecem na seção de stack do site. Todas podem ser associadas a projetos.
      </p>
      <TechnologyManager
        technologies={technologies.map((t) => ({
          id: t.id,
          name: t.name,
          icon: t.icon ?? "",
          category: t.category,
          order: t.order,
          showInSkills: t.showInSkills,
          projectCount: t._count.projects,
        }))}
      />
    </div>
  );
}
