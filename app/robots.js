export default function robots() {
  const baseUrl = "https://your-domain.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard"], // 👈 ممنوع تفهرس صفحات الإدارة
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
