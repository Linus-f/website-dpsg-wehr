# Website DPSG Wehr - Project Context

## Project Overview

This is the source code for the "DPSG Wehr" website, built with **Next.js 14** (App Router). The site is designed to be **completely statically generated** (`output: "export"`) and deployed to a static host.

**Key Features:**
*   **Static Site Generation (SSG):** Optimized for performance and simple hosting.
*   **MDX Content:** Most content pages are written in MDX, allowing for a mix of Markdown and React components.
*   **Image Optimization:** Uses `next-image-export-optimizer` to handle image optimization at build time, compatible with static export.
*   **UI Frameworks:** Uses **Tailwind CSS** for all styling and components.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org)
*   **Styling:** 
    *   [Tailwind CSS](https://tailwindcss.com)
    *   [React Icons](https://react-icons.github.io/react-icons/)
*   **Content:** 
    *   MDX (`@next/mdx`, `mdx-components.tsx`)
    *   Plugins: `remark-frontmatter`, `remark-gfm`, `rehype-img-size`
*   **Package Manager:** [pnpm](https://pnpm.io)

## Directory Structure

*   `app/`: Next.js App Router directory. Contains pages (`page.tsx`, `page.mdx`) and layouts (`layout.tsx`).
    *   `app/globals.css`: Global styles (Tailwind directives).
    *   `app/pages/`: Content pages (e.g., Impressum, Datenschutz, Group pages) often implemented as `page.mdx`.
*   `components/`: Reusable React components.
    *   `Navbar.tsx`: Main navigation bar.
    *   `MDXImage.tsx`: Custom image component for MDX files.
    *   `PageLayout.tsx`: Common layout wrapper.
*   `lib/`: Utility functions and configuration.
    *   `config.ts`: Site configuration and navigation links.
*   `public/`: Static assets (images, fonts, files).
    *   `public/images/`: Source images for the website.
*   `mdx-components.tsx`: Defines custom components to be used in MDX files.
*   `next.config.mjs`: Next.js configuration, including image optimization settings.

## Development & Building

The project uses `pnpm` for script management.

### Key Commands

*   **Start Development Server:**
    ```bash
    pnpm dev
    ```
    Runs the app at `http://localhost:3000`.

*   **Build & Export (Production):**
    ```bash
    pnpm export
    ```
    This command runs `next build` followed by `next-image-export-optimizer`. The static output is generated in the `out/` directory.

*   **Linting:**
    ```bash
    pnpm lint
    ```

*   **GitHub Issues:**
    Use the `gh` CLI to interact with GitHub issues.
    *   View an issue: `gh issue view <issue-number>`
    *   List issues: `gh issue list`

## Release Workflow

The project uses **Semantic Release** to automate versioning and changelog generation.

1.  **Release Workflow (`release.yml`):**
    *   Triggered on push to `main`.
    *   Analyzes commit messages to determine the next version (e.g., `fix:` -> patch, `feat:` -> minor).
    *   Updates `package.json`, generates `CHANGELOG.md`, creates a GitHub Release, and pushes a Git Tag (e.g., `v1.1.0`).

2.  **Docker Build Workflow (`docker.yml`):**
    *   Triggered when a new Git Tag (`v*`) is pushed.
    *   Builds the application and optimizes images.
    *   Pushes the Docker image to GitHub Container Registry (GHCR) tagged with the version (e.g., `:v1.1.0`, `:v1.1`, `:latest`).

## Workflow & Branching

*   **Main Branch (`main`):** Production-only. Merging to `main` triggers **Semantic Release** and **Docker deployment**.
*   **Development Branch (`dev`):** The primary integration branch. All features and fixes should be merged here first.
*   **Feature Branches:** Create from `dev` (e.g., `feat/...`, `fix/...`). Merge back to `dev` via Pull Request.
*   **Release Process:** When ready for a release, merge `dev` into `main`.

## Review & Quality Policy

*   **Pre-Commit Review:** Before committing (especially for user-made changes), the AI agent should:
    1.  Run `git status` and `git diff` to analyze the changes.
    2.  Check for potential bugs, styling inconsistencies, or deviations from project conventions.
    3.  Provide a concise summary and feedback.
*   **Linting Policy:** If a linting rule must be disabled (e.g., `eslint-disable`), always provide a clear comment explaining *why* it was necessary.
*   **Build Verification:** Always ensure `pnpm build` passes before merging into `dev` or `main`.

## Development Conventions

*   **Images:** 
    *   Do **not** use the standard `next/image` component directly if it conflicts with the static export requirement for optimization. 
    *   Use `ExportedImage` from `next-image-export-optimizer` in TSX files.
    *   In MDX files, standard markdown image syntax `![alt](src)` is mapped to a custom component (`MDXImage`) which handles optimization.
*   **Navigation:** Navigation links are defined in `lib/config.ts`.
*   **Styling:** Prefer Tailwind CSS for layout, spacing, and all UI components.
*   **Theme:** The site supports dark/light mode, managed via `next-themes`.
