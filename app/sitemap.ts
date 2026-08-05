import type { MetadataRoute } from "next";

/* ⚠️ غيّر الدومين هنا لدومينك الفعلي بعد الشراء */
const SITE_URL = "https://alamelroum-qataridiar.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
