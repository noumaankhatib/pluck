"use client";

import { useState } from "react";
import { contactPage } from "@/content/contact";
import { site } from "@/content/site";

const { fields, submit } = contactPage.form;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const website = String(data.get("website") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Enquiry from ${name} at ${company}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        website ? `Website: ${website}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    );

    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    setStatus("opened");
  }

  return (
    <form onSubmit={handleSubmit} className="ct-form" noValidate={false}>
      <div className="ct-form__row">
        <Field id="contact-name" label={fields.name.label} i={4}>
          <input id="contact-name" name="name" type="text" required aria-required="true" autoComplete="name" className="ct-input" />
        </Field>
        <Field id="contact-company" label={fields.company.label} i={5}>
          <input id="contact-company" name="company" type="text" required aria-required="true" autoComplete="organization" className="ct-input" />
        </Field>
      </div>

      <Field id="contact-email" label={fields.email.label} i={6}>
        <input id="contact-email" name="email" type="email" required aria-required="true" autoComplete="email" className="ct-input" />
      </Field>

      <Field id="contact-website" label={fields.website.label} i={7}>
        <input id="contact-website" name="website" type="url" autoComplete="url" placeholder="https://" className="ct-input" />
      </Field>

      <Field id="contact-message" label={fields.message.label} i={8}>
        <textarea id="contact-message" name="message" required aria-required="true" rows={6} className="ct-input ct-input--area" />
      </Field>

      <div className="ct-form__actions cs-rise" style={{ ["--i" as string]: 9 }}>
        <button type="submit" className="ct-submit">
          <span>{submit}</span>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <path d="M1 6h15M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {status === "opened" && (
          <p className="ct-success" role="status">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.5" pathLength={1} className="ct-success__ring" />
              <path d="M7 12.5l3.2 3.2L17 8.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="ct-success__tick" />
            </svg>
            <span>
              If your email app did not open, write to us at{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ id, label, i, children }: { id: string; label: string; i: number; children: React.ReactNode }) {
  return (
    <div className="ct-field cs-rise" style={{ ["--i" as string]: i }}>
      <label htmlFor={id} className="ct-label">
        {label}
      </label>
      {children}
      <span className="ct-field__bar" aria-hidden="true" />
    </div>
  );
}
