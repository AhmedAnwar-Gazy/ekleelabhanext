// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // تعطيل Turbopack مؤقتًا لتفادي مشكلة الخطوط
  },
};

export default nextConfig;
