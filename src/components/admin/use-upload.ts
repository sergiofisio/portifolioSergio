"use client";

import { useState } from "react";

export function useUpload(kind: "project" | "icon" = "project") {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(files: FileList | File[]) {
    const list = [...files];
    if (!list.length) return [];
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.set("kind", kind);
      list.forEach((file) => body.append("files", file));
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json()) as { urls?: string[]; error?: string };
      if (!response.ok || !data.urls) throw new Error(data.error ?? "Falha no upload.");
      return data.urls;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload.");
      return [];
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading, error };
}
