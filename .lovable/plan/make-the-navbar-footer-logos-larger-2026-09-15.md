# Make the navbar & footer logos larger

## Problem
Both logos load from the Infography table (navbar "top logo", footer "bottom logo") via `DbImage`. Their size is controlled only by the Tailwind height class passed in:

- `Navbar.tsx:39` → `h-12 w-auto` (48px)
- `Footer.tsx:12` → `h-10 w-auto` (40px)

The navbar also caps height at `h-22` (88px, `Navbar.tsx:37`), so a navbar logo taller than ~88px would overflow the bar.

## Plan
Pure styling change — no layout, no Supabase, no `DbImage` logic touched.

1. **Navbar logo** — bump `h-12` → `h-16` (64px). Increase the bar height `h-22` → `h-24` (96px) so the larger logo breathes. Keep links vertically centered (they already are via `items-center`).
2. **Footer logo** — bump `h-10` → `h-16` (64px) to match the navbar.
3. Both keep `w-auto` so aspect ratio is preserved; only height scales.

That's it — two files, four class values. No new components, no image processing.

## Technical details
- `Navbar.tsx`: `h-22`→`h-24` on the `<nav>`, `h-12`→`h-16` on the `DbImage`.
- `Footer.tsx`: `h-10`→`h-16` on the `DbImage`.
- `DbImage.tsx` unchanged — it just forwards `className` to the `<img>`.
