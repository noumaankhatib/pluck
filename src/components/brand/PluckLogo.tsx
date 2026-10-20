import Image from "next/image";
import { cn } from "@/lib/cn";

const LOGO_PAGE = "/images/pluck-hero-logo.png";
const LOGO_HERO_VIDEO = "/brand/pluck-nav-hero-lockup.svg";
const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 819;

type PluckLogoProps = {
  variant: "nav" | "footer";
  className?: string;
  priority?: boolean;
  /** Nav over hero video — transparent ivory lockup */
  onVideo?: boolean;
};

export function PluckLogo({
  variant,
  className,
  priority,
  onVideo,
}: PluckLogoProps) {
  if (variant === "nav" && onVideo) {
    return (
      <Image
        src={LOGO_HERO_VIDEO}
        alt="Pluck Media — We find the business you're missing."
        width={220}
        height={56}
        priority={priority}
        className={cn(
          "h-[3rem] w-auto object-contain object-left sm:h-[3.35rem] lg:h-[3.75rem] xl:h-[4rem]",
          "drop-shadow-[0_2px_18px_rgb(0_0_0/0.42)]",
          className,
        )}
        sizes="(max-width: 1024px) 140px, 180px"
      />
    );
  }

  if (variant === "footer") {
    return (
      <Image
        src={LOGO_HERO_VIDEO}
        alt="Pluck Media — We find the business you're missing."
        width={220}
        height={56}
        priority={priority}
        className={cn(
          "h-[2.65rem] w-auto max-w-full object-contain object-left sm:h-[2.85rem]",
          className,
        )}
        sizes="(max-width: 640px) 168px, 200px"
      />
    );
  }

  return (
    <Image
      src={LOGO_PAGE}
      alt="Pluck Media — We find the business you're missing."
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn(
        "h-auto w-auto object-contain object-left",
        "h-[2.5rem] w-auto sm:h-[2.75rem] lg:h-[3rem] xl:h-[3.25rem]",
        className,
      )}
      sizes="(max-width: 1024px) 160px, 200px"
    />
  );
}
