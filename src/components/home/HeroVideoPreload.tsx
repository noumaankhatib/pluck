/** Homepage-only hint so the hero MP4 starts downloading with the document. */
export function HeroVideoPreload() {
  return (
    <link
      rel="preload"
      href="/videos/hero-section-background.web.mp4"
      as="fetch"
      type="video/mp4"
      crossOrigin="anonymous"
    />
  );
}
