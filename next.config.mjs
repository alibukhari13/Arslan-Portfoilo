/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/framer-home/index.html" },
        { source: "/about", destination: "/framer-about/index.html" },
        { source: "/projects", destination: "/framer-projects/index.html" },
        { source: "/projects/:slug", destination: "/framer-project/index.html" },
        { source: "/contact", destination: "/framer-contact/index.html" },
      ],
    };
  },
  async headers() {
    const year = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    const day = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    const dirs = ["framer-home", "framer-about", "framer-projects", "framer-contact", "framer-project"];
    const kinds = ["images", "js", "media", "fonts"];
    return [
      ...dirs.flatMap((dir) => kinds.map((kind) => ({ source: `/${dir}/${kind}/:path*`, headers: year }))),
      { source: "/work/:path*", headers: day },
      { source: "/certificates/:path*", headers: day },
      { source: "/fonts/:path*", headers: year },
      { source: "/chrome/:path*", headers: day },
      { source: "/favicon.svg", headers: day },
      { source: "/arslan.jpg", headers: day },
    ];
  },
  async redirects() {
    return [
      { source: "/projects/ai-habit-fitness-tracker-app", destination: "/projects/todo-task-app", permanent: false },
      { source: "/projects/fintech-ai-mobile-wallet-app", destination: "/projects/nexpay", permanent: false },
      { source: "/projects/food-delivery-app-design", destination: "/projects/food-delivery-app", permanent: false },
      { source: "/projects/3d-ai-builder-platform", destination: "/projects/vaultex", permanent: false },
      { source: "/projects/music-player-streaming-app", destination: "/projects/portfolio-landing", permanent: false },
    ];
  },
};

export default nextConfig;
