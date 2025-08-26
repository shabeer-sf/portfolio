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
      'images.unsplash.com', // Unsplash image domain
      'unsplash.com', // Unsplash direct domain
    ],
  },
 
};
export default nextConfig;