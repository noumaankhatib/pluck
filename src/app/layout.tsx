import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, Montserrat, Libre_Baskerville } from "next/font/google";
import { ConditionalSiteHeader } from "@/components/layout/ConditionalSiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { homeSeo, site } from "@/content/site";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  // Load the real italic cut too; without it the browser slants the upright (faux italic).
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: homeSeo.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.domain,
    siteName: site.name,
    title: site.tagline,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.tagline,
    description: site.description,
  },
  alternates: {
    canonical: site.domain,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.domain,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${bodoniModa.variable} ${montserrat.variable} ${manrope.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <MotionProvider>
          <ConditionalSiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
