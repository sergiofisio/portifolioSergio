"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { navSections } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ContactCtaButton } from "./contact-cta";
import { LanguageSwitcher } from "./language-switcher";
import { useActiveSection } from "./use-active-section";

const desktopSections = navSections.filter((id) => id !== "contact");

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navSections);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "glass border-x-0 border-t-0" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">&lt;Sergio</span>
          <span className="text-foreground">Bastos /&gt;</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {desktopSections.map((id) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={{ pathname: "/", hash: id }}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-primary/40 bg-primary/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(id)}
              </Link>
            );
          })}
          <ContactCtaButton size="sm" className="ml-2" />
          <LanguageSwitcher className="ml-1" />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ContactCtaButton size="sm" className="hidden sm:inline-flex" />
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-foreground hover:bg-surface-2"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={cn(
          "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-primary to-accent transition-opacity",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5">
              {navSections.map((id) => {
                const isActive = active === id;
                return (
                  <Link
                    key={id}
                    href={{ pathname: "/", hash: id }}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-colors",
                      isActive
                        ? "bg-primary/15 text-foreground"
                        : "text-muted hover:bg-surface-2 hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors",
                        isActive ? "bg-accent" : "bg-transparent",
                      )}
                    />
                    {t(id)}
                  </Link>
                );
              })}
              <ContactCtaButton size="lg" className="mt-3 w-full" onOpen={() => setOpen(false)} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
