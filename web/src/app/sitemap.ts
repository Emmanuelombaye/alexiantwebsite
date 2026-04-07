import type { MetadataRoute } from "next";
import { listProperties } from "@/lib/properties/service";
import { listBlogPosts } from "@/lib/blog/service";
import { toDate } from "@/lib/seo/dates";

const BASE_URL = "https://alexiantrealestate.co.ke";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, posts] = await Promise.all([
    listProperties(),
    listBlogPosts()
  ]);

  const rawStaticRoutes = [
    { path: "", freq: "weekly", priority: 1.0 },
    { path: "/properties", freq: "daily", priority: 0.9 },
    { path: "/about", freq: "monthly", priority: 0.7 },
    { path: "/services", freq: "monthly", priority: 0.7 },
    { path: "/contact", freq: "monthly", priority: 0.8 },
    { path: "/agencies", freq: "monthly", priority: 0.6 },
    { path: "/valuation", freq: "monthly", priority: 0.8 },
    { path: "/neighborhoods", freq: "weekly", priority: 0.8 },
    { path: "/blog", freq: "daily", priority: 0.9 },
    { path: "/plots-for-sale-diani", freq: "daily", priority: 0.9 },
    { path: "/houses-for-sale-ukunda", freq: "daily", priority: 0.9 },
    { path: "/beachfront-property-diani", freq: "daily", priority: 0.9 },
    { path: "/land-for-sale-kwale", freq: "daily", priority: 0.9 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = rawStaticRoutes.map(route => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq as "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never",
    priority: route.priority,
  }));

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${BASE_URL}/properties/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: property.featured ? 0.9 : 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: toDate(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
