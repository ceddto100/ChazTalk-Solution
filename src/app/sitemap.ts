import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { solutions } from "@/content/solutions";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/pricing",
    "/integrations",
    "/security",
    "/blog",
    "/contact",
  ];
  const items: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
  for (const s of solutions) {
    items.push({
      url: `${SITE_URL}/solutions/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  for (const p of posts) {
    items.push({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  return items;
}
