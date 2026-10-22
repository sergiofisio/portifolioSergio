import { ArrowUpRight, BookOpen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { LinkedinIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { posts, reactSeries } from "@/config/content";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

export function Content() {
  const t = useTranslations("content");
  const locale = useLocale() as Locale;
  const dateFormat = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" });

  return (
    <Section id="content">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      {t("language") && <p className="-mt-10 mb-10 text-sm text-muted">{t("language")}</p>}

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-primary/30 to-accent/30 text-accent">
                <BookOpen size={20} />
              </span>
              <h3 className="font-display text-xl font-semibold">{t("seriesTitle")}</h3>
            </div>
            <p className="mt-4 text-muted">{t("seriesDescription")}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {reactSeries.map((episode) => (
                <li key={episode.number}>
                  <a
                    href={episode.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border bg-surface-2/60 px-3 py-2.5 text-sm transition hover:border-primary/50"
                  >
                    <span className="font-mono text-xs text-accent">
                      {t("episode")} {String(episode.number).padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate">{episode.title[locale]}</span>
                    <ArrowUpRight size={14} className="text-muted transition group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {posts.map((post, index) => (
            <Reveal key={post.url} delay={index * 0.06}>
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="glass group flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-primary/50"
              >
                <span className="font-mono text-xs uppercase text-muted">
                  {dateFormat.format(new Date(`${post.date}T12:00:00`))}
                </span>
                <span className="mt-2 font-medium leading-snug group-hover:text-accent">{post.title[locale]}</span>
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-8">
        <a href={siteConfig.linkedinActivity} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline" })}>
          <LinkedinIcon size={16} /> {t("more")}
        </a>
      </Reveal>
    </Section>
  );
}
