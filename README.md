# Portfólio — Sergio Bastos

Portfólio em Next.js 16 (App Router) com textos em PT/EN/FR, projetos dinâmicos gerenciados em `/admin` (PostgreSQL + Prisma) e deploy em Docker na VPS, atrás do nginx.

- Site: `/pt`, `/en`, `/fr`, com detalhe do projeto em `/[locale]/projetos/[slug]`
- Admin: `/admin`, com login via GitHub restrito a `ADMIN_GITHUB_LOGIN`
- Os textos fixos ficam em `messages/*.json`, os contatos em `src/config/site.ts`, os posts em `src/config/content.ts` e os CVs em `public/cv/`

## Desenvolvimento

```bash
cp .env.example .env         # preencha AUTH_SECRET e as variáveis do GitHub OAuth
npm install
npm run db:up                # Postgres local na porta 5433 (Docker)
npm run db:deploy            # aplica as migrations
npm run db:seed              # importa os projetos e tecnologias iniciais
npm run dev
```

Para o login local, crie um GitHub OAuth App com callback `http://localhost:3000/api/auth/callback/github`.

Para alterar o schema, edite `prisma/schema.prisma`, rode `npm run db:migrate -- --name descricao` e depois `npx prisma generate` (no Prisma 7 o `migrate dev` não gera mais o client automaticamente). Faça commit da pasta `prisma/migrations`, porque o container aplica as migrations ao iniciar.

## Deploy na VPS (Hostinger, Ubuntu 24.04 + nginx)

O fluxo é: push na `main`, o GitHub Actions valida o código, gera a imagem, publica no GHCR e atualiza os containers na VPS via SSH. Ao iniciar, o container roda `prisma migrate deploy`.

Na VPS, o app roda em Docker (`/opt/portfolio`) escutando só em `127.0.0.1:3020`, e o nginx que já atende os outros sites faz o proxy de `devsergiofisico.com.br` com HTTPS (Let's Encrypt).

### GitHub

- Secrets do repositório (Settings > Secrets and variables > Actions): `VPS_HOST`, `VPS_USER` e `VPS_SSH_KEY` (chave privada usada só pelo deploy; a pública fica em `/root/.ssh/authorized_keys` na VPS).
- Environment `production` em Settings > Environments.
- A VPS baixa a imagem do GHCR com o token temporário do próprio workflow, então o pacote pode continuar privado.
- Para o login do `/admin`, crie um **OAuth App** (Settings > Developer settings > OAuth Apps) com callback `https://devsergiofisico.com.br/api/auth/callback/github`, coloque o Client ID e o Secret em `AUTH_GITHUB_ID` e `AUTH_GITHUB_SECRET` no `/opt/portfolio/.env` e rode `docker compose up -d` na VPS.

### Arquivos na VPS

- `/opt/portfolio/.env`: variáveis de produção (modelo em `deploy/env.production.example`).
- `/opt/portfolio/docker-compose.yml` e `backup.sh`: atualizados a cada deploy pelo workflow.
- `/etc/nginx/sites-available/devsergiofisico.com.br`: cópia de `deploy/nginx/devsergiofisico.com.br.conf`.
- Backup diário às 03:00 (cron) em `/opt/portfolio/backups`, mantendo 14 dias.

Comandos úteis na VPS:

```bash
cd /opt/portfolio
docker compose ps
docker compose logs -f app
docker compose up -d          # após editar o .env
sh backup.sh                  # backup manual (banco + uploads)
```
