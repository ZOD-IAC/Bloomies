import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container page-section empty">
      <p className="eyebrow">A LITTLE LOST?</p>
      <h1>This bloom isn’t here.</h1>
      <Link className="button button-primary" href="/shop">
        Back to the gift edit ↗
      </Link>
    </section>
  );
}
