import type { MetadataRoute } from "next";
import { categories } from "@/data/products";
import { catalog } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const confirmed = (await catalog.list()).filter(
    (p) => p.availability !== "sample",
  );
  return [
    ...["/", "/shop", "/about", "/contact"].map((path) => ({
      url: absoluteUrl(path),
    })),
    ...categories.map((c) => ({
      url: absoluteUrl(`/collections/${c.toLowerCase().replaceAll(" ", "-")}`),
    })),
    ...confirmed.map((p) => ({ url: absoluteUrl(`/products/${p.slug}`) })),
  ];
}
