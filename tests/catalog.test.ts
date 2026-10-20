import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { products, categories } from "../src/data/products.ts";
import { imageLabel, imageAlt } from "../src/lib/product-imagery.ts";
test("catalog routes and cart identities are unique and all categories have products", () => {
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
  for (const c of categories) assert.ok(products.some((p) => p.category === c));
});
test("every catalog image exists in the production public folder", () => {
  for (const p of products)
    for (const image of p.images)
      assert.ok(
        existsSync(new URL("../public" + image, import.meta.url)),
        image,
      );
});
test("AI concepts are labeled accurately and carry no confirmed stock claim", () => {
  const ai = products.filter((p) => p.imageKind === "ai");
  assert.equal(ai.length, 6);
  for (const p of ai) {
    assert.equal(p.availability, "sample");
    assert.equal(imageLabel(p), "AI-GENERATED CONCEPT");
    assert.ok(imageAlt(p).includes("AI-generated"));
    assert.ok(p.price > 0);
  }
});
