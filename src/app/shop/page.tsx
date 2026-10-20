import { pageMetadata } from "@/lib/seo";
import { catalog } from "@/lib/catalog";
import { Shop } from "@/components/shop";
export const metadata = pageMetadata(
  "Shop handcrafted gift ideas",
  "Explore bouquets, pipe-cleaner flowers, gift boxes, skincare and personalized gift concepts. Filter the Bloomies catalog and inquire on WhatsApp.",
  "/shop",
  { noindex: false },
);
export default async function Page() {
  return (
    <section className="container page-section">
      <p className="eyebrow">THE BLOOMIES GIFT EDIT</p>
      <h1>
        A little something.
        <br />
        <em>A lot of meaning.</em>
      </h1>
      <p className="intro">
        Browse by feeling, find their favourite, and make an inquiry.
      </p>
      <Shop products={await catalog.list()} />
    </section>
  );
}
