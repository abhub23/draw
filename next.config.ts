import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Let the bundler process Excalidraw instead of treating it as a prebuilt
  // dependency. Without this, Turbopack can leave the package's async chunks
  // unresolved and the editor never mounts.
  transpilePackages: ['@excalidraw/excalidraw'],
};

export default nextConfig;