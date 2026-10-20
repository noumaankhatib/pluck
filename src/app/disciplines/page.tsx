import type { Metadata } from "next";
import { DisciplinesPageContent } from "@/components/disciplines/DisciplinesPageContent";

export const metadata: Metadata = {
  title: "Disciplines | Pluck",
  description:
    "Three disciplines — commercial strategy, paid search and digital technology — working together around one commercial objective.",
};

export default function DisciplinesPage() {
  return <DisciplinesPageContent />;
}
