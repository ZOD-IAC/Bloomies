import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "@/components/brand-image";
import { catalog, money } from "@/lib/catalog";
import { ProductOptions } from "@/components/product-options";
import { ProductCard } from "@/components/product-card";
export async function generateStaticParams() {
  return (await catalog.list()).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await catalog.bySlug((await params).slug);
  return { title: p?.name || "Gift not found", description: p?.description };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await catalog.bySlug((await params).slug);
  if (!p) notFound();
  return (
    <section className="container page-section">
      <div className="breadcrumb">
        <Link href="/shop">Shop</Link> / {p.category} / {p.name}
      </div>
      <div className="product-detail">
        <div className="detail-image">
          <Image
            src={p.images[0]}
            alt={`${p.imageKind === "reference" ? "Supplied inspiration reference" : "Sample illustration"} for ${p.name}`}
            sizes="(max-width:700px) 90vw, 50vw"
            width={500}
            height={600}
            priority
          />
        </div>
        <div>
          <p className="eyebrow">{p.category} · SAMPLE CONCEPT</p>
          <h1>{p.name}</h1>
          <p className="detail-price">
            {money(p.price)} <small>illustrative price</small>
          </p>
          <p className="intro">{p.description}</p>
          <p className="notice">
            Sample catalog item. Supplied photos are inspiration references and
            may include third-party branding. Price, availability, contents and
            options are awaiting confirmation. No stock claim is made.
          </p>
          <ProductOptions product={p} />
          <details>
            <summary>Before you inquire</summary>
            <p>
              Share your preferred date, location and customization requests.
              Bloomies must confirm the final product details, availability,
              delivery arrangements and total before an order is accepted.
            </p>
          </details>
        </div>
      </div>
      <div className="section-heading section">
        <h2>
          A little more <em>to love.</em>
        </h2>
        <Link href="/shop">All gifts ↗</Link>
      </div>
      <div className="product-grid">
        {(await catalog.list())
          .filter((x) => x.id !== p.id)
          .slice(0, 4)
          .map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
      </div>
    </section>
  );
}
