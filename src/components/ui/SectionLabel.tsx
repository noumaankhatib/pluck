import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionLabel({
  children,
  className,
  tone = "light",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "type-eyebrow flex items-center",
        tone === "light" ? "text-ink-soft" : "text-ivory/78",
        className,
      )}
    >
      {children}
    </p>
  );
}
