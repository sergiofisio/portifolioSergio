"use client";

import { Check, Loader2, Mail, MailOpen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteMessage, setMessageRead, type ActionResult } from "@/app/admin/actions";
import { WhatsappIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  reason: string;
  message: string;
  locale: string;
  read: boolean;
  createdAt: string;
};

const reasonLabels: Record<string, string> = {
  project: "Projeto / freelance",
  job: "Oportunidade de trabalho",
  other: "Outro assunto",
};

const dateFormat = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

export function MessageCard({ message }: { message: Message }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<ActionResult>) {
    startTransition(async () => {
      const result = await action();
      if (!result.ok) alert(result.error);
      router.refresh();
    });
  }

  const digits = message.phone?.replace(/\D/g, "") ?? "";
  const subject = encodeURIComponent(`Re: ${reasonLabels[message.reason] ?? "Contato"} — portfólio`);

  return (
    <article
      className={cn(
        "glass rounded-2xl p-5 transition",
        !message.read && "border-primary/50 shadow-lg shadow-primary/10",
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 font-medium">
            {!message.read && <span className="h-2 w-2 rounded-full bg-primary" aria-label="Não lida" />}
            {message.name}
            <Badge>{reasonLabels[message.reason] ?? message.reason}</Badge>
            <Badge className="uppercase">{message.locale}</Badge>
          </p>
          <p className="mt-1 truncate text-sm text-muted">
            {message.email}
            {message.phone && ` · ${message.phone}`}
          </p>
        </div>
        <time className="font-mono text-xs text-muted" dateTime={message.createdAt}>
          {dateFormat.format(new Date(message.createdAt))}
        </time>
      </header>

      <p className="mt-4 whitespace-pre-wrap leading-relaxed text-foreground/90">{message.message}</p>

      <footer className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
        <a
          href={`mailto:${message.email}?subject=${subject}`}
          onClick={() => !message.read && run(() => setMessageRead(message.id, true))}
          className={buttonVariants({ size: "sm" })}
        >
          <Mail size={15} /> Responder por e-mail
        </a>
        {digits.length >= 10 && (
          <a
            href={`https://wa.me/${digits.length <= 11 ? `55${digits}` : digits}`}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "sm", variant: "outline", className: "text-emerald-200" })}
          >
            <WhatsappIcon size={15} /> WhatsApp
          </a>
        )}
        <div className="ml-auto flex items-center gap-1">
          {pending && <Loader2 size={15} className="animate-spin text-muted" />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => run(() => setMessageRead(message.id, !message.read))}
            title={message.read ? "Marcar como não lida" : "Marcar como lida"}
          >
            {message.read ? <MailOpen size={15} /> : <Check size={15} />}
            {message.read ? "Não lida" : "Lida"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-danger"
            title="Excluir"
            onClick={() => confirm("Excluir esta mensagem?") && run(() => deleteMessage(message.id))}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </footer>
    </article>
  );
}
