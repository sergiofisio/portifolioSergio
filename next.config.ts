import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    globalNotFound: true,
    serverActions: {
      allowedOrigins: ["devsergiofisico.com.br", "www.devsergiofisico.com.br"],
    },
  },
};

export default withNextIntl(nextConfig);
