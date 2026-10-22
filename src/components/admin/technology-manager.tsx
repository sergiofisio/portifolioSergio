"use client";

import { Check, Loader2, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteTechnology, saveTechnology, type TechnologyInput } from "@/app/admin/actions";
import { TechIcon } from "@/components/site/tech-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { useUpload } from "./use-upload";

type Row = TechnologyInput & { id: string; projectCount: number };

const categories = [
  { value: "FRONTEND", label: "Front-end" },
  { value: "BACKEND", label: "Back-end" },
  { value: "DATABASE", label: "Banco de dados" },
  { value: "TOOLS", label: "Ferramentas" },
] as const;

const empty: TechnologyInput = { name: "", icon: "", category: "FRONTEND", order: 0, showInSkills: true };

function TechnologyEditor({
  initial,
  onDone,
}: {
  initial: TechnologyInput;
  onDone: () => void;
}) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const { upload, uploading, error: uploadError } = useUpload("icon");

  function submit() {
    setError(null);
    startSaving(async () => {
      const result = await saveTechnology(data);
      if (!result.ok) return setError(result.error);
      router.refresh();
      onDone();
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-primary/40 bg-primary/5 p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_100px]">
        <Input placeholder="Nome (ex.: Docker)" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <Select
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value as TechnologyInput["category"] })}
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
        <Input type="number" min={0} title="Ordem" value={data.order} onChange={(e) => setData({ ...data, order: Number(e.target.value) || 0 })} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <TechIcon name={data.name || "?"} icon={data.icon || null} size={36} />
        <Input
          className="min-w-64 flex-1"
          placeholder="URL do ícone (ex.: https://skillicons.dev/icons?i=docker)"
          value={data.icon}
          onChange={(e) => setData({ ...data, icon: e.target.value })}
        />
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground">
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />} Enviar ícone
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={async (e) => {
              const [url] = await upload(e.target.files ?? []);
              if (url) setData((d) => ({ ...d, icon: url }));
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.showInSkills}
            onChange={(e) => setData({ ...data, showInSkills: e.target.checked })}
            className="h-4 w-4 accent-(--color-primary)"
          />
          Exibir em Tecnologias
        </label>
        <div className="flex items-center gap-2">
          {(error || uploadError) && <p className="text-sm text-rose-300">{error ?? uploadError}</p>}
          <Button type="button" variant="ghost" size="sm" onClick={onDone}>
            <X size={15} /> Cancelar
          </Button>
          <Button type="button" size="sm" disabled={saving || uploading} onClick={submit}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TechnologyManager({ technologies }: { technologies: Row[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function remove(row: Row) {
    const warning = row.projectCount
      ? `"${row.name}" está em ${row.projectCount} projeto(s) e será removida deles. Continuar?`
      : `Excluir "${row.name}"?`;
    if (!confirm(warning)) return;
    startTransition(async () => {
      const result = await deleteTechnology(row.id);
      if (!result.ok) alert(result.error);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {editing === "new" ? (
        <TechnologyEditor initial={empty} onDone={() => setEditing(null)} />
      ) : (
        <Button type="button" onClick={() => setEditing("new")}>
          <Plus size={16} /> Nova tecnologia
        </Button>
      )}

      {categories.map((category) => {
        const rows = technologies.filter((t) => t.category === category.value);
        if (!rows.length) return null;
        return (
          <section key={category.value} className="glass rounded-2xl p-5">
            <h2 className="mb-4 font-display font-semibold">{category.label}</h2>
            <ul className="space-y-2">
              {rows.map((row) =>
                editing === row.id ? (
                  <li key={row.id}>
                    <TechnologyEditor initial={row} onDone={() => setEditing(null)} />
                  </li>
                ) : (
                  <li key={row.id} className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-surface-2/60">
                    <TechIcon name={row.name} icon={row.icon || null} size={30} />
                    <span className="font-medium">{row.name}</span>
                    <span className="font-mono text-xs text-muted">#{row.order}</span>
                    {!row.showInSkills && <Badge>oculta na stack</Badge>}
                    <span className="ml-auto text-xs text-muted">{row.projectCount} projeto(s)</span>
                    <Button type="button" variant="ghost" size="sm" title="Editar" onClick={() => setEditing(row.id)}>
                      <Pencil size={15} />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" title="Excluir" disabled={pending} className="hover:text-danger" onClick={() => remove(row)}>
                      <Trash2 size={15} />
                    </Button>
                  </li>
                ),
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
