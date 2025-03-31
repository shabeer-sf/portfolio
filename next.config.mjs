/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("ssh2");
    }
    return config;
  },
  images: {
    domains: [
      'images.pexels.com', // Pexels image domain
    ],
  },
  // Add dynamic route configuration - prevent static generation for admin routes
  experimental: {
    // This makes pages in /admin directory be rendered dynamically
    // instead of statically at build time
    serverActions: true,
  },
};

export default nextConfig;