import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroNarrativeSection } from "@/components/home/IntroNarrativeSection";
import { QualitySection } from "@/components/home/QualitySection";
import { SearchIntelligenceSection } from "@/components/home/SearchIntelligenceSection";
import { JourneySection } from "@/components/home/JourneySection";
import { CaseStudySection } from "@/components/home/CaseStudySection";
import { QualificationSection } from "@/components/home/QualificationSection";
import { PlainEnglishSection } from "@/components/home/PlainEnglishSection";
import { DisciplinesSection } from "@/components/home/DisciplinesSection";
import { ClosingCTASection } from "@/components/home/ClosingCTASection";
import { StoryHandoff } from "@/components/home/StoryHandoff";
import { HomeStoryShell } from "@/components/home/HomeStoryShell";
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
    <HomeStoryShell>
      <HeroSection />
      <IntroNarrativeSection />
      <QualitySection />
      <StoryHandoff label="Then where are the right ones?" tone="paper" />
      <SearchIntelligenceSection />
      <StoryHandoff label="How do clues become customers?" />
      <JourneySection />
      <StoryHandoff label="Does it actually work?" tone="light" />
      <CaseStudySection />
      <StoryHandoff label="Is Pluck right for you?" tone="light" />
      <QualificationSection />
      <PlainEnglishSection />
      <StoryHandoff label="Who does the work?" />
      <DisciplinesSection />
      <ClosingCTASection />
    </HomeStoryShell>
  );
}
