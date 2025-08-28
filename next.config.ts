import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/proxy/:path*", // 前端请求 /proxy/xxx
        destination: process.env.API_URL + "/:path*", // 实际代理到 API
      },
    ];
  },
};

export default nextConfig;
