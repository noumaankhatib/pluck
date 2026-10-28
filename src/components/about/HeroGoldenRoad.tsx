import Image from "next/image";
import { aboutStory as story } from "@/content/about";

export function HeroGoldenRoad() {
  return (
    <div
      className="ab-road"
      role="img"
      aria-label={`A glowing road climbing past three milestones: ${story.hero.markers.join(", ")}`}
    >
      <Image
        src="/images/about-hero-growth-roadmap.webp"
        alt=""
        width={1672}
        height={941}
        sizes="(max-width: 1024px) 94vw, 56vw"
        priority
        className="ab-road__img"
      />
    </div>
  );
}
