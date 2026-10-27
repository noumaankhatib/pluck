# Content governance review (DRAFT – awaiting approval)

Nothing on the website has been deleted or rewritten for this review. Classification rules:
**KEEP** useful website content · **DUPLICATE** genuinely redundant · **VERIFY** claims/figures/dates/names needing confirmation · **REMOVE** demonstrably unnecessary, incorrect or unapproved.

## Summary by page
| Page | In source document | KEEP (extra, useful) | DUPLICATE | VERIFY | REMOVE |
|---|---|---|---|---|---|
| Home | 105 | 51 | 1 | 12 | 0 |
| About | 47 | 33 | 1 | 1 | 0 |
| Case study | 44 | 69 | 0 | 17 | 0 |
| Contact | 21 | 0 | 0 | 1 | 0 |
| /how-we-work | 0 | 26 | 0 | 0 | 0 |
| /disciplines | 13 | 5 | 0 | 1 | 0 |
| Global / SEO | 35 | 0 | 0 | 0 | 0 |

Counts are text strings from the content modules (`src/content/*.ts`). Text written directly in page/component files is listed in the section "Text defined outside the content modules".

## Proposed REMOVE list
**None.** No extra item is demonstrably incorrect or explicitly unapproved. The only candidates are the two DUPLICATE items below, which are for you to decide.

## DUPLICATE (proposed – approve before any change)
- **Home** `home:searchIntelligence.lead` – "The way potential customers search tells you what they need." – Same sentence as the headline; no longer rendered
- **About** `about:aboutIntro.headline` – "Three disciplines. One commercial objective." – Same sentence as the About page headline; shown again as a sub-line in "How we work together"

