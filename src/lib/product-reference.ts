import type { Product } from "@/types/product";
import { absoluteUrl } from "./site.ts";
export function productReference(product: Pick<Product, "id">) {
  return `BLM-${product.id.padStart(3, "0")}`;
}
export function productLink(product: Pick<Product, "slug">) {
  return absoluteUrl(`/products/${encodeURIComponent(product.slug)}`);
}
