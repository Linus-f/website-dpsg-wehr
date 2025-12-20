# Simplified Workflow & Image Handling Plan (Updated)

## 1. Goals
*   **Simplify Deployment:** Move to a single-repository workflow, removing the need for a separate "static" repo.
*   **Optimize Images:** Solve the "repository bloat" and "slow build" issues associated with large image collections.
*   **Future-Proofing:** Prepare the application for migration from FTP hosting to a VPS with Docker.

## 2. Image Handling Strategy

### A. Storage: Git LFS (Large File Storage)
*   **Problem:** Storing binary images directly in git slows down cloning and bloats history.
*   **Solution:** Initialize Git LFS for the `public/images` directory.
    *   *Effect:* Git tracks pointers (text files), while the actual image data is stored on a specialized storage server.
    *   *Benefit:* Fast clones, efficient versioning of binaries.

### B. Build Process: Intelligent Caching
*   **Problem:** `next-image-export-optimizer` re-processes every image on every CI build, wasting time.
*   **Solution:** Configure GitHub Actions to **cache the optimization artifacts**.
    *   We will cache the `nextImageExportOptimizer` output folders based on a hash of the source images.
    *   If source images haven't changed, the build reuses the cached optimized versions instantly.

### C. Serving: Immutable Caching
*   **Problem:** Browsers redownload images unnecessarily.
*   **Solution:**
    *   **Current (FTP):** Attempt to add `.htaccess` rules (if supported) for long-term caching.
    *   **Future (VPS/Nginx):** Configure Nginx to serve files in `nextImageExportOptimizer` with `Cache-Control: public, max-age=31536000, immutable`.
    *   *Why it works:* The optimizer puts hashes in filenames (e.g., `img.H28s.webp`). If the content changes, the filename changes, so "forever" caching is safe.

## 3. Deployment Workflow (The "Single Repo" Approach)

### Phase 1: Local Development
1.  **Develop:** `pnpm dev`.
2.  **Verify:** Run `pnpm run export` and `pnpm run serve` to check the exact production build locally.
3.  **Commit:** `git add .`, `git commit`.

### Phase 2: CI/CD Pipeline (GitHub Actions)
Triggered on push to `main`.
1.  **Checkout:** Fetch code (and LFS objects).
2.  **Restore Cache:**
    *   `node_modules` (for faster install).
    *   `**/.next/cache` (Next.js build cache).
    *   `**/nextImageExportOptimizer` (Optimized images).
3.  **Build:** `pnpm run export`.
    *   *Note:* The optimizer will skip images found in the restored cache.
4.  **Deploy:**
    *   Use `milanmk/actions-file-deployer` (or similar) to sync the `out/` folder to your FTP server.
    *   Sync method: `delta` (only upload changed files).

## 4. Execution Steps

1.  **Cleanup:** Remove local untracked `nextImageExportOptimizer` folders to avoid confusion.
2.  **Git LFS Setup:**
    *   Install/Initialize Git LFS.
    *   Track extensions: `git lfs track "*.jpg" "*.png" "*.jpeg"`.
    *   Migrate existing images (if necessary/desired, or just apply to new ones).
3.  **Workflow Rewrite:**
    *   Replace `.github/workflows/main.yml`.
    *   Remove the "push to other repo" logic.
    *   Add the Caching and FTP Deployment steps.
4.  **Future VPS Prep:**
    *   Create `Dockerfile` (Nginx + Static Content).
    *   Create `nginx.conf` (Gzip + Caching Headers).

## 5. Next Action
Awaiting approval to begin **Step 1 (Cleanup)** and **Step 3 (Workflow Rewrite)**.