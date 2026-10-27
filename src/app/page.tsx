import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroNarrativeSection } from "@/components/home/IntroNarrativeSection";
import { QualitySection } from "@/components/home/QualitySection";
import { SearchIntelligenceSection } from "@/components/home/SearchIntelligenceSection";
import { HowWeFindSection } from "@/components/home/HowWeFindSection";
import { CaseStudySection } from "@/components/home/CaseStudySection";
import { QualificationSection } from "@/components/home/QualificationSection";
import { DisciplinesSection } from "@/components/home/DisciplinesSection";
import { ClosingCTASection } from "@/components/home/ClosingCTASection";
import { DisciplinesPageContent } from "@/components/disciplines/DisciplinesPageContent";
import { AboutContent } from "@/components/about/AboutContent";
import { ContactContent } from "@/components/contact/ContactContent";
import { HomeStoryShell } from "@/components/home/HomeStoryShell";
import { HeroVideoPreload } from "@/components/home/HeroVideoPreload";
import { homeSeo, site } from "@/content/site";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  keywords: homeSeo.keywords,
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: site.domain,
    siteName: site.name,
  },
  twitter: {
    title: homeSeo.title,
    description: homeSeo.description,
  },
  alternates: {
    canonical: site.domain,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroVideoPreload />
      <HomeStoryShell>
      <HeroSection />
      <IntroNarrativeSection />
      <QualitySection />
      <SearchIntelligenceSection />
      <QualificationSection />
      <DisciplinesSection />
      <DisciplinesPageContent embedded />
      <HowWeFindSection />
      <ClosingCTASection />
      <CaseStudySection />
      <AboutContent />
      <ContactContent />
    </HomeStoryShell>
    </>
  );
}
