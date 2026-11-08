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
