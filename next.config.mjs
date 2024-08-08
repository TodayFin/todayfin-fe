/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    loader: "custom",
    loaderFile: "./custom-image-loader.js",
  },
};

export default nextConfig;
