import { catalog } from "@/lib/catalog";
import { Cart } from "@/components/cart";
export const metadata = { title: "Your inquiry bag" };
export default async function Page() {
  return (
    <section className="container page-section">
      <p className="eyebrow">GOOD THOUGHTS, ALL TOGETHER</p>
      <h1>
        Your little <em>bag of happy.</em>
      </h1>
      <Cart products={await catalog.list()} />
    </section>
  );
}
