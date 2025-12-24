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

# 2. Rebuild and restart the website container
echo "🏗️ Rebuilding website container..."
# Note: This requires the 'docker' CLI to be available in the webhook container
# We use the host's docker daemon via the mounted socket.
docker compose up -d --build --remove-orphans website

echo "✅ Deployment finished successfully!"