# Website DPSG Wehr - Project Context

## Project Overview

This is the source code for the "DPSG Wehr" website, built with **Next.js 16** (App Router). The site is designed to be **completely statically generated** (`output: "export"`) and deployed to a static host.

**Key Features:**

- **Static Site Generation (SSG):** Optimized for performance and simple hosting.
- **Dynamic Routing:** Content is decoupled from logic. MDX files are stored in a central `content/` directory and rendered via dynamic route templates.
- **Automated SEO:** Social previews (Open Graph and Twitter Cards) are automatically generated for every page and post using content excerpts.
- **Automated Testing:** Comprehensive suite including Unit, Component, and E2E tests with unified reporting.
- **Image Optimization:** Uses `next-image-export-optimizer` for build-time optimization compatible with static export.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com), [React Icons](https://react-icons.github.io/react-icons/)
- **Content:** MDX rendered via `next-mdx-remote`, `gray-matter` for frontmatter.
- **Testing:** [Vitest](https://vitest.dev/) (Unit/Component), [Playwright](https://playwright.dev/) (E2E), [Monocart Reporter](https://github.com/cenfun/monocart-reporter).
- **Package Manager:** [pnpm](https://pnpm.io)

## Directory Structure

- `app/`: Next.js App Router directory.
    - `app/pages/[slug]/page.tsx`: Dynamic template for general content pages.
    - `app/pages/gruppen/[slug]/page.tsx`: Dynamic template for youth group pages.
    - `app/posts/[slug]/page.tsx`: Dynamic template for news posts.
- `content/`: Raw content managed as MDX files.
    - `content/pages/`: General pages (FAQ, Impressum, Startseite).
    - `content/gruppen/`: Youth group pages (Wölflinge, Jupfis, etc.).
    - `content/posts/`: News and blog articles.
- `components/`: Reusable React components.
- `lib/`: Utility functions, configuration, and metadata helpers (`metadata.ts`).
- `e2e/`: Playwright end-to-end test specifications.
- `public/`: Static assets and source images.
- `mdx-components.tsx`: Global mapping of custom components for MDX rendering.

## Development & Testing

### Key Commands

- **Start Development Server:** `pnpm dev` (Runs at `http://localhost:3000`).
- **Run Unit Tests:** `pnpm test` (Vitest watch mode).
- **Run E2E Tests:** `pnpm test:e2e` (Playwright).
- **Open E2E UI:** `pnpm test:e2e:ui` (Interactive Playwright runner).
- **Run All Tests:** `pnpm test:all` (Sequential Vitest + Playwright).
- **View Test Dashboard:** `pnpm test:report` (Unified Monocart dashboard).
- **Build & Export:** `pnpm export` (Generates static output in `out/`).

## Release Workflow

The project uses **Semantic Release** to automate versioning and changelog generation.

1.  **Release Workflow (`release.yml`):** Triggered on push to `main`. Generates version, CHANGELOG, and GitHub Release.
2.  **Docker Build Workflow (`docker.yml`):** Triggered on new tags. Builds and pushes optimized images to GHCR.
3.  **Tests Workflow (`tests.yml`):** Triggered on push/PR to `main` or `dev`. Runs the full test suite with caching.

## Development Conventions

- **Content First:** Always add new pages or posts as MDX files in the `content/` directory. Metadata and routing are handled automatically.
- **Images:** Use the standard Markdown syntax `![alt](src)` in MDX. The system handles sizing and optimization automatically via `rehype-img-size`.
- **Testing:** New features should include relevant Unit or E2E tests. Ensure `pnpm test:all` passes before pushing.
- **Styling:** Use Tailwind CSS and ensure content is wrapped in `prose` classes within templates.

## Agent Workflows

### Automated SEO Check

When modifying metadata logic, verify that `<meta>` tags for `og:title`, `og:description`, and `og:image` are correctly rendered using the `e2e/social.spec.ts` test.

### ICS Generation

ICS files are generated as part of the build process from `lib/events.public.ts` and `lib/events.internal.ts`. The logic is isolated in `scripts/generate-ics.ts` and verified by `scripts/generate-ics.test.ts`.
