import { OwnerPortrait } from "@/components/owner-portrait";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { Reveal } from "@/components/motion";

export function OwnerSection() {
  return (
    <section
      className="container owner-section"
      aria-labelledby="owner-heading"
    >
      <Reveal className="owner-portrait-panel">
        <OwnerPortrait />
        <div className="owner-photo-caption">
          <span>the person behind bloomies</span>
          <Heart size={17} aria-hidden="true" />
        </div>
        <span className="owner-flower" aria-hidden="true">
          ✿
        </span>
      </Reveal>
      <Reveal className="owner-copy" delay={0.1}>
        <p className="eyebrow">
          <span /> MEET THE OWNER
        </p>
        <h2 id="owner-heading">
          A little hello
          <br />
          from <em>Arpita.</em>
        </h2>
        <div className="owner-identity">
          <h3>Arpita Prajapati</h3>
          <p>Owner · Bloomies by Aadar</p>
        </div>
        <p>
          Behind Bloomies by Aadar is Arpita Prajapati — the person to talk to
          about your next thoughtful gift.
        </p>
        <p>
          Have a favourite colour, a personal message, or a very specific
          occasion in mind? Start with your idea and discuss the details
          together.
        </p>
        <Link className="button button-primary" href="/contact">
          Let’s talk about your gift <ArrowUpRight size={18} />
        </Link>
      </Reveal>
    </section>
  );
}
