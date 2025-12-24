#!/bin/bash

echo "🚀 Starting VPS Setup for Website DPSG Wehr..."

# 1. Setup .env
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Action Required: Please edit .env and add your NEXT_PUBLIC_GITHUB_TOKEN."
else
    echo "✅ .env already exists."
fi

# 2. Setup .htpasswd
if [ ! -f auth/.htpasswd ]; then
    echo "🔒 Setting up Basic Auth (auth/.htpasswd)..."
    mkdir -p auth
    
    # Check if htpasswd tool exists
    if command -v htpasswd &> /dev/null; then
        read -p "Enter username for Admin Panel: " username
        if htpasswd -c auth/.htpasswd "$username"; then
            echo "✅ auth/.htpasswd created."
        else
            echo "❌ Error: Failed to create auth/.htpasswd."
            exit 1
        fi
    else
        echo "⚠️  'htpasswd' command not found."
        echo "   Please create auth/.htpasswd manually or install apache2-utils."
        echo "   Format: username:hashed_password"
        cp .htpasswd.example auth/.htpasswd
        echo "✅ auth/.htpasswd created from example (Action required: Update manually)."
    fi
else
    echo "✅ auth/.htpasswd already exists."
fi

echo "🎉 Setup complete! Don't forget to edit .env before starting the container."
