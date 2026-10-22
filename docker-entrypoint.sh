#!/bin/sh
set -e

if [ "${SKIP_MIGRATIONS:-false}" != "true" ]; then
  echo "Aplicando migrations do banco..."
  (cd /app/tools && ./node_modules/.bin/prisma migrate deploy)
fi

if [ "${RUN_SEED:-false}" = "true" ]; then
  echo "Executando seed..."
  (cd /app/tools && ./node_modules/.bin/tsx prisma/seed.ts)
fi

exec "$@"
