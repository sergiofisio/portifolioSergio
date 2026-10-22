import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sergio Bastos — Full Stack Developer";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as "pt" | "en" | "fr", namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #07070c 0%, #1a1035 55%, #07343d 100%)",
          color: "#ededf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#22d3ee", letterSpacing: 4 }}>{"<devsergiofisico />"}</div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 24 }}>Sergio Bastos</div>
        <div style={{ fontSize: 48, marginTop: 8, color: "#b9a8ff" }}>{t("role")}</div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#9a9ab0" }}>
          React · Next.js · Angular · Node.js · Nest.js · PostgreSQL
        </div>
      </div>
    ),
    size,
  );
}
