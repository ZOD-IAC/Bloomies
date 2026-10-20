import { imageAlt, imageLabel } from "@/lib/product-imagery";
import Link from "next/link";
import Image from "@/components/brand-image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { money } from "@/lib/catalog";
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link className="product-card" href={`/products/${p.slug}`}>
      <div className="product-image" style={{ background: p.color }}>
        <Image
          src={p.images[0]}
          alt={imageAlt(p)}
          width={500}
          height={600}
          style={{ objectPosition: p.imagePosition }}
          sizes="(max-width: 700px) 45vw, 25vw"
        />
        <span className="sample-label">{imageLabel(p)}</span>
        <span className="card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="product-caption">
        <div>
          <p className="eyebrow">{p.category}</p>
          <h3>{p.name}</h3>
        </div>
        <span>
          {money(p.price)}
          <small>sample price</small>
        </span>
      </div>
    </Link>
  );
}
