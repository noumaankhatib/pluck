import type { Metadata } from "next";
import { HowWeWorkPageContent } from "@/components/how-we-work/HowWeWorkPageContent";

export const metadata: Metadata = {
  title: "How We Work | Pluck",
  description:
    "Pluck's approach to finding commercially valuable business opportunities — understanding your market, identifying demand and reaching the right customers.",
};

export default function HowWeWorkPage() {
  return <HowWeWorkPageContent />;
}
