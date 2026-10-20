import type { Product } from "@/types/product";
export function imageLabel(product: Product) {
  return product.imageKind === "ai"
    ? "AI-GENERATED CONCEPT"
    : product.imageKind === "reference"
      ? "INSPIRATION REFERENCE"
      : "SAMPLE ILLUSTRATION";
}
export function imageAlt(product: Product) {
  return `${product.imageKind === "ai" ? "AI-generated concept image" : product.imageKind === "reference" ? "Owner-supplied inspiration reference" : "Sample illustration"} for ${product.name}`;
}
