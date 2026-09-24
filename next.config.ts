import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // A stray lockfile in the home directory makes Turbopack infer the wrong
  // workspace root (and watch far too much). Pin it to this project.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
