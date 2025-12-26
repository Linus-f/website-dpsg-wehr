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

echo "🚀 [$(date)] Starting deployment for branch: main"

# 1. Pull latest code
echo "📥 Pulling latest changes from main..."
if ! git pull origin main; then
    echo "❌ Error: git pull failed."
    exit 1
fi

# 2. Login to GHCR
if [ -f .env ]; then
    GHCR_PAT=$(grep '^GHCR_PAT=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    if [ -z "$GHCR_PAT" ]; then
        GHCR_PAT=$(grep '^NEXT_PUBLIC_GITHUB_TOKEN=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    fi
    REPO_OWNER=$(grep '^NEXT_PUBLIC_REPO_OWNER=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    
    if [ -n "$GHCR_PAT" ] && [ -n "$REPO_OWNER" ]; then
        echo "🔐 Logging in to GHCR..."
        if ! echo "$GHCR_PAT" | docker login ghcr.io -u "$REPO_OWNER" --password-stdin; then
             echo "❌ Error: Docker login failed."
             exit 1
        fi
    fi
fi

# 3. Pull new image
echo "⬇️  Pulling new image..."
docker compose pull website

# 4. Generate Internal ICS (Hybrid Approach)
echo "tj📅 Generating Internal Calendar..."
mkdir -p public/generated

if [ -f "lib/events.internal.ts" ] && [ -f ".env" ]; then
    TOKEN=$(grep '^INTERNAL_ICS_TOKEN=' .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    
    if [ -n "$TOKEN" ]; then
        echo "   Found Internal Events file and Token. Generating..."
        
        # Use the dedicated 'generator' service defined in docker-compose.yml
        # This ensures the volume mount (.:/app) is handled correctly relative to the host path
        
        docker compose run --rm generator \
             /bin/sh -c "npm install -g pnpm && pnpm install --frozen-lockfile --ignore-scripts && INTERNAL_ICS_TOKEN=$TOKEN npx tsx scripts/generate-ics.ts"
            
        mv public/internal-events*.ics public/generated/ 2>/dev/null || true
        mv public/events.ics public/generated/ 2>/dev/null || true
        
        echo "   ✅ Calendar files generated in public/generated/"
    else
         echo "   ⚠️ INTERNAL_ICS_TOKEN not found in .env. Skipping."
    fi
else
    echo "   ⚠️ lib/events.internal.ts not found. Skipping internal calendar generation."
fi

# 5. Update container
echo "🚀 Restarting containers..."
docker compose up -d website

# 6. Cleanup
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ [$(date)] Deployment finished successfully!"
