#!/bin/sh
# Backup diário do banco e dos uploads. Mantém os últimos 14 dias.
set -eu

APP_DIR=/opt/portfolio
DEST="$APP_DIR/backups"
STAMP=$(date +%Y%m%d-%H%M%S)

cd "$APP_DIR"
mkdir -p "$DEST"

docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom' \
  > "$DEST/db-$STAMP.dump"

docker run --rm -v portfolio_uploads:/data:ro -v "$DEST":/backup alpine \
  tar czf "/backup/uploads-$STAMP.tar.gz" -C /data .

find "$DEST" -type f -mtime +14 -delete
echo "$(date -Is) backup ok: db-$STAMP.dump uploads-$STAMP.tar.gz"

# Restaurar:
#   docker compose exec -T postgres sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists' < backups/db-XXXX.dump
#   docker run --rm -v portfolio_uploads:/data -v "$PWD/backups":/backup alpine tar xzf /backup/uploads-XXXX.tar.gz -C /data
