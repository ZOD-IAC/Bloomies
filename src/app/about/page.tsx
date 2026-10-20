import Link from "next/link";
export const metadata = { title: "Our story" };
export default function Page() {
  return (
    <section className="container page-section about-page">
      <p className="eyebrow">HELLO, WE’RE BLOOMIES BY AADAR</p>
      <h1>
        For the people
        <br />
        who mean <em>a little more.</em>
      </h1>
      <div className="about-art">
        ✿{" "}
        <span>
          It’s the thought.
          <br />
          <em>Always the thought.</em>
        </span>{" "}
        ✳
      </div>
      <div className="prose">
        <h2>A thoughtful little world of gifting.</h2>
        <p>
          Bloomies by Aadar creates handcrafted and customized gifts: bouquets,
          pipe-cleaner flowers, chocolate and skincare bouquets, soft-toy gifts,
          gift boxes and personalized pieces.
        </p>
        <p>
          This storefront is a place to explore ideas and begin a conversation.
          Choose a concept, add your personal touches, and inquire about making
          it yours.
        </p>
        <p>
          We’re still gathering the real catalog and the story behind the brand.
          Supplied photographs are treated as inspiration references. Product
          illustrations, example prices and customization options shown here are
          samples.
        </p>
        <Link href="/shop" className="button button-primary">
          Find your little something ↗
        </Link>
      </div>
    </section>
  );
}
