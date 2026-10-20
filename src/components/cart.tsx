"use client";
import { business } from "@/lib/business";
import Image from "@/components/brand-image";
import Link from "next/link";
import { useCart } from "./cart-provider";
import type { Product } from "@/types/product";
import { money } from "@/lib/catalog";
import { checkoutMessage, whatsappUrl } from "@/lib/checkout";
import { Trash2, ArrowUpRight } from "lucide-react";
export function Cart({ products }: { products: Product[] }) {
  const { items, quantity, remove, ready } = useCart();
  if (!ready) return <p role="status">Loading your bag…</p>;
  if (!items.length)
    return (
      <div className="empty">
        <h2>A little room for joy.</h2>
        <p>Your bag is empty. Find something that feels like them.</p>
        <Link className="button button-primary" href="/shop">
          Explore gifts <ArrowUpRight size={18} />
        </Link>
      </div>
    );
  const total = items.reduce(
    (s, x) =>
      s + (products.find((p) => p.id === x.productId)?.price || 0) * x.quantity,
    0,
  );
  const message = checkoutMessage(items, products);
  const url = whatsappUrl(business.whatsapp, message);
  return (
    <div className="cart-layout">
      <div>
        {items.map((item, i) => {
          const p = products.find((p) => p.id === item.productId);
          return (
            <article className="cart-item" key={`${item.productId}-${i}`}>
              {p ? (
                <>
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    width={110}
                    height={132}
                  />
                  <div>
                    <Link href={`/products/${p.slug}`}>
                      <h3>{p.name}</h3>
                    </Link>
                    <p>{item.variant}</p>
                    {item.personalization && (
                      <p className="note">Note: {item.personalization}</p>
                    )}
                    <label>
                      Qty{" "}
                      <input
                        aria-label={`Quantity for ${p.name}`}
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) =>
                          quantity(i, Number(e.target.value) || 1)
                        }
                      />
                    </label>
                  </div>
                  <strong>{money(p.price * item.quantity)}</strong>
                </>
              ) : (
                <p>This sample is no longer in the catalog.</p>
              )}
              <button
                aria-label={`Remove ${p?.name || "item"}`}
                onClick={() => remove(i)}
              >
                <Trash2 size={18} />
              </button>
            </article>
          );
        })}
      </div>
      <aside className="summary">
        <p className="eyebrow">A THOUGHTFUL LITTLE INQUIRY</p>
        <h2>Your gift edit.</h2>
        <div className="total">
          <span>Estimated sample total</span>
          <strong>{money(total)}</strong>
        </div>
        <p>
          Sample pricing only. Availability, delivery charges, customization and
          final price require confirmation. This is an inquiry, not a completed
          purchase.
        </p>
        {url ? (
          <a
            className="button button-primary"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Inquire on WhatsApp <ArrowUpRight size={18} />
          </a>
        ) : (
          <p className="notice">
            WhatsApp checkout is not configured. A verified business number is
            required. You can copy your inquiry below.
          </p>
        )}
        <button
          className="button button-outline"
          onClick={async (e) => {
            const button = e.currentTarget;
            try {
              await navigator.clipboard.writeText(message);
              button.textContent = "Inquiry copied";
            } catch {
              button.textContent = "Copy unavailable — select text below";
            }
          }}
        >
          Copy inquiry
        </button>
        <details>
          <summary>Preview inquiry</summary>
          <pre>{message}</pre>
        </details>
      </aside>
    </div>
  );
}
