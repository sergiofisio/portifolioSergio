"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/icons";
import { useWhatsappHref } from "./contact-channels";
import { useContactDialog } from "./contact-dialog";

export function ContactFab() {
  const t = useTranslations("contact");
  const { open, isOpen } = useContactDialog();
  const whatsappHref = useWhatsappHref();
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById("contact");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const visible = !isOpen && !contactInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={t("fabWhatsapp")}
            title={t("fabWhatsapp")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400"
          >
            <WhatsappIcon size={24} />
          </a>
          <button
            type="button"
            onClick={open}
            className="group relative flex h-12 items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent px-5 font-medium text-white shadow-xl shadow-primary/30 transition hover:brightness-110"
          >
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40 [animation-duration:2.5s]" />
            <MessageSquareText size={20} />
            <span className="hidden sm:inline">{t("fab")}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
