"use client";

import { useState } from "react";
import { contactPage } from "@/content/contact";
import { site } from "@/content/site";

const { fields, submit } = contactPage.form;

type FieldName = "name" | "company" | "email" | "website" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.company.trim()) errors.company = "Please enter your company.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.website.trim()) {
    try {
      new URL(values.website.trim());
    } catch {
      errors.website = "Please enter a full web address, for example https://example.com.";
    }
  }
  if (!values.message.trim()) errors.message = "Please tell us a little about your business.";
  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opened">("idle");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      website: String(data.get("website") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const { name, company, email, website, message } = values;
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

  function clearError(name: FieldName) {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const fieldProps = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    "aria-required": fields[name].required || undefined,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    onChange: () => clearError(name),
  });

  return (
    <form onSubmit={handleSubmit} className="ct-form" noValidate>
      <div className="ct-form__row">
        <Field name="name" label={fields.name.label} required error={errors.name} i={4}>
          <input {...fieldProps("name")} type="text" autoComplete="name" className="ct-input" />
        </Field>
        <Field name="company" label={fields.company.label} required error={errors.company} i={5}>
          <input {...fieldProps("company")} type="text" autoComplete="organization" className="ct-input" />
        </Field>
      </div>

      <Field name="email" label={fields.email.label} required error={errors.email} i={6}>
        <input {...fieldProps("email")} type="email" autoComplete="email" className="ct-input" />
      </Field>

      <Field name="website" label={fields.website.label} error={errors.website} i={7}>
        <input {...fieldProps("website")} type="url" autoComplete="url" placeholder="https://" className="ct-input" />
      </Field>

      <Field name="message" label={fields.message.label} required error={errors.message} i={8}>
        <textarea {...fieldProps("message")} rows={6} className="ct-input ct-input--area" />
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
            <span>
              Your email app should open with your message ready to send. If it doesn&apos;t, write to us at{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  error,
  i,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  i: number;
  children: React.ReactNode;
}) {
  return (
    <div className="ct-field cs-rise" style={{ ["--i" as string]: i }}>
      <label htmlFor={`contact-${name}`} className="ct-label">
        {label}
        {required && (
          <span className="ct-required" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`contact-${name}-error`} className="ct-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
