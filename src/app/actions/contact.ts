"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";
import { routing } from "@/i18n/routing";
import { contactReasons, isContactEmailEnabled } from "@/lib/contact";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";

export type ContactState = { status: "idle" | "success" | "error" | "invalid" | "rateLimited" };

const MIN_FILL_MS = 2500;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  phone: z.string().trim().max(40),
  reason: z.enum(contactReasons),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(routing.locales),
});

const reasonLabels: Record<(typeof contactReasons)[number], string> = {
  project: "Projeto / freelance",
  job: "Oportunidade de trabalho",
  other: "Outro assunto",
};

async function notifyByEmail(data: z.infer<typeof schema>) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"Portfólio" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
    subject: `[Portfólio] ${reasonLabels[data.reason]} — ${data.name}`,
    text: [
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      ...(data.phone ? [`WhatsApp: ${data.phone}`] : []),
      `Assunto: ${reasonLabels[data.reason]}`,
      `Idioma: ${data.locale}`,
      "",
      data.message,
    ].join("\n"),
  });
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (formData.get("company")) return { status: "success" };
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) return { status: "success" };

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    reason: formData.get("reason"),
    message: formData.get("message"),
    locale: formData.get("locale"),
  });
  if (!parsed.success) return { status: "invalid" };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (isRateLimited(`contact:${ip}`)) return { status: "rateLimited" };

  const data = parsed.data;
  try {
    await prisma.contactMessage.create({
      data: { ...data, phone: data.phone || null },
    });
  } catch (error) {
    console.error("Falha ao salvar contato", error);
    return { status: "error" };
  }

  if (isContactEmailEnabled()) {
    await notifyByEmail(data).catch((error) => console.error("Falha ao enviar e-mail de contato", error));
  }

  revalidatePath("/admin", "layout");
  return { status: "success" };
}
