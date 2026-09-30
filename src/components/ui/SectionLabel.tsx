import { cn } from "@/lib/cn";

type SectionLabelProps = {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionLabel({
  index,
  children,
  className,
  tone = "light",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "type-eyebrow flex items-center",
        tone === "light" ? "text-ink-soft" : "text-ivory/70",
        className,
      )}
    >
      {index ? (
        <>
          <span
            className={cn(
              "font-mono tabular-nums",
              tone === "light" ? "text-copper" : "text-copper-soft",
            )}
          >
            {index}
          </span>
          <span
            className="mx-3 inline-block h-px w-6 bg-current opacity-30"
            aria-hidden
          />
        </>
      ) : null}
      {children}
    </p>
  );
}
