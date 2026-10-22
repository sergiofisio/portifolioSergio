"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { PublicProject } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

export function ProjectsGrid({ projects }: { projects: PublicProject[] }) {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<string | null>(null);

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.technologies) {
        counts.set(tech.name, (counts.get(tech.name) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .filter(([, count]) => count > 1 || counts.size <= 8)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([name]) => name);
  }, [projects]);

  const visible = filter
    ? projects.filter((p) => p.technologies.some((tech) => tech.name === filter))
    : projects;

  if (!projects.length) {
    return <p className="text-muted">{t("empty")}</p>;
  }

  return (
    <>
      {filters.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {[null, ...filters].map((name) => (
            <button
              key={name ?? "all"}
              type="button"
              onClick={() => setFilter(name)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                filter === name
                  ? "border-transparent bg-linear-to-r from-primary to-accent text-white"
                  : "border-border bg-surface/60 text-muted hover:border-primary/50 hover:text-foreground",
              )}
            >
              {name ?? t("all")}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
