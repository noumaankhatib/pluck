import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--content-max)] px-[var(--gutter)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
