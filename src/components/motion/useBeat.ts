import { useTransform, type MotionValue } from "framer-motion";

/**
 * A story beat inside a pinned scene. Rises in over [inStart, inEnd] and,
 * if an exit range is given, lifts away over [outStart, outEnd].
 * Returns opacity + y ready to spread into a motion element's style.
 */
export function useBeat(
  progress: MotionValue<number>,
  [inStart, inEnd]: [number, number],
  exit?: [number, number],
  distance = 28,
) {
  const stops = exit ? [inStart, inEnd, exit[0], exit[1]] : [inStart, inEnd];
  const opacity = useTransform(progress, stops, exit ? [0, 1, 1, 0] : [0, 1]);
  const y = useTransform(progress, stops, exit ? [distance, 0, 0, -distance] : [distance, 0]);
  return { opacity, y };
}
