# Stage 1: Build
FROM node:22-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

ENV NEXT_TELEMETRY_DISABLED=1

# Image Optimization Environment Variables
ENV nextImageExportOptimizer_imageFolderPath="public/images"
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

# Build and Export with cache mounts for Next.js and images
RUN --mount=type=cache,id=next-cache,target=/app/.next/cache \
    --mount=type=cache,id=image-cache,target=/app/out/nextImageExportOptimizer \
    pnpm next build && \
    pnpm next-image-export-optimizer && \
    node scripts/inline-css.mjs

# Stage 2: Serve
FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static output from builder
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
