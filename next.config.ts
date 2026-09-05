import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["firebase-admin", "@google-cloud/firestore", "google-auth-library", "google-gax"],
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  async redirects() {
    return [{ source: "/drops", destination: "/work", permanent: true }];
  },
};

export default nextConfig;
