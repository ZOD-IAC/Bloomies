import { ContactForm } from "@/components/contact-form";
export const metadata = { title: "Say hello" };
export default function Page() {
  return (
    <section className="container page-section contact-layout">
      <div>
        <p className="eyebrow">LET’S MAKE SOMEONE’S DAY</p>
        <h1>
          Good gifts start
          <br />
          with <em>a little hello.</em>
        </h1>
        <p className="intro">
          A custom idea, a question, or a gift you can’t quite put into words?
          Tell us what you have in mind.
        </p>
        <a
          className="text-link"
          href="https://www.instagram.com/bloomies_by_aadar"
          target="_blank"
          rel="noreferrer"
        >
          @bloomies_by_aadar ↗
        </a>
        <a
          className="text-link"
          style={{
            display: "flex",
            width: "max-content",
            marginTop: 20,
            fontVariantNumeric: "tabular-nums",
          }}
          href="https://wa.me/918527246489"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp · +91 85272 46489 ↗
        </a>
        <p className="sample-note">
          Please avoid sharing sensitive or payment information. An inquiry does
          not confirm an order.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
