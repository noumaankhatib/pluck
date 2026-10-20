"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteNavBar } from "@/components/layout/SiteNavBar";

/**
 * Homepage: a fixed, transparent-over-video nav. It is rendered here, at the top level of
 * the layout, rather than inside the hero section. Inside the hero it lived in an isolated
 * stacking context, so the pinned sections below painted over it while scrolling.
 */
export function ConditionalSiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return <SiteNavBar variant="hero" />;
  return <SiteHeader />;
}
