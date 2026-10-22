"use client";

import { MessageSquareText } from "lucide-react";
import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWhatsappHref } from "./contact-channels";
import { useContactDialog } from "./contact-dialog";

export function ContactCtaButton({
  className,
  size = "md",
  onOpen,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  onOpen?: () => void;
}) {
  const t = useTranslations("contact");
  const { open } = useContactDialog();
  return (
    <Button
      type="button"
      size={size}
      onClick={() => {
        onOpen?.();
        open();
      }}
      className={className}
    >
      <MessageSquareText size={size === "sm" ? 15 : 18} />
      {t("cta")}
    </Button>
  );
}

export function ContactBanner({ className }: { className?: string }) {
  const t = useTranslations("contact");
  const whatsappHref = useWhatsappHref();

  return (
    <div className={cn("rounded-3xl bg-linear-to-br from-primary via-primary/60 to-accent p-px", className)}>
      <div className="flex flex-col gap-6 rounded-[calc(1.5rem-1px)] bg-surface/95 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="font-display text-2xl font-bold">{t("banner.title")}</h2>
          <p className="mt-2 text-muted">{t("banner.subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ContactCtaButton size="lg" />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "border-emerald-400/50 text-emerald-200 hover:border-emerald-400",
            })}
          >
            <WhatsappIcon size={18} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
