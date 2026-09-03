/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Custom domain (sridharmalladi.online) serves at root -> no basePath/assetPrefix.
  // To move to a project page instead, set basePath/assetPrefix to "/<repo>".
  reactStrictMode: true,
};

export default nextConfig;
