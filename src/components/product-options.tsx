"use client";
import { useRef, useState } from "react";
import { Check, ShoppingBag, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "./cart-provider";
import { Button } from "./ui/button";
import Link from "next/link";

export function ProductOptions({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedSelection, setAddedSelection] = useState<string | null>(null);
  const lastSubmission = useRef<string | null>(null);
  const { add, ready } = useCart();
  const selection = JSON.stringify([
    product.id,
    variant,
    note.trim(),
    quantity,
  ]);
  const added = addedSelection === selection;
  return (
    <form
      className="options"
      onSubmit={(event) => {
        event.preventDefault();
        if (
          !ready ||
          product.availability === "unavailable" ||
          lastSubmission.current === selection ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          quantity > 99
        )
          return;
        // Synchronous guard also catches repeat submits before React paints the success state.
        lastSubmission.current = selection;
        add({
          productId: product.id,
          variant,
          personalization: note.trim(),
          quantity,
        });
        setAddedSelection(selection);
      }}
    >
      <label>
        Choose your wrap
        <select
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
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
            onChange={(event) => setNote(event.target.value)}
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
          step="1"
          required
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </label>
      <Button
        className={added ? "button-added" : ""}
        disabled={!ready || product.availability === "unavailable" || added}
      >
        {added ? (
          <>
            <Check size={19} aria-hidden="true" /> Added to inquiry bag
          </>
        ) : (
          <>
            <ShoppingBag size={18} aria-hidden="true" /> Add to inquiry bag{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </>
        )}
      </Button>
      <div
        className={added ? "add-feedback add-feedback-success" : "add-feedback"}
      >
        <p role="status" aria-live="polite" aria-atomic="true">
          {added
            ? `${quantity} × ${product.name} added to your inquiry bag.`
            : "No payment now. Final details confirmed personally."}
        </p>
        {added && (
          <div className="add-feedback-actions">
            <Link href="/cart" className="button button-primary">
              View inquiry bag <ArrowUpRight size={16} />
            </Link>
            <button
              type="button"
              className="add-another"
              onClick={() => {
                lastSubmission.current = null;
                setAddedSelection(null);
              }}
            >
              Add more of this gift
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
