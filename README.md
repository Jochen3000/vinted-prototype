# Vinted Prototype

A clickable Vinted clone built for a UX workshop. The pages are amended and
tested with users, so the goal is to **look and feel like Vinted** — it does not
need to be pixel-perfect or functionally complete.

All data is mocked; there is no backend.

## Tech Stack

- React 18 with hooks
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- lucide-react for icons

## Getting Started

```bash
npm install
npm run dev      # start the Vite dev server at 127.0.0.1:5173
```

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview the production build
```

A `Makefile` wraps the same commands (`make dev`, `make build`, `make preview`).

## Pages / Routes

- `/` and `/catalog` — Search results / catalogue
- `/items/:id` — Item / listing detail
- `/checkout/:id` — Checkout / payment
- `/orders/:id` — Order / transaction detail (post-purchase)

Flow: catalogue → item → Buy now → checkout → Pay → order confirmation.

## Project Structure

- `src/pages/` — page components (PascalCase)
- `src/components/` — shared components
- `src/data/items.js` — mocked items and sellers
- `src/utils/` — helpers
