"use client";

import { ExternalLink, Eye, EyeOff, Loader2, Pencil, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteProject, toggleProjectFlag, type ActionResult } from "@/app/admin/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectRowActions({
  id,
  slug,
  published,
  featured,
}: {
  id: string;
  slug: string;
  published: boolean;
  featured: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<ActionResult>) {
    startTransition(async () => {
      const result = await action();
      if (!result.ok) alert(result.error);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      {pending && <Loader2 size={16} className="mr-1 animate-spin text-muted" />}
      <Button
        variant="ghost"
        size="sm"
        title={published ? "Despublicar" : "Publicar"}
        onClick={() => run(() => toggleProjectFlag(id, "published"))}
      >
        {published ? <Eye size={16} /> : <EyeOff size={16} />}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        title={featured ? "Remover destaque" : "Destacar"}
        onClick={() => run(() => toggleProjectFlag(id, "featured"))}
      >
        <Star size={16} className={cn(featured && "fill-amber-400 text-amber-400")} />
      </Button>
      {published && (
        <a href={`/pt/projetos/${slug}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "sm" })} title="Ver no site">
          <ExternalLink size={16} />
        </a>
      )}
      <Link href={`/admin/projetos/${id}`} className={buttonVariants({ variant: "ghost", size: "sm" })} title="Editar">
        <Pencil size={16} />
      </Link>
      <Button
        variant="ghost"
        size="sm"
        title="Excluir"
        className="hover:text-danger"
        onClick={() => {
          if (confirm("Excluir este projeto e suas imagens enviadas? Essa ação não pode ser desfeita.")) {
            run(() => deleteProject(id));
          }
        }}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
