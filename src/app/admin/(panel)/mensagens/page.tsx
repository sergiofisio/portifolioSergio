import { Inbox } from "lucide-react";
import { MessageCard } from "@/components/admin/message-card";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Mensagens" };

export default async function MessagesPage() {
  await requireAdmin();
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ read: "asc" }, { createdAt: "desc" }],
    take: 200,
  });
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-bold">Mensagens</h1>
      <p className="mb-8 mt-1 text-sm text-muted">
        {messages.length} mensagem(ns) recebida(s) pelo formulário de contato · {unread} não lida(s).
      </p>

      {messages.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-2xl p-12 text-center text-muted">
          <Inbox size={32} />
          Nenhuma mensagem ainda. Elas aparecem aqui assim que alguém usar o formulário do site.
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message.id}>
              <MessageCard
                message={{
                  ...message,
                  createdAt: message.createdAt.toISOString(),
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
