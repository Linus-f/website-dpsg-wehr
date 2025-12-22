# Mantine Migration Plan

## 1. Goal

Remove the `@mantine/core` and `@mantine/hooks` dependencies to reduce bundle size and simplify the tech stack, while maintaining or improving the current UI quality using Tailwind CSS and React.

## 2. Component Replacements

### A. Sidebar (`components/LinksGroup.tsx`)

- **Current State:** Uses Mantine's `<Collapse>` and `<ThemeIcon>`.
- **Target:**
    - Replace `<ThemeIcon>` with a simple Tailwind `div` wrapper (already mocked in my analysis).
    - Replace `<Collapse>` with a custom `Collapsible` logic or a lightweight library if animation is complex (CSS transition on `max-height` is usually sufficient).
    - Ensure the "rotate chevron" animation remains smooth.

### B. Navbar (`components/Navbar.tsx`)

- **Current State:** Uses `<Group>`, `<Burger>`, and `<Menu>`.
- **Target:**
    - **`<Group>`:** Replace with standard Flexbox (`flex flex-row gap-x`).
    - **`<Burger>`:** Replace with a button containing `<IoMenu>` (closed) / `<IoClose>` (open) from `react-icons/io5`.
    - **`<Menu>`:** Create a custom `Dropdown` component using:
        - `useState` for hover/click state.
        - Absolute positioning for the dropdown list.
        - `useEffect` to handle "click outside" (if we go with click) or simple CSS hover groups (if strictly hover). _Recommendation: Simple CSS hover for desktop is easiest and robust._
        - Ensure dark mode colors match exactly (`dark:bg-gray-700`).

### C. Layout & Providers (`app/layout.tsx`, `components/PageLayout.tsx`)

- Remove `<MantineProvider>`.
- Remove `<ColorSchemeScript>`.
- Ensure `next-themes` handles the `dark` class exclusively (already does, but we need to ensure no "fouc" or flickering without Mantine's script). _Note: `next-themes` handles this well on its own._

## 3. Step-by-Step Execution

1.  **Sidebar Migration:** Refactor `LinksGroup.tsx`.
    - Create a simple "Collapse" transition using Tailwind (e.g., `grid-[0fr]` to `grid-[1fr]` trick or max-height).
2.  **Navbar Migration:** Refactor `Navbar.tsx`.
    - Replace `Group` with `div.flex`.
    - Replace `Burger` with `button > IoMenu`.
    - Replace `Menu` with custom `Dropdown` logic.
3.  **Global Cleanup:**
    - Remove providers from `PageLayout.tsx` and `layout.tsx`.
    - Remove imports from `_app` or globals if any.
4.  **Dependency Removal:**
    - `pnpm remove @mantine/core @mantine/hooks postcss-preset-mantine`.
    - Clean up `postcss.config.js` and `tailwind.config.js` (remove unblur hack if related, though that looks custom).

## 4. Verification

- Check Mobile Sidebar (open/close, nested links).
- Check Desktop Navbar (hover menus, responsiveness).
- Check Dark Mode toggling (ensure no regressions).
- Check build (`pnpm build`) for type errors.
