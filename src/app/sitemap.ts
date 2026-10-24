import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://ocms.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/marketplace/`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}
