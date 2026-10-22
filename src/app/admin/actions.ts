"use server";

import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signOut } from "@/auth";
import { routing } from "@/i18n/routing";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { deleteUpload } from "@/lib/uploads";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const optionalUrl = z.union([z.literal(""), z.url({ protocol: /^https?$/ })]);
const imageUrl = z.string().refine((v) => v.startsWith("/") || /^https:\/\//.test(v), "URL de imagem inválida");

const translationSchema = z.object({
  title: z.string().trim().max(120),
  summary: z.string().trim().max(400),
  content: z.string().max(20000),
});

const projectSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens"),
  githubUrl: optionalUrl,
  siteUrl: optionalUrl,
  coverImage: z.union([z.literal(""), imageUrl]),
  images: z.array(imageUrl).max(30),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number().int().min(0).max(9999),
  technologyIds: z.array(z.string()).max(50),
  translations: z.partialRecord(z.enum(routing.locales), translationSchema),
});

export type ProjectInput = z.infer<typeof projectSchema>;

const technologySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1).max(60),
  icon: z.union([z.literal(""), imageUrl]),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "TOOLS"]),
  order: z.number().int().min(0).max(9999),
  showInSkills: z.boolean(),
});

export type TechnologyInput = z.infer<typeof technologySchema>;

function revalidateSite() {
  revalidatePath("/", "layout");
}

function friendlyError(error: unknown, fallback: string): ActionResult {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return { ok: false, error: "Já existe um registro com esse valor (slug ou nome)." };
  }
  console.error(error);
  return { ok: false, error: fallback };
}

export async function saveProject(input: ProjectInput): Promise<ActionResult> {
  await requireAdmin();

  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: `${issue.path.join(".")}: ${issue.message}` };
  }
  const { id, technologyIds, translations, ...data } = parsed.data;

  const filled = Object.entries(translations).filter(
    (entry): entry is [string, z.infer<typeof translationSchema>] =>
      Boolean(entry[1]?.title && entry[1]?.summary),
  );
  if (!filled.some(([locale]) => locale === routing.defaultLocale)) {
    return { ok: false, error: "Preencha ao menos título e resumo em português." };
  }

  const fields = {
    ...data,
    githubUrl: data.githubUrl || null,
    siteUrl: data.siteUrl || null,
    coverImage: data.coverImage || null,
  };

  try {
    const previous = id
      ? await prisma.project.findUnique({ where: { id }, select: { coverImage: true, images: true } })
      : null;

    const project = await prisma.$transaction(async (tx) => {
      const saved = id
        ? await tx.project.update({
            where: { id },
            data: { ...fields, technologies: { set: technologyIds.map((tid) => ({ id: tid })) } },
          })
        : await tx.project.create({
            data: { ...fields, technologies: { connect: technologyIds.map((tid) => ({ id: tid })) } },
          });

      await tx.projectTranslation.deleteMany({
        where: { projectId: saved.id, locale: { notIn: filled.map(([locale]) => locale) } },
      });
      for (const [locale, t] of filled) {
        await tx.projectTranslation.upsert({
          where: { projectId_locale: { projectId: saved.id, locale } },
          update: t,
          create: { ...t, locale, projectId: saved.id },
        });
      }
      return saved;
    });

    if (previous) {
      const kept = new Set([fields.coverImage, ...fields.images]);
      const removed = [previous.coverImage, ...previous.images].filter((url) => url && !kept.has(url));
      await Promise.all(removed.map((url) => deleteUpload(url)));
    }

    revalidateSite();
    return { ok: true, id: project.id };
  } catch (error) {
    return friendlyError(error, "Não foi possível salvar o projeto.");
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    const project = await prisma.project.delete({ where: { id } });
    await Promise.all([project.coverImage, ...project.images].map((url) => deleteUpload(url)));
    revalidateSite();
    return { ok: true };
  } catch (error) {
    return friendlyError(error, "Não foi possível excluir o projeto.");
  }
}

export async function toggleProjectFlag(
  id: string,
  flag: "published" | "featured",
): Promise<ActionResult> {
  await requireAdmin();
  try {
    const project = await prisma.project.findUniqueOrThrow({ where: { id } });
    await prisma.project.update({ where: { id }, data: { [flag]: !project[flag] } });
    revalidateSite();
    revalidatePath("/admin");
    return { ok: true };
  } catch (error) {
    return friendlyError(error, "Não foi possível atualizar o projeto.");
  }
}

export async function saveTechnology(input: TechnologyInput): Promise<ActionResult> {
  await requireAdmin();

  const parsed = technologySchema.safeParse(input);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: `${issue.path.join(".")}: ${issue.message}` };
  }
  const { id, ...data } = parsed.data;
  const fields = { ...data, icon: data.icon || null };

  try {
    const previous = id ? await prisma.technology.findUnique({ where: { id } }) : null;
    const saved = id
      ? await prisma.technology.update({ where: { id }, data: fields })
      : await prisma.technology.create({ data: fields });
    if (previous && previous.icon !== fields.icon) await deleteUpload(previous.icon);

    revalidateSite();
    revalidatePath("/admin/tecnologias");
    return { ok: true, id: saved.id };
  } catch (error) {
    return friendlyError(error, "Não foi possível salvar a tecnologia.");
  }
}

export async function deleteTechnology(id: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    const tech = await prisma.technology.delete({ where: { id } });
    await deleteUpload(tech.icon);
    revalidateSite();
    revalidatePath("/admin/tecnologias");
    return { ok: true };
  } catch (error) {
    return friendlyError(error, "Não foi possível excluir a tecnologia.");
  }
}

export async function setMessageRead(id: string, read: boolean): Promise<ActionResult> {
  await requireAdmin();
  try {
    await prisma.contactMessage.update({ where: { id }, data: { read } });
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (error) {
    return friendlyError(error, "Não foi possível atualizar a mensagem.");
  }
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (error) {
    return friendlyError(error, "Não foi possível excluir a mensagem.");
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}
