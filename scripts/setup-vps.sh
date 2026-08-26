#!/bin/bash

echo "🚀 Starting VPS Setup for Website DPSG Wehr..."

# 0. Optimize Network (IPv4 Preference)
# GHCR and other services can be slow over IPv6 on some VPS providers (Netcup).
# We configure /etc/gai.conf to prefer IPv4.
if [ -f /etc/gai.conf ]; then
    if grep -q "^precedence ::ffff:0:0/96  100" /etc/gai.conf; then
         echo "✅ IPv4 preference already configured."
    else
         echo "🌐 Configuring system to prefer IPv4 (fixes slow GHCR pulls)..."
         # Uncomment the line if it exists but is commented out
         sed -i 's/^#precedence ::ffff:0:0\/96  100/precedence ::ffff:0:0\/96  100/' /etc/gai.conf
         # Append if not found
         if ! grep -q "^precedence ::ffff:0:0/96  100" /etc/gai.conf; then
             echo "precedence ::ffff:0:0/96  100" >> /etc/gai.conf
         fi
         echo "✅ Network optimized."
    fi
else
    echo "⚠️  /etc/gai.conf not found. Skipping network optimization."
fi

# 1. Setup .env
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Action Required: Check .env and configure GHCR / Token settings if needed."
else
    echo "✅ .env already exists."
fi

# 2. Setup Webhook hooks.json
if [ ! -f scripts/hooks.json ]; then
    echo "🔗 Creating scripts/hooks.json from template..."
    cp scripts/hooks.json.template scripts/hooks.json
    echo "⚠️  Action Required: Update the secret token in scripts/hooks.json."
else
    echo "✅ scripts/hooks.json already exists."
fi

# 3. Create required directories
mkdir -p public/generated
chmod 755 public/generated

echo "🎉 Setup complete! Configure .env and scripts/hooks.json, then run 'docker compose up -d'."