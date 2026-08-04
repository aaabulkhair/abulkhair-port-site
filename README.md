# abulkhair.ai

Personal site of **Ahmed Abulkhair** — AI Scientist specializing in LLMs, RAG systems, time-series forecasting, and Arabic data science education.

**Live:** [abulkhair.ai](https://abulkhair.ai)

## What's on the site

- Consulting & project services (Topmate / Upwork)
- Work experience, testimonials, and education
- Technical content: blog, [YouTube (Arabic)](https://www.youtube.com/@7adid_elsafina), [TikTok](https://www.tiktok.com/@7adidelsafina), [Medium](https://medium.com/@aaabulkhair)
- Contact form (EmailJS)

## Stack

- Next.js (pages router) + React
- Tailwind CSS with a dark editorial design system (gold `#e8c47c` on `#0a0a0a`)
- Data-driven sections — all content lives in `src/data/`
- GA4 analytics with UTM tracking, Schema.org structured data, generated sitemap
- Playwright for visual/functional QA

## Development

```bash
npm install
cp .env.example .env   # fill in EmailJS + GA values
npm run dev            # http://localhost:3000

npm run build          # production build (also generates sitemap)
npx playwright test    # run the test suite (dev server required)
```

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` | Contact form delivery |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_DEVTO_USERNAME` | Blog feed fallback |

## Project structure

```
src/
├── components/   # One folder per section, re-exported via index.js
├── data/         # Content for every section (edit these, not components)
├── pages/        # Next.js pages (homepage, services/*, blog)
├── styles/       # globals.css + CSS modules
└── contexts/     # Theme context (locked dark theme)
```

See `CLAUDE.md` for detailed architecture and workflow notes.

## Deployment

Deployed on Vercel; pushes to `main` go to production. Environment variables must be set in the Vercel dashboard.
