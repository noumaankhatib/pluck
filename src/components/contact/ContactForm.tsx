"use client";

import { useState } from "react";
import { contactPage } from "@/content/contact";
import { site } from "@/content/site";

const { fields, submit } = contactPage.form;

const inputClass =
  "w-full border border-forest/15 bg-surface px-4 py-3 text-[0.9375rem] text-charcoal outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-charcoal/40 focus:border-forest/40 focus:ring-2 focus:ring-forest/10";

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
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="contact-name" className="type-caption mb-2 block text-charcoal/75">
            {fields.name.label}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="contact-company" className="type-caption mb-2 block text-charcoal/75">
            {fields.company.label}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="type-caption mb-2 block text-charcoal/75">
          {fields.email.label}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-website" className="type-caption mb-2 block text-charcoal/75">
          {fields.website.label}
        </label>
        <input
          id="contact-website"
          name="website"
          type="url"
          autoComplete="url"
          placeholder="https://"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="type-caption mb-2 block text-charcoal/75">
          {fields.message.label}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-y min-h-[9rem]`}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center bg-forest px-10 py-3 font-sans text-[0.9375rem] font-medium tracking-[0.06em] text-ivory transition-colors hover:bg-charcoal sm:w-auto"
        >
          {submit}
        </button>
        {status === "opened" && (
          <p className="mt-4 text-[0.875rem] leading-relaxed text-charcoal/65" role="status">
            If your email app did not open, write to us at{" "}
            <a href={`mailto:${site.contactEmail}`} className="text-forest underline-offset-4 hover:underline">
              {site.contactEmail}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
