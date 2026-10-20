import { owner } from "@/data/owner";
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
          from <em>{owner.firstName}.</em>
        </h2>
        <div className="owner-identity">
          <h3>{owner.name}</h3>
          <p>{owner.role}</p>
        </div>
        <p>{owner.introduction}</p>
        <p>{owner.invitation}</p>
        <Link className="button button-primary" href="/contact">
          Let’s talk about your gift <ArrowUpRight size={18} />
        </Link>
      </Reveal>
    </section>
  );
}
