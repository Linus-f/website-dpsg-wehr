#!/bin/sh

# This script runs inside the webhook container
cd /app || exit

echo "🚀 Starting deployment for branch: main"

# 1. Pull latest code (requires git to be installed in the webhook image or the repo already cloned on host)
echo "📥 Pulling latest changes from main..."
git pull origin main

# 2. Rebuild and restart the website container
echo "🏗️ Rebuilding website container..."
# Note: This requires the 'docker' CLI to be available in the webhook container
# We use the host's docker daemon via the mounted socket.
docker compose up -d --build website

echo "✅ Deployment finished successfully!"