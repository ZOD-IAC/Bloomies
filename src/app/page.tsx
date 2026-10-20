import Image from "@/components/brand-image";
import Link from "next/link";
import {
  ArrowUpRight,
  Flower2,
  Heart,
  Gift,
  Sparkles,
  MessageCircle,
  PackageCheck,
} from "lucide-react";
import { catalog } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/motion";
import { Hero } from "@/components/hero";
const collections = [
  {
    name: "Forever in bloom.",
    label: "FLOWERS & BOUQUETS",
    cat: "flowers",
    image: "/images/pink-bouquet.jpeg",
    className: "collection-pink",
    description: "For feelings that don’t fade.",
  },
  {
    name: "A sweet little yes.",
    label: "CHOCOLATE GIFTS",
    cat: "chocolate",
    image: "/images/ai/chocolate-bouquet.webp",
    className: "collection-peach",
    description: "Their sweet spot, beautifully wrapped.",
  },
  {
    name: "Their kind of self-care.",
    label: "SKINCARE BOUQUETS",
    cat: "skincare",
    image: "/images/skincare-bouquet.jpg",
    className: "collection-sage",
    description: "A little care goes a long way.",
  },
  {
    name: "Made personal.",
    label: "PERSONALIZED GIFTS",
    cat: "personalized",
    image: "/images/photo-bouquet.jpg",
    className: "collection-lilac",
    description: "Because nobody else is quite like them.",
  },
];
export default async function Home() {
  const products = await catalog.list();
  return (
    <>
      <Hero />
      <div
        className="marquee"
        aria-label="Thoughtful gifts, handcrafted with love"
      >
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div className="marquee-copy" key={i} aria-hidden={i === 1}>
              <span>small gestures, big feelings</span>
              <span className="marquee-flower">✳</span>
              <span>handcrafted happiness</span>
              <span className="marquee-flower">✳</span>
              <span>made for your favourite humans</span>
              <span className="marquee-flower">✳</span>
            </div>
          ))}
        </div>
      </div>
      <section id="gift-world" className="container section world-section">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> A WORLD OF THOUGHTFUL LITTLE THINGS
            </p>
            <h2>
              What’s their
              <br />
              <em>kind of happy?</em>
              <span className="heading-spark">✳</span>
            </h2>
          </div>
          <div className="heading-aside">
            <p>
              Different people. Different love languages.
              <br />
              There’s a little something for all of them.
            </p>
            <Link href="/shop" className="text-link">
              Explore the gift universe <ArrowUpRight size={17} />
            </Link>
          </div>
        </Reveal>
        <div className="collection-grid">
          {collections.map((c, i) => (
            <Reveal key={c.cat} delay={i * 0.08}>
              <Link
                href={`/collections/${c.cat}`}
                className={`collection-card ${c.className}`}
              >
                <div className="collection-image">
                  <Image
                    src={c.image}
                    alt={`${c.label.toLowerCase()} — supplied reference or AI-generated concept`}
                    fill
                    sizes="(max-width:700px) 45vw, 25vw"
                  />
                  <span className="collection-number">0{i + 1}</span>
                  <span className="collection-round-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
                <div className="collection-copy">
                  <p className="eyebrow">{c.label}</p>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="collection-extra">
          <Link href="/collections/soft-toys">
            Soft-toy gifts <Heart size={14} />
          </Link>
          <Link href="/collections/gift-boxes">
            Gift boxes <Gift size={14} />
          </Link>
          <span>
            AI concepts & supplied references · catalog details awaiting
            confirmation
          </span>
        </div>
      </section>
      <section className="featured-section">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">
                <span /> LITTLE THINGS, LOVINGLY PICKED
              </p>
              <h2>
                Meet your next
                <br />
                <em>“this is so them.”</em>
              </h2>
            </div>
            <Link className="button button-outline" href="/shop">
              See the full edit <ArrowUpRight size={18} />
            </Link>
          </Reveal>
          <div className="product-grid">
            {[products[8], products[2], products[4], products[10]].map(
              (p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <ProductCard product={p} />
                </Reveal>
              ),
            )}
          </div>
          <p className="catalog-disclaimer">
            A preview, not a promise: illustrative prices and options. Supplied
            photos may be inspiration references. Confirm the actual item on
            WhatsApp.
          </p>
        </div>
      </section>
      <section className="container section feeling-section">
        <Reveal className="feeling-visual">
          <div className="feeling-photo">
            <Image
              src="/images/pink-bouquet.jpeg"
              alt="Supplied reference of a pink handmade bouquet"
              fill
              sizes="(max-width:700px) 85vw, 45vw"
            />
          </div>
          <div className="feeling-sticker">
            <Heart size={22} />
            <span>
              more thought.
              <br />
              <em>more feeling.</em>
            </span>
          </div>
          <span className="feeling-caption">
            a bouquet of “I thought of you.”
          </span>
        </Reveal>
        <Reveal className="feeling-copy">
          <p className="eyebrow">
            <span /> THE THOUGHT IS THE WHOLE POINT
          </p>
          <h2>
            Some gifts say thanks.
            <br />
            The best ones say
            <br />
            <em>“I get you.”</em>
          </h2>
          <p>
            Their favourite colour. A memory only you share. A tiny detail that
            makes it unmistakably theirs.
          </p>
          <p>
            At Bloomies by Aadar, that’s where a thoughtful gift begins. With a
            person in mind, and a little love in every detail.
          </p>
          <Link className="text-link" href="/about">
            The heart behind Bloomies <ArrowUpRight size={18} />
          </Link>
          <div className="feeling-values">
            <span>
              <Flower2 size={21} /> Handcrafted details
            </span>
            <span>
              <Heart size={21} /> Personal touches
            </span>
            <span>
              <Sparkles size={21} /> Thoughtful ideas
            </span>
          </div>
        </Reveal>
      </section>
      <section className="how-section container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> FROM A LITTLE IDEA TO A BIG SMILE
            </p>
            <h2>
              A thoughtful gift.
              <br />
              <em>Without the guesswork.</em>
            </h2>
          </div>
          <span className="handwritten">
            you bring the feeling.
            <br />
            we’ll talk about the details.
          </span>
        </Reveal>
        <div className="steps-grid">
          {[
            {
              n: "01",
              icon: Gift,
              title: "Find their little thing.",
              text: "Explore the gift edit. Save the concepts that feel like your person.",
            },
            {
              n: "02",
              icon: MessageCircle,
              title: "Make it their own.",
              text: "Add a wrap, a name, a note. Send your ideas as a WhatsApp inquiry.",
            },
            {
              n: "03",
              icon: PackageCheck,
              title: "Confirm it together.",
              text: "Discuss the real item, price, availability and delivery before placing an order.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="step-card">
              <div className="step-top">
                <s.icon size={23} strokeWidth={1.4} />
                <span>{s.n}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="custom-section">
        <Reveal className="container custom-inner">
          <span className="custom-flower" aria-hidden="true">
            ✿
          </span>
          <p className="eyebrow">A COLOUR. A MEMORY. A VERY SPECIFIC PERSON.</p>
          <h2>
            Got a little
            <br />
            <em>something in mind?</em>
          </h2>
          <p>Tell us about them. Let’s start with your idea.</p>
          <Link className="button button-primary" href="/contact">
            Let’s make it personal <ArrowUpRight size={19} />
          </Link>
          <Link className="custom-builder-link" href="/custom-bouquet">
            The custom bouquet builder is growing. Coming soon{" "}
            <ArrowUpRight size={14} />
          </Link>
          <span className="custom-flower flower-right" aria-hidden="true">
            ✳
          </span>
        </Reveal>
      </section>
    </>
  );
}
