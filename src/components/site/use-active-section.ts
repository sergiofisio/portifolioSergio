"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";

export function useActiveSection<T extends string>(ids: readonly T[]) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<T | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const visible = new Set<T>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as T;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        const current = ids.filter((id) => visible.has(id)).at(-1);
        if (current) setActive(current);
        else if (window.scrollY < window.innerHeight * 0.5) setActive(null);
      },
      // a thin band around the middle of the viewport decides which section is "current"
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids, isHome]);

  if (!isHome) return (pathname.startsWith("/projetos") ? "projects" : null) as T | null;
  return active;
}
