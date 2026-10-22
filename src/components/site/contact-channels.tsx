"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function useWhatsappHref() {
  const t = useTranslations("contact");
  return whatsappLink(siteConfig.whatsapp, t("whatsappMessage"));
}

export function ContactChannels({ compact, className }: { compact?: boolean; className?: string }) {
  const t = useTranslations("contact");
  const whatsappHref = useWhatsappHref();

  const channels = [
    { label: t("whatsapp"), value: siteConfig.phoneDisplay, href: whatsappHref, icon: WhatsappIcon, highlight: true },
    { label: t("email"), value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
    { label: "LinkedIn", value: "in/sergio-bastos-jr", href: siteConfig.linkedin, icon: LinkedinIcon },
    ...(compact ? [] : [{ label: "GitHub", value: "@sergiofisio", href: siteConfig.github, icon: GithubIcon }]),
  ];

  return (
    <ul className={cn("grid content-start gap-3", className)}>
      {channels.map(({ label, value, href, icon: Icon, highlight }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className={cn(
              "group flex items-center gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5",
              highlight
                ? "border-emerald-400/40 bg-emerald-500/10 hover:border-emerald-400/70"
                : "border-border bg-surface-2/60 hover:border-primary/50",
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                highlight ? "bg-emerald-500 text-white" : "bg-linear-to-br from-primary/25 to-accent/25 text-accent",
              )}
            >
              <Icon size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-sm text-muted">
                {label}
                {highlight && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-300">
                    {t("fastest")}
                  </span>
                )}
              </span>
              <span className="block truncate font-medium group-hover:text-accent">{value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
