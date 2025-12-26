#!/bin/sh

# This script runs inside the webhook container
# It is mounted from the host at /var/scripts/vps-deploy.sh
# The working directory is /app (bind mounted from host project root)

cd /app || { echo "❌ Error: /app directory not found"; exit 1; }

# Enable strict error handling
set -e

# Fix for "dubious ownership" error in Docker environment
git config --global --add safe.directory /app

echo "🚀 [$(date)] Starting deployment for branch: main"

# 1. Pull latest code
echo "📥 Pulling latest changes from main..."
if ! git pull origin main; then
    echo "❌ Error: git pull failed. You may have local changes conflicting with main."
    echo "ℹ️  Try running 'git reset --hard origin/main' if you don't care about local changes."
    exit 1
fi

# 2. Login to GHCR
if [ -f .env ]; then
    GITHUB_TOKEN=$(grep '^NEXT_PUBLIC_GITHUB_TOKEN=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    REPO_OWNER=$(grep '^NEXT_PUBLIC_REPO_OWNER=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    
    if [ -n "$GITHUB_TOKEN" ] && [ -n "$REPO_OWNER" ]; then
        echo "🔐 Logging in to GHCR..."
        if ! echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$REPO_OWNER" --password-stdin; then
             echo "❌ Error: Docker login failed. Check your NEXT_PUBLIC_GITHUB_TOKEN permissions."
             echo "ℹ️  Token must have 'read:packages' scope."
             exit 1
        fi
    else
        echo "⚠️  Warning: Could not find credentials in .env. Attempting anonymous pull (will likely fail for private images)."
    fi
fi

# 3. Pull new image
echo "⬇️  Pulling new image..."
docker compose pull website

# 4. Update container
echo "🚀 Restarting containers..."
docker compose up -d website

# 5. Cleanup
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ [$(date)] Deployment finished successfully!"