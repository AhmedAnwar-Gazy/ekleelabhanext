import { products } from "@/data/products";
import { brands } from "@/data/brands";

export default async function sitemap() {
  const baseUrl = "https://ekleel-abha.com";

  // روابط المنتجات
  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // روابط البراندات
  const allBrands = Object.values(brands).flat();
  const brandUrls = allBrands.map((b) => ({
    url: `${baseUrl}/brands/${b.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productUrls,
    ...brandUrls,
  ];
}
