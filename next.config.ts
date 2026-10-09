import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // A stray lockfile in the home directory makes Turbopack infer the wrong
  // workspace root (and watch far too much). Pin it to this project.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // The commercial version (with pricing) was removed on 09/10. Old links
  // land on the presentation instead of a 404.
  async redirects() {
    return [
      { source: "/", destination: "/mitang", permanent: false },
      { source: "/mitang/proposta", destination: "/mitang", permanent: false },
    ];
  },
};

export default nextConfig;
