/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/externalApi/:path*",
        destination: `${
          process.env.NODE_ENV == "production"
            ? process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:5000"
            : "http://localhost:5000"
        }/externalApi/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
