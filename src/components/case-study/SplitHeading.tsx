/** Headline whose words rise out of a mask one after another once the parent InView is "in". */
export function SplitHeading({
  id,
  text,
  className,
  delay = 0,
}: {
  id?: string;
  text: string;
  className?: string;
  /** Extra start delay in ms. */
  delay?: number;
}) {
  return (
    <h2 id={id} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="cs-word">
            <span style={{ ["--w" as string]: i, ["--wd" as string]: `${delay}ms` }}>{word}</span>
          </span>{" "}
        </span>
      ))}
    </h2>
  );
}
