import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 pb-24 pt-8 text-sm text-muted md:flex-row md:pb-8 md:pr-72">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
        </p>
        <p className="hidden lg:block">{t("built")}</p>
        <div className="flex items-center gap-3">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground">
            <GithubIcon size={18} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
            <LinkedinIcon size={18} />
          </a>
          <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-foreground">
            <WhatsappIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
