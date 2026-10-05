import type { NextConfig } from "next";

const wpHost = process.env.WORDPRESS_MEDIA_HOST; // e.g. cms.pineapplegrowersgh.org

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wpHost ? [{ protocol: "https", hostname: wpHost, pathname: "/wp-content/uploads/**" }] : [],
  },
};

export default nextConfig;
