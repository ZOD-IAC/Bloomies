import { notFound } from "next/navigation";
import { categories } from "@/data/products";
import { catalog } from "@/lib/catalog";
import { Shop } from "@/components/shop";
export function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.toLowerCase().replaceAll(" ", "-"),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return { title: (await params).slug.replaceAll("-", " ") };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find(
    (c) => c.toLowerCase().replaceAll(" ", "-") === slug,
  );
  if (!category) notFound();
  return (
    <section className="container page-section">
      <p className="eyebrow">A CURATED LITTLE CORNER</p>
      <h1>
        The <em>{category.toLowerCase()} edit.</em>
      </h1>
      <p className="intro">
        A starting point for something thoughtful. Sample concepts, ready to
        explore.
      </p>
      <Shop products={await catalog.list()} initialCategory={category} />
    </section>
  );
}
