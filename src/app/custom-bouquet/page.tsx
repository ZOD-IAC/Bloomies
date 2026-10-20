import Link from "next/link";
export const metadata = { title: "Custom bouquet builder — coming soon" };
export default function Page() {
  return (
    <section className="container page-section coming-soon">
      <span className="large-flower">✿</span>
      <p className="eyebrow">A LITTLE SOMETHING IS GROWING</p>
      <h1>
        Your imagination.
        <br />
        <em>In full bloom.</em>
      </h1>
      <p className="intro">
        Our custom bouquet builder is coming soon. Pick-your-own stems, colours
        and finishing touches are still on the drawing board.
      </p>
      <Link href="/contact" className="button button-primary">
        Discuss a custom idea ↗
      </Link>
      <Link href="/shop" className="text-link">
        Explore the gift edit
      </Link>
    </section>
  );
}
