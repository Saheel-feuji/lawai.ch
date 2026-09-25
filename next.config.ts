import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → deploy the `out/` folder to any web host (no Node server needed).
  output: "export",
  // /kurse → /kurse/index.html, which works on every Apache/nginx host without rewrites.
  trailingSlash: true,
  images: {
    // A static export has no image optimizer, so a small custom loader builds
    // responsive URLs for the Unsplash placeholders and serves local photos as-is.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    qualities: [75],
  },
};

export default nextConfig;
