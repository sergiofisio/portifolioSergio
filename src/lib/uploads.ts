import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ACCEPTED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif", "image/svg+xml"]);

export function uploadRoot() {
  return path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR ?? "./uploads");
}

export function resolveUploadPath(segments: string[]) {
  const root = uploadRoot();
  const target = path.resolve(/*turbopackIgnore: true*/ root, ...segments);
  if (target !== root && !target.startsWith(root + path.sep)) return null;
  return target;
}

export async function saveImage(file: File, kind: "project" | "icon") {
  if (!ACCEPTED.has(file.type)) throw new Error("Formato de imagem não suportado.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Imagem maior que 10 MB.");

  const input = Buffer.from(await file.arrayBuffer());
  const now = new Date();
  const folder = path.join(String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, "0"));
  const name = `${randomUUID()}.webp`;

  const width = kind === "icon" ? 256 : 1920;
  const output = await sharp(input, { animated: file.type === "image/gif" })
    .rotate()
    .resize({ width, height: kind === "icon" ? 256 : undefined, fit: "inside", withoutEnlargement: true })
    .webp({ quality: kind === "icon" ? 90 : 82 })
    .toBuffer();

  const dir = path.join(/*turbopackIgnore: true*/ uploadRoot(), folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(/*turbopackIgnore: true*/ dir, name), output);

  return `/uploads/${folder.split(path.sep).join("/")}/${name}`;
}

export async function deleteUpload(url: string | null | undefined) {
  if (!url?.startsWith("/uploads/")) return;
  const target = resolveUploadPath(url.replace("/uploads/", "").split("/"));
  if (target) await unlink(target).catch(() => undefined);
}
