import { products } from "@/data/products";
// Replace this adapter with CMS calls; pages depend only on this interface.
export const catalog = {
  async list() {
    return products;
  },
  async bySlug(slug: string) {
    return products.find((p) => p.slug === slug);
  },
  async byCategory(category: string) {
    return products.filter(
      (p) => p.category.toLowerCase().replaceAll(" ", "-") === category,
    );
  },
};
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
