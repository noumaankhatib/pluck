import Image from "next/image";
import { cn } from "@/lib/cn";

/** Same approved artwork, with the blank margins around it trimmed so it fills the navbar height. */
const LOGO_PAGE = "/images/navbar-logo.png";
const LOGO_HERO_VIDEO = "/brand/navbar-hero-lockup.svg";
const LOGO_WIDTH = 880;
const LOGO_HEIGHT = 760;

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
        "w-auto max-w-[10rem] object-contain object-left transition-transform duration-300 ease-out hover:scale-[1.03]",
        "h-[3.3rem] lg:h-[3.75rem]",
        className,
      )}
      sizes="(max-width: 1024px) 160px, 200px"
    />
  );
}