## VERIFY (needs your confirmation – nothing has been changed)
| Page | Item | Text | Why |
|---|---|---|---|
| Home | `caseStudy.timeline` | 3 months | Same reported figures as the case study |
| Home | `caseStudy.metrics[0].label` | Media spend | Same reported figures as the case study |
| Home | `caseStudy.metrics[0].value` | $15,000 | Same reported figures as the case study |
| Home | `caseStudy.metrics[1].label` | Qualified leads | Same reported figures as the case study |
| Home | `caseStudy.metrics[1].value` | 100+ | Same reported figures as the case study |
| Home | `caseStudy.metrics[2].label` | Quoted | Same reported figures as the case study |
| Home | `caseStudy.metrics[2].value` | $4.7m | Same reported figures as the case study |
| Home | `caseStudy.metrics[3].label` | In sales | Same reported figures as the case study |
| Home | `caseStudy.metrics[3].value` | $1.2m | Same reported figures as the case study |
| Home | `caseStudy.metrics[4].label` | Return | Same reported figures as the case study |
| Home | `caseStudy.metrics[4].value` | $80 in sales for every $1 of advertising spend | Same reported figures as the case study |
| Home | `disciplines.people[0].name` | Michael Simkin | RESOLVED (approved): keep as in document - "Michael Jack Simkin" on About, "Michael Simkin" on Home and /disciplines |
| About | `aboutTeam.people[0].name` | Michael Jack Simkin | RESOLVED (approved): keep as in document - "Michael Jack Simkin" on About, "Michael Simkin" on Home and /disciplines |
| Contact | `contactPage.form.calendarLinkText` | Book a conversation | Document has "[Insert booking link]"; page shows "link coming soon" until a URL exists |
| /disciplines | `disciplinesPagePeople[0].name` | Michael Simkin | RESOLVED (approved): keep as in document - "Michael Jack Simkin" on About, "Michael Simkin" on Home and /disciplines |
| Case study | `serverFactoryCaseStudy.sections[3].paragraphs[4]` | The new website is scheduled to launch in autumn 2026. We will assess organic performance once sufficient post | "scheduled to launch in autumn 2026" - confirm date/status |
| Case study | `serverFactoryCaseStudy.results.metrics[0].label` | Campaign duration | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[0].value` | 3 months | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[1].label` | Media spend | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[1].value` | $15,000 | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[2].label` | Qualified leads | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[2].value` | 100+ | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[3].label` | Quotations | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[3].value` | $4.7m | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[4].label` | Sales | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.metrics[4].value` | $1.2m | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.highlight` | $80 in sales for every $1 of advertising spend | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.body[0]` | The results represent $80 in sales for every $1 of advertising spend, with an advertising cost of $150 or less | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.body[1]` | Approximately 25.5% of the quoted value converted into sales during the reported period. | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.results.body[2]` | Media spend excludes strategy, campaign management, creative/landing-page work and other associated costs. The | Reported campaign figures - confirm against source data (arithmetic check passes) |
| Case study | `serverFactoryCaseStudy.afterResults[1].paragraphs[0]` | The paid-search results are already measurable. The new website's organic performance is not yet established. | "paid-search results are already measurable" - confirm still accurate |
| Case study | `serverFactoryStory.website.status` | Scheduled to launch in autumn 2026. Organic performance not yet measured. | States an "autumn 2026" launch - confirm date/status |

### Case-study claims: actual results vs illustrative
- **Reported results (from your document):** 3-month campaign; $15,000 media spend; 100+ qualified leads; $4.7m in quotations; $1.2m in sales; $80 in sales per $1; ≤$150 per qualified lead; ~25.5% of quoted value converted.
- **Arithmetic check (no change made):** $1.2m ÷ $15,000 = 80 ✔; $1.2m ÷ $4.7m = 25.5% ✔; $15,000 ÷ 100 leads = $150 (so "$150 or less" holds for 100+ leads) ✔.
- **Illustrative, not data:** the search signals ("Looking for specific hardware", "Comparing suppliers", "Needs advice on a system"), the six-step journey, the buyer paths and the "Crowded field → clear path" graphic. The page already labels the journey as "A conceptual view… illustrative, not campaign data."
- **Time-sensitive:** "scheduled to launch in autumn 2026" appears in the body text and in a status label. Confirm whether this is still accurate.
- **Needs a decision:** the case-study page does not say who approved publishing Server Factory's figures.

## Items to flag from my own earlier edits
- During the document sync I removed the heading **"Search leaves clues."** from Home Strip 4 so the document's headline could be the heading. It was useful copy (KEEP). Proposed: restore it as a short kicker above the headline, or leave as is – your call.
- The Home Strip 4 `lead` text is now unused (DUPLICATE of the headline).

## Text defined outside the content modules (page/component files)
- **Footer:** "Explore", "Start a conversation", "Talk to us", "Finding business others miss", "© year Pluck.media" – KEEP.
- **Contact page:** kickers "Contact", "The process", "Write to us"; success message and mailto subject text – KEEP.
- **Case study:** kickers "The challenge", "The research", "The buyers", "The website", "Paid search", "The difference", "What comes next", "The results" labels, and chapter-rail labels – KEEP.
- **About:** headline lines, eyebrow labels (About Pluck, Our belief, Our approach, The team, How we work together, Our advice), diagram numbers and "GROWTH"-style words – KEEP.
- **How we work / Disciplines:** all headings and labels in the page files – KEEP; both pages are absent from the source document and are added to it below.
- **Navigation:** How we work, Disciplines, Work, About, Talk to us – KEEP.

## Next steps (need your approval)
1. Approve/adjust the DUPLICATE, VERIFY and KEEP decisions above.
2. Fill in the VERIFY items (Michael's full name on Home, autumn 2026 launch status, booking URL).
3. Re-run the page-by-page validation against `docs/website-content-source.md` and report any remaining discrepancies.

## Decisions recorded
- Sales figure: **$1.2m confirmed**; the $1.5m in the creative brief is not used.
- "KKS": left out of the website; the site keeps "Pluck".
- Michael's name: kept as in the document (see above).
- "Search leaves clues.": restored on Home Strip 4 as an italic line under the headline; the "Search intelligence" label stays (Option C).
