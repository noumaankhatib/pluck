"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";

/** Homepage nav lives inside the hero section — avoid a duplicate header band. */
export function ConditionalSiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteHeader />;
}
