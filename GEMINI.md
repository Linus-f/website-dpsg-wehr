# Website DPSG Wehr - Project Context

## Project Overview

This is the source code for the "DPSG Wehr" website, built with **Next.js 14** (App Router). The site is designed to be **completely statically generated** (`output: "export"`) and deployed to a static host.

**Key Features:**
*   **Static Site Generation (SSG):** Optimized for performance and simple hosting.
*   **MDX Content:** Most content pages are written in MDX, allowing for a mix of Markdown and React components.
*   **Image Optimization:** Uses `next-image-export-optimizer` to handle image optimization at build time, compatible with static export.
*   **UI Frameworks:** Combines **Tailwind CSS** for custom styling and **Mantine UI** for accessible components.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org)
*   **Styling:** 
    *   [Tailwind CSS](https://tailwindcss.com)
    *   [Mantine UI](https://mantine.dev)
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

## Development Conventions

*   **Images:** 
    *   Do **not** use the standard `next/image` component directly if it conflicts with the static export requirement for optimization. 
    *   Use `ExportedImage` from `next-image-export-optimizer` in TSX files.
    *   In MDX files, standard markdown image syntax `![alt](src)` is mapped to a custom component (`MDXImage`) which handles optimization.
*   **Navigation:** Navigation links are defined in `lib/config.ts`.
*   **Styling:** Prefer Tailwind CSS for layout and spacing. Use Mantine components for complex interactive elements (modals, menus).
*   **Theme:** The site supports dark/light mode, managed via `next-themes` and Mantine's theme system.
