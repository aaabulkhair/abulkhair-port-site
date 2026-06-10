# Editorial Redesign - Design Spec

**Date:** 2026-04-07
**Status:** Approved

## Constraint

**Zero information loss.** Every piece of existing content (text, links, metrics, social proof, CTAs, data points) must be preserved. The redesign is visual and structural only.

## Design Decisions

| Decision | Choice |
|----------|--------|
| Direction | Editorial & Craft |
| Hero layout | Asymmetric Split (text-heavy left, photo right) |
| Section flow | Ruled Sections (numbered, horizontal rules, compact) |
| Color palette | Monochrome + Warm Gold Accent |
| Max width | 1400px with 3rem side padding |
| Font | Inter (geometric sans-serif) |

## Design System

### Colors

```
--bg:             #0a0a0a       (near-black background)
--bg-surface:     rgba(255,255,255,0.02)  (card/surface backgrounds)
--text-primary:   #f0f0f0       (headings, names)
--text-secondary: rgba(255,255,255,0.35)  (body text, descriptions)
--text-muted:     rgba(255,255,255,0.15)  (labels, metadata)
--accent:         #e8c47c       (gold - CTAs, emphasis, dividers)
--accent-dim:     rgba(232,196,124,0.15)  (accent backgrounds)
--rule:           rgba(255,255,255,0.06)  (horizontal rules, borders)
--radius:         4px           (border radius)
```

### Typography

- **Font family:** Inter, system-ui, sans-serif (replaces Poppins + 6 other fonts)
- **Name/headings:** Light weight (300) with bold (700-800) for emphasis words
- **Section labels:** 0.6rem, uppercase, letter-spacing 4px, muted color
- **Body text:** 0.8-0.95rem, secondary color, line-height 1.7
- **Mixed weight pattern:** "Ahmed **Abulkhair**", "How I Can Help You **Succeed**", "What Clients **Say**"

### Section Pattern

Every content section follows this structure:
1. Numbered label: `01 / Section Name` (uppercase, letterspaced, muted)
2. Content area specific to section type
3. Horizontal rule (1px solid var(--rule)) at bottom

## Content Updates

### Title & Role Change

| Location | Old | New |
|----------|-----|-----|
| header-data.js title | "Senior Data Scientist & Educator" | "AI Scientist @ Incept Labs" |
| header-data.js typed strings | Data Scientist, ML Engineer, DS Mentor | AI Scientist, LLM Researcher, Data Scientist |
| about-data.js description1 | "Senior Data Scientist specializing in..." | "AI Scientist at Incept Labs specializing in..." |
| footer.js subtitle | "Senior Data Scientist & AI Consultant" | "AI Scientist @ Incept Labs" |
| header-data.js specialties | includes "Power BI Solutions" | replace with "Educational AI" or similar |
| structured-data.js | "Senior Data Scientist" references | "AI Scientist" |
| seo-head.js | title/description references | Updated to AI Scientist |

### New Experience Entry (position 0 in array)

```js
{
    id: 0,
    company: 'Incept Labs',
    jobtitle: 'AI Scientist',
    startYear: 'Jan 2026',
    endYear: 'Present',
    location: 'California, United States',
    employmentType: 'Full-time',
    description: 'Contributing to the mission of Incept Labs, a startup focused on revolutionizing educational experiences through AI technology.',
    achievements: [
        'Developed large language models tailored for K-12 education, enhancing real-time adaptability to diverse learners',
        'Collaborated with national governments to align AI models with local curricula, languages, and customs',
        'Contributed to revolutionizing educational experiences through AI technology'
    ],
    tech: ['LLMs', 'GenAI', 'Python', 'K-12 Education', 'NLP'],
    companyUrl: 'https://inceptlabs.ai/',
    logo: '/images/company-logos/inceptlabs.png'
}
```

## Component Changes

### Navbar

**Current:** Logo image + icon-based nav links with CSS module styling
**New:** Text logo "AA" (or existing logo kept) + uppercase text nav links (Home, About, Services, Resume, Blog, Contact). Clean horizontal rule below. No icons. Styled with Tailwind, no CSS module.

### Hero / Landing

**Current:** Circular profile photo, social icons left column, typed animation, CSS module + Tailwind mix
**New:** Asymmetric split layout:
- Left (~58%): Label "AI Scientist - Incept Labs - California", name in large mixed-weight type, description, gold primary CTA + outline secondary CTA, trust badges as quiet metadata below
- Right (~42%): Profile photo (can keep circular or try rounded-square), social icons stacked vertically on right edge
- Subtle vertical divider line between halves (gradient fade)
- **Remove:** react-typed animation (static text instead), Lottie dependency for this component
- **Keep:** All CTA links, trust badge data, social links, profile image

### About

**Current:** Lottie animation + text + decorative circles/line
**New:** Two-column grid. Left: about text (both paragraphs preserved). Right: empty breathing room or optional subtle element. No Lottie. No decorative line/circles. Section label "01 / About".

### What I Do / Services

**Current:** 5 service cards with emoji icons, inline styles, heavy borders, social proof badges
**New:** 5 service cards in editorial style:
- Top row: 3 cards (Consulting, Development, Education)
- Bottom row: 2 cards (Agentic AI, Technical Content)
- Each card: left-border accent (2px, var(--rule), becomes gold on hover), title, description, features as dot-list, social proof as subtle metadata, CTA as text link with arrow
- **Remove:** Emoji icons (🎯🚀📚🤖✍️), outcome section with 💡, pricing text, heavy box shadows
- **Keep:** All service titles, descriptions, features lists, social proof text, CTA links with UTM params

