/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'people.pic1.co',
      },
      {
        protocol: 'https',
        hostname: 'app-uploads-cdn.fera.ai',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.printblur.com',
      },
      {
        protocol: 'https',
        hostname: 'https://oaidalleapiprodscus.blob.core.windows.net',
      },
    ],
  },
};

export default nextConfig;
