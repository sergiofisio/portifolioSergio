"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ContactChannels } from "./contact-channels";
import { ContactForm } from "./contact-form";

type ContactDialogContextValue = { open: () => void; close: () => void; isOpen: boolean };

const ContactDialogContext = createContext<ContactDialogContextValue | null>(null);

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) throw new Error("useContactDialog must be used inside ContactDialogProvider");
  return context;
}

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <ContactDialog onClose={close} />}</AnimatePresence>
    </ContactDialogContext.Provider>
  );
}

function ContactDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("contact");
  // Only mounted after a click, so reading matchMedia here cannot cause a hydration mismatch
  const autoFocus = window.matchMedia("(min-width: 768px)").matches;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-3xl border border-border bg-surface p-6 shadow-2xl md:max-w-4xl md:rounded-3xl md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-surface-2 hover:text-foreground"
        >
          <X size={20} />
        </button>

        <h2 id="contact-dialog-title" className="pr-10 font-display text-2xl font-bold md:text-3xl">
          {t("dialogTitle")}
        </h2>
        <p className="mt-2 text-muted">{t("dialogSubtitle")}</p>

        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <ContactChannels compact />
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted md:hidden">{t("orForm")}</p>
            <ContactForm autoFocus={autoFocus} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
