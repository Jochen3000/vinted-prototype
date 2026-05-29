# Vinted Prototype

A clickable Vinted clone built for a UX workshop. People amend these pages and
test them with users, so it should **look and feel like Vinted** — it does not
need to be pixel-perfect or functionally complete.

## Tech Stack

- React 18 with hooks
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- lucide-react for icons

All data is mocked — there is no backend.

## Code Style

- Minimal comments — code should be self-documenting
- Simple over clever
- Functional components and hooks
- Prettier with 80-char print width

## File Structure

- Pages in `/src/pages/` (PascalCase)
- Shared components in `/src/components/`
- Mock data and sellers in `/src/data/items.js`
- Helpers in `/src/utils/`

## Pages / Routes

- `/` and `/catalog` — Search results / catalogue (`Catalogue.jsx`)
- `/items/:id` — Item / listing detail (`ItemDetail.jsx`)
- `/checkout/:id` — Checkout / payment (`Checkout.jsx`)
- `/orders/:id` — Order / transaction detail, post-purchase (`OrderDetail.jsx`)

Flow: catalogue → item → Buy now → checkout → Pay → order confirmation.

## Development

```bash
npm run dev      # start Vite dev server (127.0.0.1:5173)
npm run build    # production build
```

## Reference capture

`scripts/capture-reference.mjs` uses Playwright to screenshot live Vinted pages
into `scripts/reference/` (gitignored) for design reference.
