import { ExternalLink, FolderKanban, Inbox, Layers, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Projetos", icon: FolderKanban },
  { href: "/admin/tecnologias", label: "Tecnologias", icon: Layers },
  { href: "/admin/mensagens", label: "Mensagens", icon: Inbox },
];

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdmin();
  const unread = await prisma.contactMessage.count({ where: { read: false } });

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="glass flex flex-col gap-6 border-y-0 border-l-0 p-5 md:sticky md:top-0 md:h-screen">
        <Link href="/admin" className="font-display text-lg font-bold">
          <span className="text-gradient">&lt;Sergio</span>Admin /&gt;
        </Link>
        <nav className="flex gap-1 md:flex-col">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-foreground"
            >
              <Icon size={16} /> {label}
              {href === "/admin/mensagens" && unread > 0 && (
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">{unread}</span>
              )}
            </Link>
          ))}
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-foreground"
          >
            <ExternalLink size={16} /> Ver site
          </a>
        </nav>
        <div className="mt-auto flex items-center gap-3">
          {session.user.image && (
            <img src={session.user.image} alt="" width={32} height={32} className="rounded-full" />
          )}
          <div className="min-w-0 flex-1 text-sm">
            <p className="truncate font-medium">{session.user.name ?? session.user.login}</p>
            <p className="truncate text-xs text-muted">@{session.user.login}</p>
          </div>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm" aria-label="Sair">
              <LogOut size={16} />
            </Button>
          </form>
        </div>
      </aside>
      <main className="px-5 py-8 md:px-10">{children}</main>
    </div>
  );
}
