import { test } from "node:test";
import assert from "node:assert/strict";
import { checkoutMessage, whatsappUrl } from "../src/lib/checkout.ts";
import type { Product } from "../src/types/product.ts";
const p: Product = {
  id: "1",
  slug: "gift",
  name: "Lavender & love",
  category: "Flowers",
  description: "Sample",
  price: 850,
  availability: "sample",
  images: [],
  variants: ["Ribbon wrap"],
  personalization: true,
  color: "#fff",
};
test("inquiry preserves selected options, quantities, special characters and totals", () => {
  const message = checkoutMessage(
    [
      {
        productId: "1",
        quantity: 2,
        variant: "Ribbon wrap",
        personalization: "For A & B 💜\nHappy day!",
      },
    ],
    [p],
  );
  assert.ok(
    message.includes("× 2 | Ribbon wrap | Note: For A & B 💜\nHappy day!"),
  );
  assert.ok(message.includes("₹1700"));
  assert.ok(message.includes("not a completed purchase"));
  const url = whatsappUrl("919876543210", message);
  assert.equal(new URL(url!).searchParams.get("text"), message);
});
test("unconfigured or malformed phone number never produces a checkout link", () => {
  for (const n of ["", "+91 123", "0123456789", "abc"])
    assert.equal(whatsappUrl(n, "hello"), null);
});
test("multiple cart lines sum correctly", () => {
  assert.ok(
    checkoutMessage(
      [
        {
          productId: "1",
          quantity: 1,
          variant: "Classic",
          personalization: "",
        },
        {
          productId: "1",
          quantity: 3,
          variant: "Ribbon",
          personalization: "Name",
        },
      ],
      [p],
    ).includes("₹3400"),
  );
});

test("AI product inquiries explicitly require final-design confirmation", () => {
  const ai = { ...p, imageKind: "ai" as const };
  const message = checkoutMessage(
    [
      {
        productId: "1",
        quantity: 1,
        variant: "Ribbon wrap",
        personalization: "",
      },
    ],
    [ai],
  );
  assert.ok(message.includes("AI concept — final design to confirm"));
});
