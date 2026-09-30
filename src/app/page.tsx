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

export default function HomePage() {
  return (
    <HomeStoryShell>
      <HeroSection />
      <IntroNarrativeSection />
      <StoryHandoff label="So why is it being missed?" />
      <QualitySection />
      <StoryHandoff label="Then where are the right ones?" tone="paper" />
      <SearchIntelligenceSection />
      <StoryHandoff label="How do clues become customers?" />
      <JourneySection />
      <StoryHandoff label="Does it actually work?" />
      <CaseStudySection />
      <StoryHandoff label="Is Pluck right for you?" />
      <QualificationSection />
      <PlainEnglishSection />
      <StoryHandoff label="Who does the work?" />
      <DisciplinesSection />
      <ClosingCTASection />
    </HomeStoryShell>
  );
}
