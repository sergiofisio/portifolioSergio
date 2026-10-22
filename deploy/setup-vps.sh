#!/bin/sh
# Prepara a VPS (Ubuntu 24.04) para rodar o portfólio em Docker atrás do OpenLiteSpeed.
# Uso (como root): sh setup-vps.sh
set -eu

APP_DIR=/opt/portfolio

if ! command -v docker >/dev/null 2>&1; then
  echo "Instalando Docker..."
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

mkdir -p "$APP_DIR/backups"
cd "$APP_DIR"

if [ ! -f docker-compose.yml ]; then
  echo "Copie docker-compose.yml para $APP_DIR (o GitHub Actions também faz isso a cada deploy)."
fi

if [ ! -f .env ]; then
  if [ -f env.production.example ]; then
    cp env.production.example .env
    sed -i "s|^AUTH_SECRET=.*|AUTH_SECRET=$(openssl rand -base64 33)|" .env
    sed -i "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$(openssl rand -hex 24)|" .env
    chmod 600 .env
    echo "Criado $APP_DIR/.env com AUTH_SECRET e senha do banco gerados. Preencha AUTH_GITHUB_ID/SECRET."
  else
    echo "Copie deploy/env.production.example para $APP_DIR/.env e preencha."
  fi
fi

CRON_LINE="0 3 * * * sh $APP_DIR/backup.sh >> /var/log/portfolio-backup.log 2>&1"
if ! crontab -l 2>/dev/null | grep -q "$APP_DIR/backup.sh"; then
  (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
  echo "Backup diário agendado às 03:00."
fi

if ss -ltn | grep -q ":${APP_PORT:-3020} "; then
  echo "ATENÇÃO: a porta ${APP_PORT:-3020} já está em uso. Defina outra em APP_PORT no .env e no nginx."
fi

echo "Pronto. Próximos passos: configurar o nginx (deploy/nginx) e rodar 'docker compose up -d'."
