# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**abulkhair.ai** — Ahmed Abulkhair's personal site and monetization hub (consulting via Topmate, project work via Upwork, Arabic content on YouTube/TikTok, writing on Medium and the on-site blog).

- Next.js 16 (**pages router**, Turbopack builds), React 19
- Tailwind CSS for all styling (dark editorial theme; `src/styles/globals.css` for base styles)
- framer-motion (lazy-loaded via `LazyMotion`), react-icons
- MDX blog (`next-mdx-remote` + `gray-matter`)
- English only — **no i18n** (no locale routing or translations; don't assume any exists)
- Deployed on Vercel from `main` (Next.js auto-detected; no `vercel.json`)

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # production build; postbuild writes public/rss.xml + sitemap
npm start            # serve the production build

npx playwright test --project=chromium        # builds + starts prod server automatically
npx playwright test --project="Mobile Chrome"
BASE_URL=http://localhost:3001 npx playwright test   # test an already-running server
npx playwright install chromium               # once, or after a Playwright upgrade
```

## Structure

```
content/posts/*.mdx      Blog posts (front-matter: title, description, date, tags, coverImage, draft)
src/pages/               index (homepage), blog/index, blog/[slug], services/index, services/[slug], 404
src/components/          One folder per section (landing, about, what-i-do, experience, testimonials,
                         youtube-feed, tiktok-feed, blog, contacts, footer, navbar, sticky-cta,
                         service-page/, seo/, analytics/, ui/); re-exported from components/index.js
src/data/                All copy and numbers (see below)
src/data/services/       One file per service page; index.js is the registry (order = /services listing)
src/lib/posts.js         MDX loading; getAllPosts()/getPublishedSlugs() exclude drafts
src/lib/feeds.js         Medium + YouTube feed fetchers (used in homepage getStaticProps)
src/lib/image-size.js    Build-time PNG/JPEG sizes for next/image in MDX
src/utils/utm.js         withUtm(url, { medium, campaign })
src/utils/json-ld.js     jsonLd(schema) — escaped JSON for <script type="application/ld+json">
scripts/generate-rss.mjs postbuild RSS; next-sitemap.config.js for the sitemap
tests/                   Playwright: abulkhair-ai.spec.js, redesign-guards.spec.js, review-guards.spec.js
```

## Content rules (important)

- **Every public number lives in `src/data/metrics.js`** — years of experience, Topmate rating/count/bookings, Upwork badge/JSS/jobs, and prices (`pricing.consult`, `pricing.development`). Import from there; never hard-code a metric or price in components or service files.
- **Only verified claims.** Sources: `Ahmed_Abulkhair_CV.pdf` (local, git-ignored), topmate.io/abulkhair, the Upwork dashboard (confirmed by Ahmed). No "100+ projects/clients", "Top 1%", "Egypt's leading", "Dr.", "Top Rated Plus", or `aggregateRating` in JSON-LD. `tests/review-guards.spec.js` enforces this.
- **Testimonials** (`src/data/testimonials-data.js`) are verbatim public reviews with a source link. Never paraphrase or invent one.
- Service pages cover classical ML / data science as well as LLM work.

## Links, UTM and analytics

- External CTAs carry `utm_source=abulkhair.ai`, a `utm_medium` (`cta|social|contact|widget|testimonial`) and exactly **one** `utm_campaign`. Build per-placement links with `withUtm(base, { campaign })` — it overwrites, never appends. Never concatenate `&utm_campaign=` onto a URL.
- Base profile/CTA URLs: `src/data/contacts-data.js` and `src/data/header-data.js`.
- `MonetizationLink` (`src/components/analytics/enhanced-link-tracker.js`) tracks GA4 clicks; GA helpers live in `analytics/google-analytics.js` (script in `_document.js`, hook in `_app.js`). GA4 ID via `NEXT_PUBLIC_GA_MEASUREMENT_ID` (property "abulkhair.ai").
- Key URLs: Topmate `https://topmate.io/abulkhair`, Upwork `https://www.upwork.com/freelancers/~01e8b690de797b2ecf`, YouTube `@7adid_elsafina` (channel ID `UC27eutkOJU045MWeoFlzGYw`), Medium `@aaabulkhair`.

## SEO

- `SEOHead` (`src/components/seo/seo-head.js`): pass a page title without the brand — it appends `| Ahmed Abulkhair` once.
- `StructuredData`: a single Person (`https://abulkhair.ai/#person`), ProfessionalService and WebSite. `sameAs` uses clean profile URLs (no UTM).
- `public/robots.txt` is hand-maintained (`generateRobotsTxt: false`); never block `/_next/`.
- `public/rss.xml` and `public/sitemap*.xml` are generated at build time and git-ignored.

## Data fetching

- Homepage `getStaticProps` loads MDX posts, Medium articles and the latest 3 YouTube videos, with `revalidate: 3600` (ISR). Feed failures return `[]` — the YouTube section hides itself when empty.
- Blog pages: `getStaticPaths` uses `getPublishedSlugs()`, so `draft: true` posts get no page, RSS entry or sitemap URL. A published post without a valid `date` fails the build.
- Remote images must match `images.remotePatterns` in `next.config.js`.

## Environment variables

See `.env.example`. `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (contact form; it shows an "email me directly" message when unset) and `NEXT_PUBLIC_GA_MEASUREMENT_ID`. All `.env*` files except `.env.example` are git-ignored.

## Repo hygiene

- The repo is public: no personal data dumps, keys, or the CV PDF in git.
- `.claude/settings.local.json`, `.claude/skills/`, `.agents/`, `.superpowers/` are local-only.
- `docs/` holds internal guides (e.g. `docs/google-search-console-setup.md`) and design specs/plans.
