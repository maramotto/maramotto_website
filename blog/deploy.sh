#!/usr/bin/env bash
set -euo pipefail

# deploy.sh — push master and deploy the maramotto-web container on the
# Hetzner server.
#
# Usage: ./blog/deploy.sh
#
# Prerequisites:
#   - You're on the master branch with no uncommitted changes.
#   - SSH access configured as the "maramotto" host (see ~/.ssh/config).

SSH_HOST="maramotto"
REMOTE_PATH="/opt/maramotto_website"

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "master" ]; then
  echo "Error: estás en la rama '$BRANCH', no en 'master'."
  echo "Cambia a master (git checkout master) o mergea tu rama primero."
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Error: hay cambios sin commitear:"
  git status --short
  exit 1
fi

echo "==> Sincronizando con origin/master..."
git pull origin master
git push origin master

echo "==> Desplegando en el servidor ($SSH_HOST:$REMOTE_PATH)..."
ssh "$SSH_HOST" bash -s "$REMOTE_PATH" <<'REMOTE_SCRIPT'
set -euo pipefail
cd "$1"
echo "  -> git pull"
git pull origin master
echo "  -> docker compose build"
docker compose build
echo "  -> docker compose up -d"
docker compose up -d
REMOTE_SCRIPT

echo "==> Verificando..."
sleep 2
ssh "$SSH_HOST" bash -s <<'VERIFY_SCRIPT'
set -euo pipefail
curl -sf -o /dev/null -w '  homepage: %{http_code}\n' http://localhost:8080/
curl -sf http://localhost:8080/blog/ | grep -qo "post-card" && echo "  blog: OK"
docker ps --filter name=maramotto-web --format '  {{.Names}}: {{.Status}}'
VERIFY_SCRIPT

echo ""
echo "Desplegado. https://maramotto.com/blog/"
