import { test } from "node:test";
import assert from "node:assert/strict";
import { pageMetadata } from "../src/lib/seo.ts";
import { SITE_URL } from "../src/lib/site.ts";
import { productLink, productReference } from "../src/lib/product-reference.ts";
test("route metadata uses the production origin and route-specific canonical URLs", () => {
  const meta = pageMetadata("About", "About the brand", "/about");
  assert.equal(meta.alternates?.canonical, `${SITE_URL}/about`);
  assert.equal(meta.openGraph?.url, `${SITE_URL}/about`);
  assert.ok(meta.twitter && "card" in meta.twitter);
  assert.equal(meta.twitter.card, "summary_large_image");
});
test("private and sample routes can be excluded without blocking discovery links", () => {
  const meta = pageMetadata("Sample", "Sample concept", "/products/gift", {
    noindex: true,
  });
  assert.deepEqual(meta.robots, { index: false, follow: true });
});
test("product links safely encode future catalog slugs", () => {
  assert.equal(productReference({ id: "12" }), "BLM-012");
  assert.equal(
    productLink({ slug: "roses & ribbons" }),
    `${SITE_URL}/products/roses%20%26%20ribbons`,
  );
});
