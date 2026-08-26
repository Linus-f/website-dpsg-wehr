#!/bin/sh

# This script runs inside the webhook container OR on the host.

if [ -d "/app/.git" ]; then
    cd /app
    echo "🐳 Running inside container context (/app)"
elif [ -d ".git" ]; then
    echo "🏠 Running on host context ($(pwd))"
else
    echo "❌ Error: Could not find .git directory."
    exit 1
fi

set -e

# Fix for "dubious ownership"
git config --global --add safe.directory "$(pwd)"

TARGET="${1:-main}"

case "$TARGET" in
    *dev*)
        TARGET_ENV="dev"
        SERVICES="website-dev"
        ;;
    *all*)
        TARGET_ENV="all"
        SERVICES="website website-dev"
        ;;
    *)
        TARGET_ENV="main"
        SERVICES="website"
        ;;
esac

echo "🚀 [$(date)] Starting deployment for target: $TARGET_ENV (services: $SERVICES)"

# 1. Pull latest code (compose and scripts)
echo "📥 Pulling latest configuration changes..."
if ! git pull origin main; then
    echo "⚠️ Warning: git pull origin main failed or working directory has uncommitted changes."
fi

# 2. Login to GHCR if credentials are present
if [ -f .env ]; then
    GHCR_PAT=$(grep '^GHCR_PAT=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    REPO_OWNER=$(grep '^REPO_OWNER=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    
    if [ -n "$GHCR_PAT" ] && [ -n "$REPO_OWNER" ]; then
        echo "🔐 Logging in to GHCR..."
        if ! echo "$GHCR_PAT" | docker login ghcr.io -u "$REPO_OWNER" --password-stdin; then
             echo "❌ Error: Docker login failed."
             exit 1
        fi
    fi
fi

# 3. Pull new image(s)
for SVC in $SERVICES; do
    echo "⬇️  Pulling new $SVC image..."
    docker compose pull "$SVC"
done

# 4. Ensure directories exist
mkdir -p public/generated
chmod 755 public/generated

# 5. Restart container(s) with zero-downtime rolling update
for SVC in $SERVICES; do
    echo "🚀 Restarting $SVC container..."
    docker compose up -d "$SVC"
done

# 6. Cleanup old images
echo "🧹 Cleaning up dangling images..."
docker image prune -f

echo "✅ [$(date)] Deployment finished successfully for: $SERVICES!"
