"use client";

import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Save, Star, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { saveProject, type ProjectInput } from "@/app/admin/actions";
import { TechIcon } from "@/components/site/tech-icon";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form";
import { routing, type Locale } from "@/i18n/routing";
import { cn, slugify } from "@/lib/utils";
import { useUpload } from "./use-upload";

type Tech = { id: string; name: string; icon: string | null; category: string };

const localeLabels: Record<Locale, string> = { pt: "Português", en: "English", fr: "Français" };
const categoryLabels: Record<string, string> = {
  FRONTEND: "Front-end",
  BACKEND: "Back-end",
  DATABASE: "Banco de dados",
  TOOLS: "Ferramentas",
};

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <span
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          checked ? "bg-linear-to-r from-primary to-accent" : "bg-surface-2 border border-border",
        )}
      >
        <span className={cn("inline-block h-4 w-4 rounded-full bg-white transition", checked ? "translate-x-6" : "translate-x-1")} />
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

export function ProjectForm({ initial, technologies }: { initial: ProjectInput; technologies: Tech[] }) {
  const router = useRouter();
  const [data, setData] = useState<ProjectInput>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [tab, setTab] = useState<Locale>("pt");
  const [preview, setPreview] = useState(false);
  const [techQuery, setTechQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const gallery = useUpload("project");
  const cover = useUpload("project");

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const translation = data.translations[tab] ?? { title: "", summary: "", content: "" };

  function setTranslation(field: "title" | "summary" | "content", value: string) {
    setData((d) => {
      const current = d.translations[tab] ?? { title: "", summary: "", content: "" };
      const next = { ...d, translations: { ...d.translations, [tab]: { ...current, [field]: value } } };
      if (tab === "pt" && field === "title" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }

  const groupedTechs = useMemo(() => {
    const q = techQuery.trim().toLowerCase();
    const groups = new Map<string, Tech[]>();
    for (const tech of technologies) {
      if (q && !tech.name.toLowerCase().includes(q)) continue;
      groups.set(tech.category, [...(groups.get(tech.category) ?? []), tech]);
    }
    return [...groups.entries()];
  }, [technologies, techQuery]);

  function toggleTech(id: string) {
    set(
      "technologyIds",
      data.technologyIds.includes(id) ? data.technologyIds.filter((t) => t !== id) : [...data.technologyIds, id],
    );
  }

  function moveImage(index: number, delta: number) {
    const images = [...data.images];
    const target = index + delta;
    if (target < 0 || target >= images.length) return;
    [images[index], images[target]] = [images[target], images[index]];
    set("images", images);
  }

  function submit() {
    setError(null);
    startSaving(async () => {
      const result = await saveProject(data);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <form
      className="space-y-6 pb-28"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Card title="Conteúdo" description="Português é obrigatório. Idiomas sem título ficam com o texto em português no site.">
        <div className="mb-5 flex flex-wrap gap-2">
          {routing.locales.map((locale) => {
            const filled = Boolean(data.translations[locale]?.title);
            return (
              <button
                key={locale}
                type="button"
                onClick={() => setTab(locale)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition",
                  tab === locale ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted hover:text-foreground",
                )}
              >
                <span className={cn("h-2 w-2 rounded-full", filled ? "bg-emerald-400" : "bg-border")} />
                {localeLabels[locale]}
              </button>
            );
          })}
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={translation.title} maxLength={120} onChange={(e) => setTranslation("title", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="summary">Resumo (aparece no card)</Label>
            <Textarea id="summary" rows={3} maxLength={400} value={translation.summary} onChange={(e) => setTranslation("summary", e.target.value)} />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <Label htmlFor="content" className="mb-0">
                Descrição completa (Markdown)
              </Label>
              <button type="button" onClick={() => setPreview((v) => !v)} className="text-xs text-accent hover:underline">
                {preview ? "Editar" : "Pré-visualizar"}
              </button>
            </div>
            {preview ? (
              <div className="prose-content min-h-64 rounded-xl border border-border bg-surface p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{translation.content || "_Sem conteúdo_"}</ReactMarkdown>
              </div>
            ) : (
              <Textarea
                id="content"
                rows={14}
                className="font-mono"
                placeholder={"Texto de introdução...\n\n## Principais funcionalidades\n\n- Item 1\n- Item 2"}
                value={translation.content}
                onChange={(e) => setTranslation("content", e.target.value)}
              />
            )}
          </div>
        </div>
      </Card>

      <Card title="Informações">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={data.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
            />
            <p className="mt-1 font-mono text-xs text-muted">/pt/projetos/{data.slug || "..."}</p>
          </div>
          <div>
            <Label htmlFor="order">Ordem (menor aparece primeiro)</Label>
            <Input id="order" type="number" min={0} value={data.order} onChange={(e) => set("order", Number(e.target.value) || 0)} />
          </div>
          <div>
            <Label htmlFor="siteUrl">URL do site</Label>
            <Input id="siteUrl" type="url" placeholder="https://" value={data.siteUrl} onChange={(e) => set("siteUrl", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="githubUrl">URL do GitHub</Label>
            <Input id="githubUrl" type="url" placeholder="https://github.com/..." value={data.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-8">
          <Toggle checked={data.published} onChange={(v) => set("published", v)} label="Publicado" />
          <Toggle checked={data.featured} onChange={(v) => set("featured", v)} label="Destaque" />
        </div>
      </Card>

      <Card title="Imagens" description="As imagens são convertidas para WebP automaticamente (máx. 10 MB cada).">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div>
            <Label>Capa</Label>
            <label className="glass relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border-dashed">
              {data.coverImage ? (
                <img src={data.coverImage} alt="" className="h-full w-full object-cover object-top" />
              ) : (
                <span className="flex flex-col items-center gap-2 text-sm text-muted">
                  {cover.uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
                  Enviar capa
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={async (e) => {
                  const [url] = await cover.upload(e.target.files ?? []);
                  if (url) set("coverImage", url);
                  e.target.value = "";
                }}
              />
            </label>
            {data.coverImage && (
              <button type="button" className="mt-2 text-xs text-muted hover:text-danger" onClick={() => set("coverImage", "")}>
                Remover capa
              </button>
            )}
            {cover.error && <p className="mt-2 text-xs text-rose-300">{cover.error}</p>}
          </div>

          <div>
            <Label>Galeria</Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.images.map((src, index) => (
                <div key={src} className="group relative aspect-16/10 overflow-hidden rounded-xl border border-border">
                  <img src={src} alt="" className="h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 flex items-end justify-between gap-1 bg-linear-to-t from-black/80 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="flex gap-1">
                      <button type="button" title="Mover para esquerda" onClick={() => moveImage(index, -1)} className="rounded-md bg-black/60 p-1">
                        <ArrowLeft size={14} />
                      </button>
                      <button type="button" title="Mover para direita" onClick={() => moveImage(index, 1)} className="rounded-md bg-black/60 p-1">
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <div className="flex gap-1">
                      <button type="button" title="Usar como capa" onClick={() => set("coverImage", src)} className="rounded-md bg-black/60 p-1">
                        <Star size={14} className={cn(data.coverImage === src && "fill-amber-400 text-amber-400")} />
                      </button>
                      <button
                        type="button"
                        title="Remover"
                        onClick={() => set("images", data.images.filter((i) => i !== src))}
                        className="rounded-md bg-black/60 p-1 hover:text-danger"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <label className="flex aspect-16/10 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-sm text-muted hover:border-primary/60 hover:text-foreground">
                {gallery.uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
                Adicionar
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={async (e) => {
                    const urls = await gallery.upload(e.target.files ?? []);
                    if (urls.length) {
                      setData((d) => ({
                        ...d,
                        images: [...d.images, ...urls],
                        coverImage: d.coverImage || urls[0],
                      }));
                    }
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            {gallery.error && <p className="mt-2 text-xs text-rose-300">{gallery.error}</p>}
          </div>
        </div>
      </Card>

      <Card title="Tecnologias" description={`${data.technologyIds.length} selecionada(s). Cadastre novas em Tecnologias.`}>
        <Input placeholder="Buscar tecnologia..." value={techQuery} onChange={(e) => setTechQuery(e.target.value)} className="mb-5 max-w-xs" />
        <div className="space-y-5">
          {groupedTechs.map(([category, items]) => (
            <div key={category}>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">{categoryLabels[category] ?? category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => {
                  const active = data.technologyIds.includes(tech.id);
                  return (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => toggleTech(tech.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border py-1.5 pl-1.5 pr-3 text-sm transition",
                        active ? "border-primary bg-primary/15" : "border-border bg-surface hover:border-primary/40",
                      )}
                    >
                      <TechIcon name={tech.name} icon={tech.icon} size={22} />
                      {tech.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="glass fixed inset-x-0 bottom-0 z-40 border-x-0 border-b-0 md:left-60">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 md:px-10">
          <p className="min-w-0 truncate text-sm text-rose-300">{error}</p>
          <div className="flex shrink-0 gap-2">
            <Link href="/admin" className="rounded-full px-5 py-2.5 text-sm text-muted hover:text-foreground">
              Cancelar
            </Link>
            <Button type="submit" disabled={saving || cover.uploading || gallery.uploading}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Salvar projeto
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
