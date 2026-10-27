# Pluck.media – working session context (reference)

Saved for later reference. Stack: Next.js 16 (App Router, `src/app`), React 19, Tailwind 4, GSAP + ScrollTrigger (`src/lib/gsap/register.ts`), Framer Motion. Dev server: `npm run dev` (port 3000). Checks used: `npx tsc --noEmit`, `npx eslint src`, `npm run build`. Known: 7 pre-existing ESLint errors elsewhere (not from this work).

## Brand and decisions
- Palette: Forest `#123D32`, Cream `#FAF9F3`, Pale Sage `#E5E9DD`, Muted Sage `#A7B49D`, Olive `#545C3B`, Burnt Orange `#B65320`, Light Copper `#E69A61`, Soft Gold `#F5DDA5`. Global CSS variables in `src/app/globals.css` were re-pointed to these.
- Hero video is preserved (`public/videos/hero-background-pluck.web.mp4`); do not replace.
- **Sales figure is $1.2m** (client brief's $1.5m is NOT used). $80 per $1 and ~25.5% depend on it.
- **"KKS"** appears only in the client creative brief; undefined. Website keeps **Pluck**.
- Michael's name: "Michael Jack Simkin" on About; "Michael Simkin" on Home and /disciplines (as in the source document).
- "Search leaves clues." restored on Home Strip 4 as an italic line under the headline; label "Search intelligence" kept.
- Contact calendar: waiting on a booking URL (`NEXT_PUBLIC_BOOKING_URL`); page shows "link coming soon" until then.

## Key files by page
- Navbar/footer: `components/layout/SiteNavBar.tsx`, `SiteFooter.tsx`.
- Home: `components/home/*` (HeroSection, IntroNarrativeSection, SearchIntelligenceSection, JourneySection, CaseStudySection, ClosingCTASection…), copy in `content/home.ts`, `home-sections.ts`.
- About: `app/about/page.tsx`, `components/about/` (HeroGoldenRoad, BeliefSection, ApproachSection, TogetherSection, AdviceSection, CtaIllustration, visuals), copy in `content/about.ts`.
- /disciplines: `components/disciplines/*`, image `public/images/three-disciplines-3d-v2.png` (text and chart removed from the original; chart is live SVG).
- /how-we-work: `components/how-we-work/*`, `content/how-we-work.ts`.
- Case study: `app/work/server-factory/page.tsx`, `components/case-study/*`, `content/server-factory-case-study.ts`.
- Contact: `app/contact/page.tsx`, `content/contact.ts`.
- SEO/nav copy: `content/site.ts`; title template in `app/layout.tsx` (`%s`, pages carry their own "| Pluck").
- Assets added: `public/images/about-golden-road.webp`, `about-cta-guided.webp` (about-cta-signpost.webp now unused), `three-disciplines-3d-v2.png`.

## Content governance
- `docs/content-governance-review.md` – KEEP / DUPLICATE / VERIFY classification (draft, decisions recorded at the bottom).
- `docs/website-content-source.md` – draft complete source of truth generated from the content modules.
- Audit result: document wording is synced on Home, About, Case Study, Contact; remaining differences are the case-study results labels ("Campaign duration: 3 months" etc.), the Contact calendar placeholder, and extra supporting copy (KEEP).

## Open items / pending decisions
1. Contact booking link.
2. Optional fixes from the last code review (not applied unless approved): How-we-work hover transform blocked by GSAP inline style; portrait lookup fallback for name mismatch; hard-coded About/disciplines headings; Home Strip 4 italic lands on "need."; dead code in disciplines animation hook and `about/visuals.tsx`; road animation keeps running off-screen.
3. Whether to add the creative brief's industries (renewable energy, private jets, yachts) and decision-maker roles; tone review against the brief (report only).
4. Nav label "Work" → case study only; consider "Case studies" if more are added.

## Patterns worth reusing
- Section animation: client component + `gsap.context` + ScrollTrigger (`once: true`), elements hidden via `gsap.set` only after JS runs (content stays visible without JS); `prefers-reduced-motion` skips animation.
- One-screen sections: `min-height: calc(100svh - var(--header-h))` at ≥1024px, sizes in `svh`.
- Page-wide rule `.ab > section > * { width: 100% }` affects absolutely positioned children on About; override with higher specificity (see `.ad__dot`).
- Next image cache: renaming an asset (e.g. `-v2`) avoids stale optimised copies.


## Single-page refactor (latest)
- Homepage is now one scrolling page: `app/page.tsx` composes Hero (`#home`), Opportunity (`#opportunity`, intro/quality/search), Approach (`#approach`, journey), qualification, plain English, Disciplines (`#disciplines` + embedded `DisciplinesPageContent`), How we work (`#how-we-work` wrapper: embedded `HowWeWorkPageContent` process + `ClosingCTASection`), Our Work (`#our-work`, CaseStudySection), About (`AboutContent`, `#about`), Contact (`ContactContent`, `#contact`).
- Old routes `/about`, `/disciplines`, `/how-we-work`, `/contact` redirect (308 in `next.config.ts`; the old `page.tsx` files are tiny redirect stubs). Case study `/work/server-factory` stays separate, with a "Back to Our Work" link.
- Nav items (`content/site.ts`) are `/#id` links; smooth scroll, hash-load alignment and re-settling live in `components/layout/SectionScroll.tsx`; active-section tracking is in `SiteNavBar.tsx`.
- Known quirk: ScrollTrigger pin spacers shift layout ~70px a few seconds after load, so SectionScroll re-aligns for ~6.5s after navigation.
- `gsap.config({ nullTargetWarn: false })` is set in `lib/gsap/register.ts` (embedded components skip some animated elements).
