# Draw

A drawing canvas built with [Next.js](https://nextjs.org) and
[Excalidraw](https://excalidraw.com).

| Route   | What it is                                       |
| ------- | ------------------------------------------------ |
| `/`     | The Excalidraw editor (default)                   |
| `/draw` | The original hand-rolled canvas app, kept as-is  |

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `bun run dev`       | Start the dev server (Turbopack)      |
| `bun run build`     | Production build                      |
| `bun run start`     | Serve the production build            |
| `bun run lint`      | ESLint                               |
| `bun run typecheck` | `tsc --noEmit`                        |
| `bun run check`     | lint + typecheck                      |
| `bun run fmt`       | Prettier, with Tailwind class sorting |

A pre-commit hook runs the checks automatically.

## How the Excalidraw integration works

Excalidraw reads `window` at module-evaluation time, so importing it during server rendering
throws `ReferenceError: window is not defined`. `components/ExcalidrawBoard.tsx` is a Client
Component that loads the editor through `next/dynamic` with `ssr: false`. That defers evaluation
until after hydration and keeps Excalidraw out of the server bundle — the `/` route ships under
2 kB of its own code, with the editor as a separate async chunk.

Three details that are easy to get wrong:

- **The wrapper must have non-zero dimensions.** Excalidraw takes 100% of its containing block.
  `components/ExcalidrawBoard.tsx` uses `position: fixed; inset: 0`, which also avoids `100vw` —
  viewport units include the scrollbar gutter and produce scrollbars on both axes.
- **The stylesheet has to be imported** (`@excalidraw/excalidraw/index.css`, in `app/layout.tsx`,
  after `globals.css` so its rules beat Tailwind's preflight reset). Without it the editor renders
  unstyled.
- **`transpilePackages`** in `next.config.ts` makes Turbopack compile the package instead of
  treating it as prebuilt.

## Notes

- Excalidraw saves to `localStorage` under `excalidraw-state`, so reloads keep your work. Use the
  **Share** button to turn a drawing into a link.
- The canvas is pinned to the viewport and the page does not scroll.