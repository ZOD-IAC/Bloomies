"use client";
import { business } from "@/lib/business";
import { useState } from "react";
import { Button } from "./ui/button";
export function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const key = business.web3formsKey;
  return (
    <form
      className="contact-form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!key) {
          setStatus(
            "The inquiry form is awaiting configuration. Please contact Bloomies through Instagram.",
          );
          return;
        }
        setBusy(true);
        setStatus("");
        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("access_key", key);
        try {
          const r = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: data,
          });
          const body = await r.json();
          if (!r.ok || !body.success) throw new Error();
          form.reset();
          setStatus(
            "Thank you — your inquiry has been sent. This does not confirm an order.",
          );
        } catch {
          setStatus(
            "Your inquiry could not be sent. Please try again or reach out through Instagram.",
          );
        } finally {
          setBusy(false);
        }
      }}
    >
      <label>
        Your name
        <input name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        Email address
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>
      <label>
        What are you dreaming of?
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          placeholder="The occasion, your ideas, and any details you’d like to share…"
        />
      </label>
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />
      <input type="hidden" name="subject" value="Bloomies website inquiry" />
      {!key && (
        <p className="notice">
          Form setup pending. For now, please reach out on{" "}
          <a
            href="https://www.instagram.com/bloomies_by_aadar"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
          .
        </p>
      )}
      <Button disabled={busy || !key}>
        {busy ? "Sending…" : "Send a little hello ↗"}
      </Button>
      <p role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
