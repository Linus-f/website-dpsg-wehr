#!/bin/sh

# This script runs inside the webhook container
cd /app || exit

# Fix for "dubious ownership" error in Docker environment
git config --global --add safe.directory /app

echo "🚀 Starting deployment for branch: main"

# 1. Pull latest code
echo "📥 Pulling latest changes from main..."
if ! git pull origin main; then
    echo "❌ Error: git pull failed."
    exit 1
fi

# 2. Login to GHCR
# We need to extract the token and owner from .env to login to ghcr.io
# This allows pulling private images or avoiding rate limits
if [ -f .env ]; then
    # Extract values, removing potential quotes
    GITHUB_TOKEN=$(grep '^NEXT_PUBLIC_GITHUB_TOKEN=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    REPO_OWNER=$(grep '^NEXT_PUBLIC_REPO_OWNER=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    
    if [ -n "$GITHUB_TOKEN" ] && [ -n "$REPO_OWNER" ]; then
        echo "🔐 Logging in to GHCR..."
        echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$REPO_OWNER" --password-stdin
    else
        echo "⚠️  Could not find NEXT_PUBLIC_GITHUB_TOKEN or NEXT_PUBLIC_REPO_OWNER in .env. Skipping login."
    fi
fi

# 3. Pull and restart the website container
echo "⬇️  Pulling new image..."
docker compose pull website

echo "🚀 Restarting containers..."
docker compose up -d website

# 4. Cleanup old images
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ Deployment finished successfully!"
