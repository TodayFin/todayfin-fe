/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./custom-image-loader.js",
  },
};

export default nextConfig;
