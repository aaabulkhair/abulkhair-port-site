# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js developer portfolio website using React 18. The project is based on a portfolio template but has been customized for personal use. It uses CSS modules for styling along with Tailwind CSS for utility classes.

## Development Commands

```bash
# Start development server on port 3000
npm run dev

# Build the project for production
npm run build

# Start production server
npm start
```

## Architecture & Structure

### Next.js App Structure
- Uses Next.js 13 with pages directory structure (not app directory)
- Main entry point: `src/pages/_app.js` - wraps all pages with ThemeContextProvider
- Homepage: `src/pages/index.js` - imports all components and renders portfolio sections

### Component Architecture
- **Component Organization**: Each major section (About, Experience, Projects, etc.) has its own directory in `src/components/`
- **Component Exports**: All components are re-exported through `src/components/index.js` for clean imports
- **Data-Driven Components**: All content is stored in separate data files in `src/data/` directory

### Key Directories

```
src/
├── components/          # React components (each section in own folder)
├── contexts/           # React context providers (theme management)
├── data/              # Data files for each portfolio section
├── pages/             # Next.js pages
├── styles/            # CSS modules and global styles
└── utils/             # Utility functions
```

### Data Management Pattern
Each portfolio section has a corresponding data file:
- `about-data.js` - Personal information and bio
- `experience-data.js` - Work experience entries  
- `projects-data.js` - Project showcase items
- `skills-data.js` - Technical skills
- `education-data.js` - Educational background
- `contacts-data.js` - Contact information
- `header-data.js` - Landing page header content
- `socials-data.js` - Social media links
- `blog-data.js` - Blog configuration

### Styling System
- **CSS Modules**: Component-specific styles in `.module.css` files
- **Tailwind CSS**: Utility classes for rapid styling
- **Global Styles**: `src/styles/globals.css` for site-wide styles
- **Theme Context**: Dynamic theming system with light/dark mode support

### Third-Party Integrations
- **Lottie Animations**: For interactive animations (`lottie-react`)
- **Email Integration**: Contact form powered by EmailJS
- **Blog Integration**: Fetches blog posts from Dev.to API using `getStaticProps`
- **Material-UI**: Icons and some components

### Environment Variables
- `NEXT_PUBLIC_DEVTO_USERNAME`: Dev.to username for fetching blog posts
- Environment variables are loaded via `dotenv` in `next.config.js`

## Development Notes

### Image Handling
- External images are configured in `next.config.js` domains (currently `i.ibb.co`)
- Add new image domains to the `images.domains` array in `next.config.js`

### Theme System
- Theme context provides dynamic color schemes
- Theme colors are applied via inline styles and CSS custom properties
- Background colors are set both on `document.documentElement` and `document.body`

### Static Generation
- Homepage uses `getStaticProps` to fetch blog data at build time
- Blog posts are fetched from Dev.to API and randomly sorted

### Component Patterns
- Most components follow the pattern of importing data from corresponding data files
- Components are functional components using React hooks
- Theme colors are accessed via `useContext(ThemeContext)`

## abulkhair.ai Transformation - Complete Implementation

This project has been transformed into **abulkhair.ai** - a monetization-focused personal hub with the following implementation:

### 🎯 Monetization Components
- **Trust Badges** (`src/components/trust-badges/`) - Displays Topmate 4.9★ and Upwork 100% Job Success
- **Sticky CTA** (`src/components/sticky-cta/`) - Global booking CTA that appears on scroll
- **What I Do Section** (`src/components/what-i-do/`) - Four service pillars with contextual CTAs
- **Enhanced Links** (`src/components/analytics/enhanced-link-tracker.js`) - Automatic UTM tracking for all external links

### 📊 Content Widgets
- **YouTube Feed** (`src/components/youtube-feed/`) - Latest videos from @7adidelsafina channel
- **TikTok Feed** (`src/components/tiktok-feed/`) - Recent TikTok content with Arabic data science tips
- **Medium Integration** - Pulls latest articles via existing blog system

### 🌍 Internationalization (i18n)
- **next-intl** configured for Arabic/English support
- **Translation Files** (`messages/en.json`, `messages/ar.json`) - Complete translations
- **Middleware** (`src/middleware.js`) - Route-based language switching
- **RTL Support** - Ready for Arabic text direction

### 🔍 SEO & Analytics
- **Structured Data** (`src/components/seo/structured-data.js`) - Schema.org JSON-LD for Person, Organization, WebSite
- **SEO Head** (`src/components/seo/seo-head.js`) - Complete meta tags, OG tags, Twitter cards
- **GA4 Analytics** (`src/components/analytics/google-analytics.js`) - Full tracking with UTM campaign support
- **Link Tracking** - Automatic monetization and engagement tracking

### 🧪 Testing Framework
- **Playwright Tests** (`tests/abulkhair-ai.spec.js`) - Visual regression, SEO validation, link health
- **MCP Server** (`mcp-server.js`) - Automated testing interface with commands:
  - `node mcp-server.js visual-qa` - Run complete test suite
  - `node mcp-server.js health-check` - Quick link and functionality check  
  - `node mcp-server.js screenshot-baseline` - Update visual baselines
  - `node mcp-server.js performance-audit` - Core Web Vitals check

### 📈 UTM Tracking Convention
All external links use consistent UTM parameters:
- `utm_source=abulkhair.ai`
- `utm_medium=cta|social|contact|widget`  
- `utm_campaign=topmate_hero_primary|upwork_secondary|youtube_feed|etc`

### 🎨 Key Monetization URLs
- **Topmate**: https://topmate.io/abulkhair (Consultations)
- **Upwork**: https://www.upwork.com/freelancers/~01e8b690de797b2ecf (Project Work)
- **YouTube**: https://www.youtube.com/@7adidelsafina (Arabic Content)
- **TikTok**: https://www.tiktok.com/@7adidelsafina (Bite-sized Tips)
- **Medium**: https://medium.com/@aaabulkhair (Technical Writing)

### 🚀 Deployment Checklist
1. Set environment variables:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Google Analytics
   - `NEXT_PUBLIC_DEVTO_USERNAME=aaabulkhair` for blog integration
2. Run `npm run build` to generate production build
3. Test with `node mcp-server.js visual-qa` before deployment
4. Deploy to Vercel/Netlify with domain abulkhair.ai
5. Verify all monetization links and UTM tracking work correctly

### 🔧 Development Workflow
1. Use `npm run dev` for local development
2. Run `node mcp-server.js health-check` for quick validation
3. Use `node mcp-server.js visual-qa --headed true` for debugging tests
4. Update screenshots with `node mcp-server.js screenshot-baseline --update true`

### 📊 Success Metrics
- **Primary KPIs**: Topmate bookings, Upwork inquiries
- **Secondary KPIs**: YouTube subscribers, TikTok followers, Medium engagement
- **Technical KPIs**: Core Web Vitals scores, SEO rankings, conversion rates

This implementation transforms the portfolio into a complete monetization-focused hub with automated testing, comprehensive analytics, and bilingual support optimized for both Arabic and English audiences.