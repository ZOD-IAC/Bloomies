"use client";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "./cart-provider";
import { Button } from "./ui/button";
import Link from "next/link";
export function ProductOptions({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add, ready } = useCart();
  return (
    <form
      className="options"
      onSubmit={(e) => {
        e.preventDefault();
        add({
          productId: product.id,
          variant,
          personalization: note.trim(),
          quantity,
        });
        setAdded(true);
      }}
    >
      <label>
        Choose your wrap
        <select
          value={variant}
          onChange={(e) => {
            setVariant(e.target.value);
            setAdded(false);
          }}
        >
          {product.variants.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>
      {product.personalization && (
        <label>
          Make it personal <span>(optional)</span>
          <textarea
            maxLength={250}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setAdded(false);
            }}
            placeholder="A name, a note, a little something special…"
          />
          <small>{note.length}/250</small>
        </label>
      )}
      <label>
        Quantity
        <input
          type="number"
          min="1"
          max="99"
          required
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
            setAdded(false);
          }}
        />
      </label>
      <Button disabled={!ready || product.availability === "unavailable"}>
        Add to inquiry bag ↗
      </Button>
      <p role="status">
        {added ? (
          <>
            Added to your bag. <Link href="/cart">View bag →</Link>
          </>
        ) : (
          "No payment now. Final details confirmed personally."
        )}
      </p>
    </form>
  );
}
