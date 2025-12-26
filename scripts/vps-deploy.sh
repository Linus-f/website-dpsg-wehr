#!/bin/sh

# This script runs inside the webhook container OR on the host.
# Inside container: Mounted at /var/scripts/vps-deploy.sh, project at /app
# On host: Run from the project root.

# If we are in the container, /app will exist. 
# If we are on the host, we should check if we are already in a git repo.
if [ -d "/app/.git" ]; then
    cd /app
    echo "🐳 Running inside container context (/app)"
elif [ -d ".git" ]; then
    echo "🏠 Running on host context ($(pwd))"
else
    echo "❌ Error: Could not find .git directory. Run this script from the project root."
    exit 1
fi

# Enable strict error handling
set -e

# Fix for "dubious ownership" error in Docker environment
git config --global --add safe.directory "$(pwd)"

echo "🚀 [$(date)] Starting deployment for branch: main"

# 1. Pull latest code
echo "📥 Pulling latest changes from main..."
if ! git pull origin main; then
    echo "❌ Error: git pull failed."
    echo "ℹ️  Check if you have local changes or network issues."
    exit 1
fi

# 2. Login to GHCR
if [ -f .env ]; then
    GITHUB_TOKEN=$(grep '^NEXT_PUBLIC_GITHUB_TOKEN=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    REPO_OWNER=$(grep '^NEXT_PUBLIC_REPO_OWNER=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    
    if [ -n "$GITHUB_TOKEN" ] && [ -n "$REPO_OWNER" ]; then
        echo "🔐 Logging in to GHCR..."
        if ! echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$REPO_OWNER" --password-stdin; then
             echo "❌ Error: Docker login failed."
             exit 1
        fi
    else
        echo "⚠️  Warning: Credentials not found in .env."
    fi
else
    echo "⚠️  Warning: .env file not found."
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
