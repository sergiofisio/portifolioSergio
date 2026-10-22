import { Plus } from "lucide-react";
import Link from "next/link";
import { ProjectRowActions } from "@/components/admin/project-row-actions";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Projetos" };

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({
    include: { translations: { where: { locale: "pt" } }, _count: { select: { technologies: true } } },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Projetos</h1>
          <p className="mt-1 text-sm text-muted">
            {projects.length} projeto(s). Alterações aparecem no site imediatamente.
          </p>
        </div>
        <Link href="/admin/projetos/novo" className={buttonVariants()}>
          <Plus size={16} /> Novo projeto
        </Link>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        {projects.length === 0 && <p className="p-8 text-center text-muted">Nenhum projeto cadastrado ainda.</p>}
        <ul className="divide-y divide-border/70">
          {projects.map((project) => (
            <li key={project.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                {project.coverImage && (
                  <img src={project.coverImage} alt="" className="h-full w-full object-cover object-top" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/projetos/${project.id}`} className="font-medium hover:text-accent">
                  {project.translations[0]?.title ?? project.slug}
                </Link>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  /{project.slug} · ordem {project.order} · {project._count.technologies} tecnologias
                </p>
                <div className="mt-1.5 flex gap-1.5">
                  {!project.published && <Badge className="border-amber-400/40 text-amber-200">Rascunho</Badge>}
                  {project.featured && <Badge className="border-primary/50 text-primary">Destaque</Badge>}
                </div>
              </div>
              <ProjectRowActions
                id={project.id}
                slug={project.slug}
                published={project.published}
                featured={project.featured}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
