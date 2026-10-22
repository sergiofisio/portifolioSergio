import { readFile } from "node:fs/promises";
import { resolveUploadPath } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: RouteContext<"/uploads/[...path]">) {
  const { path } = await params;
  const target = resolveUploadPath(path);
  if (!target || !target.endsWith(".webp")) return new Response("Not found", { status: 404 });

  try {
    const file = await readFile(target);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
