# Stage 1: Build
FROM node:22-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

ENV NEXT_TELEMETRY_DISABLED=1

# Build Arguments
ARG NEXT_PUBLIC_TINA_CLIENT_ID
ARG TINA_TOKEN
ARG TINA_SEARCH_TOKEN
ARG NEXT_PUBLIC_GITHUB_TOKEN
ARG NEXT_PUBLIC_REPO_OWNER
ARG NEXT_PUBLIC_REPO_NAME
ARG NEXT_PUBLIC_REPO_BRANCH
ARG INTERNAL_ICS_TOKEN

# Set Environment Variables for Build
ENV NEXT_PUBLIC_TINA_CLIENT_ID=$NEXT_PUBLIC_TINA_CLIENT_ID
ENV TINA_TOKEN=$TINA_TOKEN
ENV TINA_SEARCH_TOKEN=$TINA_SEARCH_TOKEN
ENV NEXT_PUBLIC_GITHUB_TOKEN=$NEXT_PUBLIC_GITHUB_TOKEN
ENV NEXT_PUBLIC_REPO_OWNER=$NEXT_PUBLIC_REPO_OWNER
ENV NEXT_PUBLIC_REPO_NAME=$NEXT_PUBLIC_REPO_NAME
ENV NEXT_PUBLIC_REPO_BRANCH=$NEXT_PUBLIC_REPO_BRANCH
ENV INTERNAL_ICS_TOKEN=$INTERNAL_ICS_TOKEN
# Disable local mode to ensure we use the provided cloud credentials
ENV TINA_PUBLIC_IS_LOCAL=false

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
RUN --mount=type=cache,id=next-cache,target=/app/.next/cache \
    --mount=type=cache,id=image-cache,target=/app/.next-image-cache \
    mkdir -p out/nextImageExportOptimizer && \
    (cp -r /app/.next-image-cache/. out/nextImageExportOptimizer/ 2>/dev/null || true) && \
    pnpm build && \
    pnpm next-image-export-optimizer && \
    node scripts/inline-css.mjs && \
    (cp -r out/nextImageExportOptimizer/. /app/.next-image-cache/ 2>/dev/null || true) && \
    test -f out/index.html

# Stage 2: Serve
FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy authentication file (if it exists in the build context)
COPY auth/.htpasswd /etc/nginx/auth/.htpasswd

# Copy static output from builder
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]