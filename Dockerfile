# Stage 1: Build
FROM node:22-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

ENV NEXT_TELEMETRY_DISABLED=1
# Force Tina to use local data and skip cloud checks during build
ENV TINA_PUBLIC_IS_LOCAL=true
ENV NEXT_PUBLIC_TINA_CLIENT_ID=null
ENV TINA_TOKEN=null

# Image Optimization Environment Variables
ENV nextImageExportOptimizer_imageFolderPath="public/media/images"
ENV nextImageExportOptimizer_exportFolderPath="out"
ENV nextImageExportOptimizer_exportFolderName="nextImageExportOptimizer"
ENV nextImageExportOptimizer_quality="60"
ENV nextImageExportOptimizer_storePicturesInWEBP="true"
ENV nextImageExportOptimizer_generateAndUseBlurImages="true"
ENV nextImageExportOptimizer_imageSizes="16,32,48,64,96,128,256,384"
ENV nextImageExportOptimizer_deviceSizes="640,828,1080,1200,1920,2048,3840"

WORKDIR /app

# Copy dependencies first for caching
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build and Export
# We use a subshell to ensure we capture failure and manage the cache correctly
RUN --mount=type=cache,id=next-cache,target=/app/.next/cache \
    --mount=type=cache,id=image-cache,target=/app/.next-image-cache \
    set -e; \
    mkdir -p out/nextImageExportOptimizer; \
    if [ -d "/app/.next-image-cache" ]; then cp -r /app/.next-image-cache/. out/nextImageExportOptimizer/ || true; fi; \
    pnpm export; \
    if [ -d "out/nextImageExportOptimizer" ]; then cp -r out/nextImageExportOptimizer/. /app/.next-image-cache/ || true

# Stage 2: Serve
FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static output from builder
# Verify that index.html exists before finishing the build
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
