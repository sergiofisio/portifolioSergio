import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getAdminSession } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Entrar" };

const errors: Record<string, string> = {
  AccessDenied: "Essa conta do GitHub não tem permissão para acessar o painel.",
  Configuration: "O login com GitHub não está configurado no servidor (verifique AUTH_GITHUB_ID/SECRET e AUTH_SECRET).",
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await getAdminSession()) redirect("/admin");
  const { error } = await searchParams;
  const configured = Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET);
  const message = !configured
    ? "Login com GitHub não configurado: preencha AUTH_GITHUB_ID e AUTH_GITHUB_SECRET no .env e reinicie o servidor."
    : typeof error === "string"
      ? (errors[error] ?? "Não foi possível entrar. Tente novamente.")
      : null;

  async function login() {
    "use server";
    await signIn("github", { redirectTo: "/admin" });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="glass w-full max-w-sm rounded-3xl p-8 text-center">
        <p className="font-display text-2xl font-bold">
          <span className="text-gradient">&lt;Sergio</span>Bastos /&gt;
        </p>
        <h1 className="mt-6 text-lg font-semibold">Painel administrativo</h1>
        <p className="mt-2 text-sm text-muted">Entre com sua conta do GitHub para gerenciar projetos e tecnologias.</p>
        {message && (
          <p className="mt-5 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-rose-200">{message}</p>
        )}
        <form action={login} className="mt-7">
          <Button type="submit" size="lg" className="w-full" disabled={!configured}>
            <GithubIcon size={18} /> Entrar com GitHub
          </Button>
        </form>
      </div>
    </main>
  );
}
