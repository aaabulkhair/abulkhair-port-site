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

# Run Playwright tests (requires dev server running)
npx playwright test

# Run tests in headed mode for debugging
npx playwright test --headed

# Run tests for specific browser project
npx playwright test --project=chromium

# Update visual regression baselines
npx playwright test --update-snapshots

# Install Playwright browsers (run once)
npx playwright install
```

## Architecture & Structure

### Next.js App Structure
- Uses Next.js 13 with pages directory structure (not app directory)
- Main entry point: `src/pages/_app.js` - wraps all pages with ThemeContextProvider
- Homepage: `src/pages/index.js` - imports all components and renders portfolio sections

### Component Architecture
- **Component Organization**: Each major section (About, Experience, Testimonials, etc.) has its own directory in `src/components/`
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
- `experience-data.js` - Work experience entries with company logos
- `testimonials-data.js` - Client reviews and social proof
- `skills-data.js` - Technical skills (legacy - replaced by testimonials)
- `education-data.js` - Educational background
- `contacts-data.js` - Contact information and social proof metrics
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
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics measurement ID for tracking
- Environment variables are loaded via `dotenv` in `next.config.js`

## Development Notes

### Image Handling
- External images are configured in `next.config.js` domains (currently `i.ibb.co`)
- Add new image domains to the `images.domains` array in `next.config.js`
- **Logo Implementation**: Personal logo in navbar uses high-resolution PNG (5906x5906px) displayed at 80px width
  - Located at `/public/images/logo.png` with `unoptimized={true}` for crisp quality
  - CSS-based sizing: `width: 0, height: 0` props with `style={{ width: '80px', height: 'auto' }}`
  - Replaces text-based name display in navbar component

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
- **What I Do Section** (`src/components/what-i-do/`) - Conversion-optimized service showcase with social proof
- **Testimonials Section** (`src/components/testimonials/`) - Client reviews and social proof for conversions
- **Enhanced Links** (`src/components/analytics/enhanced-link-tracker.js`) - Automatic UTM tracking for all external links

#### What I Do Section - Conversion-Focused Design
**Location**: `src/components/what-i-do/what-i-do.js`
**Purpose**: Transform visitors into clients through results-oriented messaging

**Key Features**:
- **Four Service Pillars** with conversion-focused copy:
  1. **1-on-1 Consulting** - Personalized mentorship (4.9/5★, 100+ hours)
  2. **Project Development** - Complete solutions (100% Job Success, 28 projects)
  3. **Arabic Education** - Language-barrier-free learning
  4. **Technical Content** - Thought leadership and insights

- **Social Proof Integration**:
  - Rating badges (4.9/5★ with 100+ consultation hours)
  - Job success metrics (100% Job Success • 28 completed projects)
  - Community building indicators
  - Featured writer recognition

- **Technical Keywords for SEO**:
  - Time-Series: ARIMA/SARIMA/Prophet/TFT
  - LLM/AI: RAG Systems, LangChain/LangGraph
  - ML Stack: Scikit-learn/TensorFlow, FastAPI/Docker
  - Analytics: Power BI, Real-time ETL

- **Conversion Psychology Elements**:
  - Outcome-focused messaging (💡 Transform your career...)
  - Urgency indicators (Same-day booking available)
  - Social proof positioning (⭐ 4.9/5★ rating)
  - Multiple price points ($35/session to $35-45/hr)

- **Enhanced CTAs**:
  - Primary: "Book Your Session" / "Hire Me Now"
  - Bottom section: Dual CTA with 💬 and 💼 icons
  - UTM tracking: services_consulting, services_development, etc.

**Data Structure**:
```javascript
// Each service includes:
{
  title: "Service Name",
  description: "Social proof + value proposition", 
  outcome: "Specific result promise",
  features: ["Technical keywords", "..."],
  socialProof: "Metrics + credibility",
  cta: { text: "Action-oriented", url: "UTM tracked" },
  pricing: "Clear value + availability"
}
```

#### Testimonials Section - Social Proof & Conversion Optimization
**Location**: `src/components/testimonials/testimonials.js`
**Purpose**: Build trust and credibility through client testimonials to support conversions

**Key Features**:
- **Client Reviews**: Real testimonials from Topmate, Upwork, and YouTube clients
- **Service-Specific**: Reviews categorized by service type (Consulting, Development, Education)
- **Platform Integration**: Shows platform badges (Topmate ⭐, Upwork ✅, YouTube ▶️)
- **Social Proof Metrics**: Displays aggregate stats (4.9★ rating, 100+ hours, 100% success rate)

**Design Elements**:
- **Card Layout**: Clean testimonial cards with client info and ratings
- **Responsive Grid**: Auto-fit grid layout for mobile optimization  
- **Trust Indicators**: Star ratings, platform badges, and service tags
- **Color-Coded Services**: Different colors for each service type
- **Credibility Features**: Client names, roles, and companies for authenticity

**Data Structure**:
```javascript
// testimonials-data.js structure:
{
  id: 1,
  name: "Client Name",
  role: "Position, Company",
  service: "1-on-1 Consulting", // Links to What I Do services
  testimonial: "Specific results achieved...",
  rating: 5,
  platform: "Topmate", // Adds platform credibility
  featured: true // Controls display priority
}
```

**Replaced Sections**:
- **Skills Section**: Eliminated 27+ redundant skill icons that duplicated Experience tech stacks
- **Projects Section**: Removed generic template projects (less credible than real Experience)

### 📊 Content Widgets
- **YouTube Feed** (`src/components/youtube-feed/`) - Latest videos from @7adid_elsafina channel
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
- **YouTube**: https://www.youtube.com/@7adid_elsafina (Arabic Content)
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

## 🏗️ Recent Architecture Changes (Latest)

### Content Strategy Optimization
- **Removed Redundancy**: Eliminated Skills (27+ icons) and Projects sections that duplicated Experience content
- **Added Social Proof**: Replaced with Testimonials section featuring real client reviews
- **Optimized Flow**: Landing → About → What I Do → Experience → Testimonials → Content Widgets → Contact
- **Company Logos**: Added professional logos for all experience entries (ALX, ShopBrain, Jumia, etc.)

### Current Component Structure
```
Homepage Flow:
├── Landing (Hero with CTAs)
├── About (Personal introduction)  
├── What I Do (4 monetization services)
├── Experience (Real work history with logos)
├── Testimonials (Client reviews & social proof) ← NEW
├── YouTube/TikTok Feeds (Content marketing)
├── Education (Academic background)
├── Blog (Technical content)
└── Contact (Lead capture)
```

### Files Added/Modified
- **Added**: `src/components/testimonials/` - Complete testimonials system
- **Added**: `src/data/testimonials-data.js` - Client reviews and social proof data  
- **Added**: `public/images/company-logos/` - Professional company logos
- **Modified**: `src/pages/index.js` - Updated homepage component flow
- **Removed**: `src/data/projects-data.js` - Eliminated generic project templates
- **Updated**: Experience components to display company logos properly

This implementation transforms the portfolio into a complete monetization-focused hub with automated testing, comprehensive analytics, social proof optimization, and bilingual support optimized for both Arabic and English audiences.