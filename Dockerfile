# syntax=docker/dockerfile:1.7

FROM node:24-bookworm-slim AS base
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    CHECKPOINT_DISABLE=1

FROM base AS deps
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://devsergiofisico.com.br
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

# Prisma CLI + tsx for migrations and seed at container start (the Next standalone output only ships runtime deps)
FROM base AS tools
WORKDIR /tools
COPY package.json /tmp/app-package.json
RUN node -e "\
  const app = require('/tmp/app-package.json'); \
  const all = { ...app.dependencies, ...app.devDependencies }; \
  const names = ['prisma', '@prisma/client', '@prisma/adapter-pg', 'pg', 'dotenv', 'tsx']; \
  const dependencies = Object.fromEntries(names.map((n) => [n, all[n]])); \
  require('fs').writeFileSync('package.json', JSON.stringify({ name: 'tools', private: true, dependencies }));" \
  && npm install --no-audit --no-fund
COPY prisma.config.ts ./
COPY prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated

FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    UPLOAD_DIR=/app/uploads

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs \
  && mkdir -p /app/uploads \
  && chown nextjs:nodejs /app/uploads

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=tools /tools ./tools
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server.js"]
