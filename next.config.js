const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ['res.cloudinary.com'],
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