### Experience

**Current:** Horizontal scroller with Lottie animation, intersection observer, wheel event handling
**New:** Vertical timeline list:
- Each entry: date range left column (180px), content right (company name, role in accent color, description, tech tags as small bordered pills)
- All 9 positions shown (add Incept Labs as first)
- Expandable/collapsible for older entries or show all
- **Remove:** Horizontal scroller, Lottie animation, all scroll/intersection observer JS, debug console.logs
- **Keep:** All company names, job titles, dates, descriptions, achievements, tech arrays, logos, company URLs

### Education

**Current:** Education cards with CSS module
**New:** Same ruled format as experience - date left, details right. Section label "04 / Education". All existing education data preserved.

### Testimonials

**Current:** Card grid with emoji platform icons, color-coded service tags, MUI Container
**New:** 2-column grid of quote cards:
- Large opening quote mark in gold (CSS pseudo-element)
- Testimonial text in italic
- Author name + role below
- Platform and service as small bordered tags
- Stats bar below: 4.9 rating, 100+ hours, 100% success (gold numbers)
- **Remove:** Emoji platform icons (⭐✅▶️🎵), getServiceColor function with hardcoded hex colors
- **Keep:** All testimonial text, names, roles, ratings, platforms, services, stats

### YouTube Feed / TikTok Feed / Blog

**Current:** Separate sections with different background colors
**New:** 3 separate numbered sections (06/07/08), each with 3-card grid. Cards: thumbnail area + title + subtitle. Same data sources, same feeds. Background is consistent var(--bg).

### Contact

**Current:** Contacts component with contactsData
**New:** Two-column split. Left: heading in mixed-weight, description, contact links. Right: form or additional info. All existing contact data, social proof, links preserved.

### Footer

**Current:** Three-row layout with brand, nav, socials, divider, bottom text
**New:** Single-row minimal footer. Left: copyright + "Built with Next.js". Right: social links as text. Horizontal rule above.

### Sticky CTA

**Keep** but restyle: minimal, editorial. Small fixed element at bottom or side, gold accent, appears on scroll. Same link (topmate).

### Back to Top

**Keep** but restyle to match editorial theme.

## Removals (visual only, no content loss)

| Removal | Reason | Content preserved elsewhere |
|---------|--------|-----------------------------|
| Lottie animations (3 instances) | Decorative, non-editorial | N/A - purely decorative |
| Emoji icons in services | Unprofessional for editorial | Service titles remain |
| react-typed animation | Replaced with static text | Title text stays |
| Decorative circles/lines in About | Template-looking | N/A |
| Multiple Google Font imports (7 fonts) | Replaced with Inter only | N/A |
| CSS modules (most) | Consolidating to Tailwind | Styles reimplemented |
| Color-coded service tags | Replaced with uniform accent | Service names stay |
| Alternating section backgrounds | Replaced with ruled sections | Content unchanged |

## Styling Approach

**Consolidate to Tailwind CSS.** Remove CSS modules where possible. Theme values become CSS custom properties on `:root` and Tailwind config extensions. Inline styles removed in favor of Tailwind classes.

The theme context still exists for programmatic access but the dark theme values are updated to match the new design system.

## Files to Modify

| File | Change |
|------|--------|
| `src/theme/theme.js` | Update dark theme colors to new palette |
| `tailwind.config.js` | Update color tokens, add Inter font |
| `src/styles/globals.css` | Replace font imports with Inter, add CSS custom properties, remove decorative heading styles |
| `src/data/header-data.js` | Update title, typed strings, specialties |
| `src/data/about-data.js` | Update description1 |
| `src/data/experience-data.js` | Add Incept Labs entry |
| `src/components/landing/landing.js` | Rewrite as asymmetric split, remove react-typed |
| `src/components/navbar/navbar.js` | Rewrite as editorial navbar |
| `src/components/about/about.js` | Simplify, remove Lottie |
| `src/components/what-i-do/what-i-do.js` | Rewrite cards, remove emojis |
| `src/components/experience/experience.js` | Rewrite as vertical list, remove scroller |
| `src/components/experience/experience-card.js` | Rewrite for vertical layout |
| `src/components/education/education.js` | Rewrite for ruled format |
| `src/components/education/education-card.js` | Rewrite for ruled format |
| `src/components/testimonials/testimonials.js` | Rewrite cards, remove emoji icons |
| `src/components/youtube-feed/youtube-feed.js` | Restyle cards |
| `src/components/tiktok-feed/tiktok-feed.js` | Restyle cards |
| `src/components/blog/blog.js` | Restyle cards |
| `src/components/contacts/contacts.js` | Rewrite layout |
| `src/components/footer/footer.js` | Simplify to single row |
| `src/components/sticky-cta/sticky-cta.js` | Restyle minimal |
| `src/components/back-to-top/back-to-top.js` | Restyle |
| `src/components/trust-badges/trust-badges.js` | Restyle as metadata text |
| `src/components/seo/seo-head.js` | Update title/description |
| `src/components/seo/structured-data.js` | Update role references |
| `src/pages/index.js` | Remove section background wrappers |

## Mockup Reference

Full-page HTML mockup: `.superpowers/brainstorm/16729-1775553097/content/full-design-v2.html`
