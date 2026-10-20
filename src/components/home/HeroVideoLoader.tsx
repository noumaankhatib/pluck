import { cn } from "@/lib/cn";

type HeroVideoLoaderProps = {
  /** When false, loader fades out (video is ready or not used). */
  show: boolean;
};

/** Brief branded placeholder while the hero MP4 buffers — copper signal on forest, not flat green. */
export function HeroVideoLoader({ show }: HeroVideoLoaderProps) {
  return (
    <div
      className={cn("hero-video-loader", !show && "hero-video-loader--done")}
      aria-hidden
    >
      <div className="hero-video-loader__beam" />
      <div className="hero-video-loader__vignette" />
      <div className="hero-video-loader__line">
        <span className="hero-video-loader__signal" />
      </div>
    </div>
  );
}
