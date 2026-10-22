import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Sergio Bastos",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-screen flex-col items-center justify-center px-5 text-center font-sans">
        <p className="font-display text-8xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Página não encontrada</h1>
        <Link
          href="/pt"
          className="mt-8 rounded-full bg-linear-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-white"
        >
          Voltar para o início
        </Link>
      </body>
    </html>
  );
}
