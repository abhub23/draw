'use client';

import dynamic from 'next/dynamic';

/**
 * Excalidraw's bundle reads `window` at module-evaluation time, so it cannot be
 * imported during server rendering. `next/dynamic` with `ssr: false` defers the
 * import until after hydration, so it only ever evaluates in the browser.
 *
 * This has to be a Client Component — `ssr: false` is not allowed in a Server
 * Component.
 */
const Excalidraw = dynamic(() => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>Loading canvas…</p>
    </div>
  ),
});

export default function ExcalidrawBoard() {
  /**
   * Excalidraw fills 100% of its containing block, so the wrapper has to have
   * non-zero dimensions.
   *
   * `position: fixed` + `inset: 0` sizes it to the viewport and takes it out of
   * normal document flow. Viewport units are deliberately avoided: `100vw`
   * includes the classic scrollbar gutter, so a vertical scrollbar would widen
   * the box past the visible area and produce a horizontal one too.
   */
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <Excalidraw />
    </div>
  );
}