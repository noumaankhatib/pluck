import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5 motion-reduce:transform-none",
        variant === "primary" &&
          "bg-forest text-ivory hover:bg-charcoal focus-visible:outline-offset-4",
        variant === "ghost" &&
          "border border-border bg-transparent text-foreground hover:border-forest hover:text-forest",
        className,
      )}
    >
      {children}
    </Link>
  );
}
