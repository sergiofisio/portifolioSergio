import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { saveImage } from "@/lib/uploads";

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const form = await request.formData();
  const kind = form.get("kind") === "icon" ? "icon" : "project";
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  try {
    const urls = await Promise.all(files.map((file) => saveImage(file, kind)));
    return NextResponse.json({ urls });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha no upload.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
