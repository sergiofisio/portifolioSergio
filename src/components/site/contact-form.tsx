"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useId, useRef } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { contactReasons } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function ContactForm({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContactMessage, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [state]);

  const field = (name: string) => `${id}-${name}`;

  return (
    <form ref={formRef} action={action} className={cn("space-y-4", className)}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input ref={startedAtRef} type="hidden" name="startedAt" />
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={field("name")}>{t("name")}</Label>
          <Input id={field("name")} name="name" required minLength={2} maxLength={120} autoComplete="name" autoFocus={autoFocus} />
        </div>
        <div>
          <Label htmlFor={field("email")}>{t("email")}</Label>
          <Input id={field("email")} name="email" type="email" required maxLength={200} autoComplete="email" />
        </div>
        <div>
          <Label htmlFor={field("phone")}>{t("phone")}</Label>
          <Input id={field("phone")} name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+55 (11) 90000-0000" />
        </div>
        <div>
          <Label htmlFor={field("reason")}>{t("reason")}</Label>
          <Select id={field("reason")} name="reason" defaultValue="project">
            {contactReasons.map((reason) => (
              <option key={reason} value={reason}>
                {t(`reasons.${reason}`)}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor={field("message")}>{t("message")}</Label>
        <Textarea
          id={field("message")}
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {pending ? t("sending") : t("send")}
        </Button>
        {state.status !== "idle" && !pending && (
          <p
            role="status"
            className={cn(
              "flex items-center gap-2 text-sm",
              state.status === "success" ? "text-emerald-300" : "text-rose-300",
            )}
          >
            {state.status === "success" && <CheckCircle2 size={16} />}
            {t(state.status)}
          </p>
        )}
      </div>
    </form>
  );
}
