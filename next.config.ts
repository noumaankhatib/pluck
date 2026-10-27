import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // The separate pages were merged into the single-page homepage; keep old links working.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/disciplines", destination: "/#disciplines", permanent: true },
      { source: "/how-we-work", destination: "/#how-we-work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
