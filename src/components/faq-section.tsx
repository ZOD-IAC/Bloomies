import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Reveal } from "@/components/motion";
export function FaqSection() {
  return (
    <section
      id="faq"
      className="container faq-section"
      aria-labelledby="faq-heading"
    >
      <Reveal className="faq-intro">
        <p className="eyebrow">
          <span /> A FEW LITTLE ANSWERS
        </p>
        <h2 id="faq-heading">
          Wondering about
          <br />
          <em>the details?</em>
        </h2>
        <p>Here’s how to turn a gift idea into a conversation with Bloomies.</p>
        <Link href="/contact" className="text-link">
          Ask us something else <ArrowUpRight size={17} />
        </Link>
      </Reveal>
      <Reveal className="faq-list">
        {faqs.map((faq, i) => (
          <details key={faq.question} className="faq-item">
            <summary>
              <span className="faq-number">0{i + 1}</span>
              <span>{faq.question}</span>
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
