"use client";

import { motion } from "framer-motion";
import { ArrowDown, Briefcase, Download, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const stack = ["React", "Next.js", "Angular", "Node.js", "Go", "PostgreSQL"];

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden pt-16">
      <div className="bg-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -left-40 top-10 -z-10 h-112 w-md rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t("available")}
          </motion.div>

          <motion.p {...fadeUp(0.05)} className="text-lg text-muted">
            {t("greeting")}
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Sergio <span className="text-gradient">Bastos</span>
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="mt-3 font-display text-2xl font-medium text-foreground/80 md:text-3xl">
            {t("role")}
          </motion.p>
          <motion.p {...fadeUp(0.18)} className="mt-3 flex items-center gap-2 text-sm text-accent">
            <Briefcase size={15} /> {t("current")}
          </motion.p>
          <motion.p {...fadeUp(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {t("tagline")}
          </motion.p>

          <motion.div {...fadeUp(0.25)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={{ pathname: "/", hash: "projects" }} className={buttonVariants({ size: "lg" })}>
              {t("ctaProjects")}
            </Link>
            <a href={siteConfig.cv[locale]} download className={buttonVariants({ size: "lg", variant: "outline" })}>
              <Download size={18} />
              {t("ctaCv")}
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="mt-9 flex items-center gap-5 text-muted">
            <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-foreground">
              <GithubIcon size={22} />
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-foreground">
              <LinkedinIcon size={22} />
            </a>
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="transition hover:text-foreground">
              <WhatsappIcon size={22} />
            </a>
            <span className="h-5 w-px bg-border" />
            <span className="flex items-center gap-1.5 text-sm">
              <MapPin size={15} /> {siteConfig.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-px rounded-3xl bg-linear-to-br from-primary/60 via-transparent to-accent/60 opacity-70 blur-sm" />
          <div className="glass relative overflow-hidden rounded-3xl font-mono text-sm shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs text-muted">sergio.ts</span>
            </div>
            <pre className="overflow-x-auto p-6 leading-7">
              <code>
                <span className="text-primary">const</span> <span className="text-accent">developer</span> = {"{"}
                {"\n"}  name: <span className="text-emerald-300">&quot;Sergio Bastos&quot;</span>,
                {"\n"}  role: <span className="text-emerald-300">&quot;Full Stack Developer&quot;</span>,
                {"\n"}  company: <span className="text-emerald-300">&quot;Mobilemed&quot;</span>,
                {"\n"}  languages: [<span className="text-emerald-300">&quot;pt&quot;</span>, <span className="text-emerald-300">&quot;en C1&quot;</span>, <span className="text-emerald-300">&quot;fr B2&quot;</span>],
                {"\n"}  stack: [
                {stack.map((s, i) => (
                  <span key={s}>
                    {"\n"}    <span className="text-emerald-300">&quot;{s}&quot;</span>
                    {i < stack.length - 1 ? "," : ""}
                  </span>
                ))}
                {"\n"}  ],
                {"\n"}  openToWork: <span className="text-primary">true</span>,
                {"\n"}{"}"};
              </code>
            </pre>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted md:flex"
      >
        {t("scroll")}
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
