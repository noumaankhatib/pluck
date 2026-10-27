import { redirect } from "next/navigation";

/** Merged into the single-page homepage; kept as a fallback in case the config redirect is bypassed. */
export default function Page() {
  redirect("/#how-we-work");
}
