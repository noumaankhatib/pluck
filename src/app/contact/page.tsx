import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Talk to us",
  description: "Start a conversation with Pluck about the business you might be missing.",
};

export default function ContactPage() {
  return (
    <Container className="py-[var(--section-space)]">
      <h1 className="font-display text-4xl text-forest">Talk to us</h1>
      <p className="mt-6 max-w-lg text-muted">
        This page will be developed after the homepage visual language is
        established. {site.tagline}
      </p>
    </Container>
  );
}
