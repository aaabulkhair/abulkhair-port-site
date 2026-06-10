# Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio site from a template-based look into an editorial & craft design with monochrome + warm gold accent palette, ruled numbered sections, and asymmetric hero — while preserving every piece of existing content.

**Architecture:** Rewrite visual layer of existing Next.js components using Tailwind CSS utility classes and CSS custom properties. Replace CSS modules with Tailwind where possible. Update theme context values to match new design system. All data files updated with new role (AI Scientist @ Incept Labs).

**Tech Stack:** Next.js 13 (pages dir), React 18, Tailwind CSS, Inter font (Google Fonts)

**Constraint:** ZERO INFORMATION LOSS. Every text, link, metric, CTA, UTM param, and data point must be preserved.

---

## Dependency Graph

```
Task 1 (Foundation) ──► All other tasks depend on this
Task 2 (Data) ──► Tasks 4, 7 need updated data
Tasks 3-12 are independent of each other (can parallelize after 1+2)
Task 13 (Index + SEO) ──► depends on all component tasks
Task 14 (Verify) ──► depends on everything
```

---

### Task 1: Design Foundation

**Files:**
- Modify: `src/theme/theme.js`
- Modify: `tailwind.config.js`
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Update theme.js with new palette**

Replace the entire file:

```js
/* eslint-disable */
import { contactsGreen } from './images'

export const theLightTheme = {
    type: 'light',
    primary: '#e8c47c',
    primaryRgb: '232, 196, 124',
    quaternary: '#f5f5f5',
    quaternaryRgb: '245, 245, 245',
    quaternaryLight: '#666666',
    secondary: '#ffffff',
    secondaryRgb: '255, 255, 255',
    sectionAlt: '#fafafa',
    sectionAltRgb: '250, 250, 250',
    tertiary: '#0a0a0a',
    tertiaryRgb: '10, 10, 10',
    buttonColor: '#0a0a0a',
    contactsimg: contactsGreen
}

export const theDarkTheme = {
    type: 'dark',
    primary: '#e8c47c',
    primaryRgb: '232, 196, 124',
    secondary: '#0a0a0a',
    secondaryRgb: '10, 10, 10',
    sectionAlt: '#0a0a0a',
    sectionAltRgb: '10, 10, 10',
    quaternary: '#0a0a0a',
    quaternaryRgb: '10, 10, 10',
    quaternaryLight: 'rgba(255,255,255,0.35)',
    tertiary: '#f0f0f0',
    tertiaryRgb: '240, 240, 240',
    buttonColor: 'rgba(255,255,255,0.35)',
    contactsimg: contactsGreen
}
```

- [ ] **Step 2: Update tailwind.config.js**

Replace the entire file:

```js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8c47c',
        'primary-dim': 'rgba(232,196,124,0.15)',
        bg: '#0a0a0a',
        'bg-surface': 'rgba(255,255,255,0.02)',
        'text-primary': '#f0f0f0',
        'text-secondary': 'rgba(255,255,255,0.35)',
        'text-muted': 'rgba(255,255,255,0.15)',
        rule: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1400px',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Rewrite globals.css**

Replace the entire file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  box-sizing: border-box;
}

html, body, #__next {
  height: 100%;
  width: 100%;
  min-width: 320px;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  background-color: #0a0a0a;
  color: #f0f0f0;
}

html, body {
  overflow-x: hidden;
}

a {
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 0;
}

:root {
  --primaryFont: 'Inter', system-ui, sans-serif;
  --bg: #0a0a0a;
  --bg-surface: rgba(255,255,255,0.02);
  --text-primary: #f0f0f0;
  --text-secondary: rgba(255,255,255,0.35);
  --text-muted: rgba(255,255,255,0.15);
  --accent: #e8c47c;
  --accent-dim: rgba(232,196,124,0.15);
  --rule: rgba(255,255,255,0.06);
}

/* Section label pattern */
.section-label {
  font-size: 0.6rem;
  color: var(--text-muted);
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

/* Section rule */
.section-rule {
  border-bottom: 1px solid var(--rule);
}
```

- [ ] **Step 4: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds (some visual breakage is fine at this stage — later tasks fix components)

- [ ] **Step 5: Commit**

```bash
git add src/theme/theme.js tailwind.config.js src/styles/globals.css
git commit -m "feat: establish editorial design system with gold accent palette"
```

---

### Task 2: Content Data Updates

**Files:**
- Modify: `src/data/header-data.js`
- Modify: `src/data/about-data.js`
- Modify: `src/data/experience-data.js`

- [ ] **Step 1: Update header-data.js**

Replace the entire `headerData` export:

```js
import profile from '../assets/png/profile.png';

export const headerData = {
    name: 'Ahmed Abulkhair',
    title: "AI Scientist @ Incept Labs",
    description: "Specializing in LLMs, Time-Series Forecasting, and AI Solutions. Book a consultation or hire me for your next project. Available in Arabic and English.",
    image: profile,
    imagebw: profile,
    resumePdf: '',
    ctaPrimary: {
        text: 'Book Consultation',
        url: 'https://topmate.io/abulkhair?utm_source=abulkhair.ai&utm_medium=cta&utm_campaign=topmate_hero_primary',
        external: true
    },
    ctaSecondary: {
        text: 'Hire on Upwork',
        url: 'https://www.upwork.com/freelancers/~01e8b690de797b2ecf?utm_source=abulkhair.ai&utm_medium=cta&utm_campaign=upwork_hero_secondary',
        external: true
    },
    trustBadges: [
        {
            platform: 'Topmate',
            rating: '4.9/5.0',
            metric: 'Stars',
            icon: '/images/topmate-icon.svg'
        },
        {
            platform: 'Upwork',
            rating: '100%',
            metric: 'Job Success',
            icon: '/images/upwork-icon.svg'
        }
    ],
    languages: ['Arabic', 'English'],
    specialties: ['LLMs & AI Agents', 'Time-Series Forecasting', 'Data Science Consulting', 'Educational AI']
}
```

Key changes: `title` updated, `specialties` replaces "Power BI Solutions" with "Educational AI".

- [ ] **Step 2: Update about-data.js**

```js
export const aboutData = {
    title: "Who am I",
    description1: "My name is Ahmed Abulkhair. I'm an AI Scientist at Incept Labs specializing in Large Language Models (LLMs), machine learning, and AI solutions.",
    description2: "I am a passionate data scientist with expertise in Python, NLP, deep learning, and building scalable AI applications. I specialize in transforming complex data into actionable insights and developing innovative machine learning solutions. My experience spans across various domains including natural language processing, predictive modeling, and artificial intelligence implementation.",
    image: 1
}
```

Only change: `description1` updated to "AI Scientist at Incept Labs".

- [ ] **Step 3: Add Incept Labs to experience-data.js**

Add this entry as the first element (id: 0) at the top of the `experienceData` array:

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
},
```

Insert this before the existing ALX Africa entry (id: 1). Do NOT remove or modify any existing entries.

- [ ] **Step 4: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/data/header-data.js src/data/about-data.js src/data/experience-data.js
git commit -m "feat: update role to AI Scientist @ Incept Labs, add Incept Labs experience"
```

---

### Task 3: Navbar Rewrite

**Files:**
- Modify: `src/components/navbar/navbar.js`
- Modify: `src/styles/navbar.module.css` (keep but simplify, or inline with Tailwind)

- [ ] **Step 1: Rewrite navbar.js**

Replace the entire component:

```jsx
import Image from 'next/image';
import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import Link from '../link';

function Navbar() {
    const { theme } = useContext(ThemeContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/#about' },
        { label: 'Services', href: '/#services' },
        { label: 'Resume', href: '/#experience' },
        { label: 'Blog', href: '/#blog' },
        { label: 'Contact', href: '/#contacts' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'backdrop-blur-md bg-[#0a0a0a]/80' : 'bg-transparent'
            }`}
        >
            <div className="max-w-page mx-auto px-6 md:px-12 flex justify-between items-center h-16 border-b border-rule">
                <Link href="/">
                    <span className="text-sm font-bold tracking-wider text-text-primary cursor-pointer">
                        AA
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-[0.7rem] tracking-[1px] uppercase text-text-secondary hover:text-primary transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar/navbar.js
git commit -m "feat: rewrite navbar with editorial design"
```

---

### Task 4: Hero / Landing Rewrite

**Files:**
- Modify: `src/components/landing/landing.js`

- [ ] **Step 1: Rewrite landing.js as asymmetric split**

Replace the entire component:

```jsx
import Image from 'next/image';
import React, { useContext } from 'react';
import { FaGithub, FaLinkedin, FaMediumM, FaYoutube, FaTiktok } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/theme-context';
import { headerData } from '../../data/header-data';
import { socialsData } from '../../data/socials-data';
import { MonetizationLink } from '../analytics/enhanced-link-tracker';

function Landing() {
    const { drawerOpen, theme } = useContext(ThemeContext);

    const socials = [
        { icon: FaLinkedin, href: socialsData.linkedIn, label: 'LinkedIn' },
        { icon: FaGithub, href: socialsData.github, label: 'GitHub' },
        { icon: FaMediumM, href: socialsData.medium, label: 'Medium' },
        { icon: FaYoutube, href: 'https://www.youtube.com/@7adid_elsafina', label: 'YouTube' },
        { icon: FaTiktok, href: 'https://www.tiktok.com/@7adid_elsafina', label: 'TikTok' },
    ].filter(s => s.href);

    return (
        <div className="min-h-screen flex items-center bg-bg pt-16">
            <div className="max-w-page mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center relative">
                {/* Left — Content */}
                <div className="flex-[1.3] py-12 md:pr-16">
                    <p className="text-[0.65rem] tracking-[4px] uppercase text-text-muted mb-8">
                        {headerData.title}
                    </p>
                    <h1 className="text-5xl md:text-7xl font-light leading-[1.05] tracking-tight">
                        {headerData.name.split(' ')[0]}
                        <br />
                        <span className="font-extrabold">{headerData.name.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-base text-text-secondary leading-relaxed mt-6 max-w-md">
                        {headerData.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        {headerData.ctaPrimary && (
                            <MonetizationLink
                                href={headerData.ctaPrimary.url}
                                platform="topmate"
                                position="hero_primary"
                                value={35}
                            >
                                <span className="inline-flex items-center justify-center px-7 py-3 bg-primary text-bg rounded font-semibold text-sm hover:opacity-90 transition-opacity">
                                    {headerData.ctaPrimary.text}
                                </span>
                            </MonetizationLink>
                        )}
                        {headerData.ctaSecondary && (
                            <MonetizationLink
                                href={headerData.ctaSecondary.url}
                                platform="upwork"
                                position="hero_secondary"
                                value={35}
                            >
                                <span className="inline-flex items-center justify-center px-7 py-3 border border-primary/30 text-primary rounded text-sm hover:border-primary/60 transition-colors">
                                    {headerData.ctaSecondary.text}
                                </span>
                            </MonetizationLink>
                        )}
                    </div>

                    {/* Trust badges as subtle metadata */}
                    <div className="flex gap-8 mt-6 text-[0.7rem] text-text-muted tracking-wide">
                        {headerData.trustBadges?.map((badge, i) => (
                            <span key={i}>{badge.platform} {badge.rating} {badge.metric === 'Stars' ? '\u2605' : badge.metric}</span>
                        ))}
                    </div>
                </div>

                {/* Right — Photo + Socials */}
                <div className="flex-[0.7] flex items-center justify-center relative py-12">
                    <div className={`w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border border-rule transition-opacity duration-300 ${drawerOpen ? 'opacity-0' : 'opacity-100'}`}>
                        <Image
                            src={headerData.image}
                            alt={headerData.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-full"
                        />
                    </div>

                    {/* Social icons — stacked vertically on right edge */}
                    <div className="hidden md:flex flex-col gap-4 absolute right-0 top-1/2 -translate-y-1/2">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-7 h-7 rounded-full border border-rule flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors"
                                aria-label={s.label}
                            >
                                <s.icon size={12} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Subtle vertical divider */}
                <div className="hidden md:block absolute top-[10%] bottom-[10%] left-[58%] w-px bg-gradient-to-b from-transparent via-rule to-transparent" />
            </div>
        </div>
    );
}

export default Landing;
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/landing.js
git commit -m "feat: rewrite hero as editorial asymmetric split"
```

---

### Task 5: About Section Rewrite

**Files:**
- Modify: `src/components/about/about.js`

- [ ] **Step 1: Rewrite about.js**

Replace the entire component:

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { aboutData } from '../../data/about-data';

function About() {
    const { theme } = useContext(ThemeContext);

    return (
        <section
            className="border-b border-rule py-16"
            id="about"
            style={{ backgroundColor: theme.secondary }}
        >
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">01 / About</p>
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12">
                    <div>
                        <p className="text-[0.95rem] text-text-secondary leading-[1.8]">
                            {aboutData.description1}
                        </p>
                        <br />
                        <p className="text-[0.95rem] text-text-secondary leading-[1.8]">
                            {aboutData.description2}
                        </p>
                    </div>
                    <div>{/* Breathing room — intentionally empty */}</div>
                </div>
            </div>
        </section>
    );
}

export default About;
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/about/about.js
git commit -m "feat: rewrite about section with editorial ruled layout"
```

---

### Task 6: Services / What I Do Rewrite

**Files:**
- Modify: `src/components/what-i-do/what-i-do.js`

- [ ] **Step 1: Rewrite what-i-do.js**

Replace the entire component. Key changes: remove emojis, use editorial card style with left-border accent, preserve all service data including features, social proof, CTAs with UTM params.

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';

function WhatIDo() {
    const { theme } = useContext(ThemeContext);

    const services = [
        {
            title: '1-on-1 Consulting',
            description: 'Get personalized guidance from a Top 1% Topmate mentor. 100+ hours of successful consultations delivered.',
            outcome: 'Transform your career or solve complex ML and data challenges with expert guidance.',
            features: [
                'Machine Learning (Scikit-learn/TensorFlow/PyTorch)',
                'Time-Series Forecasting (ARIMA/SARIMA/Prophet/TFT)',
                'LLM Integration & RAG Systems (LangChain/LangGraph)',
                'Career Mentorship & Interview Prep',
                'Project Architecture & Best Practices'
            ],
            socialProof: 'Top 1% on Topmate \u2022 4.9/5\u2605 rating \u2022 100+ consultation hours',
            cta: {
                text: 'Book Your Session',
                url: `${contactsData.monetizationLinks.primary.url}&utm_campaign=services_consulting`,
            },
            pricing: 'Flexible scheduling available'
        },
        {
            title: 'Project Development',
            description: 'Complete data science solutions delivered by a Top Rated Upwork freelancer with 100% Job Success Rate.',
            outcome: 'Launch production-ready ML systems that drive measurable business results.',
            features: [
                'End-to-End ML Pipelines (Scikit-learn/TensorFlow/PyTorch)',
                'LLM & AI Agents Development (LangChain/RAG Systems)',
                'Real-time Data Processing & Model Deployment',
                'API Development & Containerization (FastAPI/Docker)'
            ],
            socialProof: 'Top Rated Upwork Freelancer \u2022 100% Job Success Rate',
            cta: {
                text: 'Hire Me Now',
                url: `${contactsData.monetizationLinks.secondary.url}&utm_campaign=services_development`,
            },
            pricing: 'Ready to work on your project directly'
        },
        {
            title: 'Arabic Data Science Education',
            description: 'Breaking language barriers in data science education. Helping Arabic speakers master AI and data science.',
            outcome: 'Master data science concepts in your native language with practical, industry-focused content.',
            features: [
                'YouTube Deep-dive Tutorials (Arabic)',
                'TikTok Quick Learning Bites',
                'Real-world Case Studies & Projects',
                'Career Transition Guidance'
            ],
            socialProof: 'Growing Arabic DS community',
            cta: {
                text: 'Subscribe Now',
                url: `${contactsData.youtube}?utm_source=abulkhair.ai&utm_campaign=services_education`,
            },
            pricing: 'Free content \u2022 Premium courses coming soon'
        },
        {
            title: 'Agentic AI & RAG Solutions',
            description: 'Cutting-edge AI agent development and RAG system implementation. Specializing in LangChain, autonomous agents, and intelligent automation.',
            outcome: 'Build intelligent AI agents that can reason, plan, and execute complex tasks autonomously.',
            features: [
                'RAG Systems with Vector Databases (Pinecone/Chroma)',
                'Multi-Agent Architectures (LangGraph/CrewAI)',
                'Tool-Using AI Agents & Function Calling',
                'Conversational AI & Chatbot Development',
                'LLM Fine-tuning & Custom Model Training'
            ],
            socialProof: 'Cutting-edge AI expertise \u2022 ALX Africa Senior Data Scientist',
            cta: {
                text: 'Build AI Agents',
                url: `${contactsData.monetizationLinks.primary.url}&utm_campaign=services_agentic_ai`,
            },
            pricing: 'Enterprise AI solutions available'
        },
        {
            title: 'Technical Content & Thought Leadership',
            description: 'In-depth technical articles and industry insights. Sharing real-world solutions to complex data challenges.',
            outcome: 'Stay ahead of industry trends and learn from practical implementation experiences.',
            features: [
                'Deep Technical Tutorials & Walkthroughs',
                'Industry Trend Analysis & Predictions',
                'Case Studies from Real Projects',
                'Best Practices & Lessons Learned'
            ],
            socialProof: 'Featured technical writer',
            cta: {
                text: 'Read Latest Articles',
                url: `${contactsData.medium}?utm_source=abulkhair.ai&utm_campaign=services_writing`,
            },
            pricing: 'Free insights \u2022 Sponsor content available'
        }
    ];

    return (
        <section className="border-b border-rule py-16" id="services" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">02 / Services</p>
                <h2 className="text-3xl font-light tracking-tight mb-2">
                    How I Can Help You <strong className="font-bold">Succeed</strong>
                </h2>
                <p className="text-sm text-text-secondary mb-8">
                    Five proven ways to accelerate your data science journey and business growth.{' '}
                    <strong className="text-text-primary">Trusted by 100+ clients with 4.9/5&#9733; rating.</strong>
                </p>

                {/* Top row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {services.slice(0, 3).map((service, index) => (
                        <ServiceCard key={index} service={service} theme={theme} />
                    ))}
                </div>

                {/* Bottom row: 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.slice(3).map((service, index) => (
                        <ServiceCard key={index + 3} service={service} theme={theme} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, theme }) {
    return (
        <div className="p-6 bg-bg-surface border-l-2 border-rule rounded-r hover:border-l-primary transition-colors duration-200">
            <h4 className="text-[0.85rem] font-semibold text-text-primary mb-2">{service.title}</h4>
            <p className="text-[0.75rem] text-text-secondary leading-relaxed mb-3">{service.description}</p>

            <p className="text-[0.75rem] text-primary/70 font-medium italic mb-3">
                {service.outcome}
            </p>

            <ul className="mb-3 space-y-1">
                {service.features.map((feature, idx) => (
                    <li key={idx} className="text-[0.7rem] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-rule">
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="text-[0.65rem] text-primary/50 font-semibold text-center bg-primary-dim rounded py-2 px-3 mb-3">
                {service.socialProof}
            </div>

            <div className="text-[0.65rem] text-primary/60 mb-3">{service.pricing}</div>

            <a
                href={service.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[0.7rem] text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors"
            >
                {service.cta.text} &rarr;
            </a>
        </div>
    );
}

export default WhatIDo;
```

- [ ] **Step 2: Delete the old CSS module** (no longer needed since fully Tailwind now)

Delete `src/components/what-i-do/what-i-do.module.css` if it exists.

- [ ] **Step 3: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/what-i-do/what-i-do.js
git rm src/components/what-i-do/what-i-do.module.css 2>/dev/null; true
git commit -m "feat: rewrite services section with editorial card design"
```

---

### Task 7: Experience Section Rewrite (Vertical Timeline)

**Files:**
- Modify: `src/components/experience/experience.js`
- Modify: `src/components/experience/experience-card.js`

- [ ] **Step 1: Rewrite experience.js as vertical timeline**

Replace the entire component. Removes horizontal scroller, Lottie animation, intersection observers, wheel events, and debug console.logs.

```jsx
import React, { useContext, useMemo, useState } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { experienceData } from '../../data/experience-data';

function Experience() {
    const { theme } = useContext(ThemeContext);
    const [showAll, setShowAll] = useState(false);

    const sortedExperiences = useMemo(() => {
        return [...experienceData]
            .sort((a, b) => {
                if (a.company === 'Incept Labs') return -1;
                if (b.company === 'Incept Labs') return 1;
                if (a.company === 'ALX Africa') return -1;
                if (b.company === 'ALX Africa') return 1;
                const aTime = new Date(a.endYear === 'Present' ? Date.now() : a.endYear);
                const bTime = new Date(b.endYear === 'Present' ? Date.now() : b.endYear);
                if (bTime.getTime() === aTime.getTime()) {
                    return new Date(b.startYear).getTime() - new Date(a.startYear).getTime();
                }
                return bTime.getTime() - aTime.getTime();
            });
    }, []);

    const visibleCount = showAll ? sortedExperiences.length : 4;
    const visible = sortedExperiences.slice(0, visibleCount);
    const remaining = sortedExperiences.length - visibleCount;

    return (
        <section className="border-b border-rule py-16" id="experience" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">03 / Experience</p>

                <div className="flex flex-col">
                    {visible.map((exp) => (
                        <ExperienceItem key={exp.id} exp={exp} theme={theme} />
                    ))}
                </div>

                {remaining > 0 && !showAll && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="mt-4 text-[0.7rem] text-text-muted hover:text-primary transition-colors"
                    >
                        + {remaining} more positions &rarr;
                    </button>
                )}
                {showAll && sortedExperiences.length > 4 && (
                    <button
                        onClick={() => setShowAll(false)}
                        className="mt-4 text-[0.7rem] text-text-muted hover:text-primary transition-colors"
                    >
                        Show less
                    </button>
                )}
            </div>
        </section>
    );
}

function ExperienceItem({ exp, theme }) {
    const [expanded, setExpanded] = useState(false);

    const CompanyTag = exp.companyUrl ? 'a' : 'span';
    const companyProps = exp.companyUrl
        ? { href: exp.companyUrl, target: '_blank', rel: 'noopener noreferrer', className: 'hover:underline' }
        : {};

    return (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8 py-5 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
            <div className="text-[0.7rem] text-text-muted pt-0.5">
                {exp.startYear} &ndash; {exp.endYear}
            </div>
            <div>
                <div className="text-[0.85rem] font-semibold text-text-primary">
                    <CompanyTag {...companyProps}>{exp.company}</CompanyTag>
                </div>
                <div className="text-[0.75rem] text-primary/70 mb-1">{exp.jobtitle}</div>
                {(exp.location || exp.employmentType) && (
                    <div className="text-[0.65rem] text-text-muted mb-2">
                        {[exp.location, exp.employmentType].filter(Boolean).join(' \u2022 ')}
                    </div>
                )}
                <p className="text-[0.75rem] text-text-secondary leading-relaxed">
                    {exp.description}
                </p>

                {expanded && (
                    <>
                        {exp.achievements?.length > 0 && (
                            <ul className="mt-3 space-y-1">
                                {exp.achievements.map((a, i) => (
                                    <li key={i} className="text-[0.7rem] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-rule">
                                        {a}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

                {exp.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.tech.map((t, i) => (
                            <span key={i} className="text-[0.6rem] text-text-muted px-2 py-0.5 border border-rule rounded-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {exp.achievements?.length > 0 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 text-[0.65rem] text-text-muted hover:text-primary transition-colors"
                    >
                        {expanded ? 'Show less' : 'Show details \u2192'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Experience;
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/experience/experience.js
git commit -m "feat: rewrite experience as editorial vertical timeline"
```

---

### Task 8: Education Section Rewrite

**Files:**
- Modify: `src/components/education/education.js`

- [ ] **Step 1: Rewrite education.js**

Replace the entire component. Removes horizontal scroller and Lottie animation, uses same ruled format as experience.

```jsx
import React, { useContext, useMemo } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { educationData } from '../../data/education-data';

function Education() {
    const { theme } = useContext(ThemeContext);

    const sortedEducation = useMemo(() => {
        return [...educationData].sort((a, b) => parseInt(b.startYear) - parseInt(a.startYear));
    }, []);

    return (
        <section className="border-b border-rule py-16" id="education" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">04 / Education</p>

                <div className="flex flex-col">
                    {sortedEducation.map((edu) => (
                        <div key={edu.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8 py-5 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
                            <div className="text-[0.7rem] text-text-muted pt-0.5">
                                {edu.startYear} &ndash; {edu.endYear}
                            </div>
                            <div>
                                <div className="text-[0.85rem] font-semibold text-text-primary">{edu.institution}</div>
                                <div className="text-[0.75rem] text-primary/70 mb-1">{edu.course}</div>
                                {(edu.location || edu.grade) && (
                                    <div className="text-[0.65rem] text-text-muted mb-2">
                                        {[edu.location, edu.grade].filter(Boolean).join(' \u2022 ')}
                                    </div>
                                )}
                                <p className="text-[0.75rem] text-text-secondary leading-relaxed">{edu.description}</p>

                                {edu.subjects?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {edu.subjects.map((s, i) => (
                                            <span key={i} className="text-[0.6rem] text-text-muted px-2 py-0.5 border border-rule rounded-sm">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {edu.achievements?.length > 0 && (
                                    <ul className="mt-3 space-y-1">
                                        {edu.achievements.map((a, i) => (
                                            <li key={i} className="text-[0.7rem] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-rule">
                                                {a}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/education/education.js
git commit -m "feat: rewrite education with editorial ruled layout"
```

---

### Task 9: Testimonials Rewrite

**Files:**
- Modify: `src/components/testimonials/testimonials.js`

- [ ] **Step 1: Rewrite testimonials.js**

Replace the entire component. Removes emoji platform icons, uses editorial quote cards with gold accent.

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { featuredTestimonials } from '../../data/testimonials-data';

function Testimonials() {
    const { theme } = useContext(ThemeContext);

    return (
        <section className="border-b border-rule py-16" id="testimonials" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">05 / Testimonials</p>
                <h2 className="text-3xl font-light tracking-tight mb-2">
                    What Clients <strong className="font-bold">Say</strong>
                </h2>
                <p className="text-sm text-text-secondary mb-8">
                    Real results from 100+ consultations and 28+ successful projects
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredTestimonials.map((t) => (
                        <div key={t.id} className="relative p-6 bg-bg-surface rounded">
                            {/* Opening quote mark */}
                            <span className="absolute top-2 left-4 text-5xl text-primary/10 font-serif leading-none select-none">
                                &ldquo;
                            </span>

                            <p className="text-[0.8rem] text-text-secondary leading-relaxed italic pt-4 mb-4">
                                {t.testimonial}
                            </p>

                            <div className="text-[0.75rem] font-semibold text-text-primary">{t.name}</div>
                            <div className="text-[0.65rem] text-text-muted mb-3">{t.role}</div>

                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-[0.65rem] text-primary">
                                    {Array.from({ length: t.rating }, () => '\u2605').join('')} {t.rating}/5
                                </span>
                                <span className="text-[0.6rem] text-text-muted px-2 py-0.5 border border-rule rounded-sm">
                                    {t.platform}
                                </span>
                                <span className="text-[0.6rem] text-primary/50 px-2 py-0.5 border border-primary/15 rounded-sm">
                                    {t.service}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats bar */}
                <div className="flex justify-center gap-12 mt-8 p-6 bg-bg-surface rounded">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">4.9</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">&#9733; Average Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">100+</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">Hours of Consultations</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">Job Success Rate</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/testimonials/testimonials.js
git commit -m "feat: rewrite testimonials with editorial quote cards"
```

---

### Task 10: Content Feeds Restyle (YouTube, TikTok, Blog)

**Files:**
- Modify: `src/components/youtube-feed/youtube-feed.js`
- Modify: `src/components/tiktok-feed/tiktok-feed.js`
- Modify: `src/components/blog/blog.js`

These components keep all their data-fetching and embed logic. Only the wrapper markup and heading styles change.

- [ ] **Step 1: Restyle YouTube feed header and wrapper**

In `src/components/youtube-feed/youtube-feed.js`, wrap the return JSX in the editorial section pattern. Change the outer `<div className={styles.youtubeFeed}>` to:

```jsx
<section className="border-b border-rule py-16" style={{ backgroundColor: theme.secondary }}>
    <div className="max-w-page mx-auto px-6 md:px-12">
        <p className="section-label">06 / YouTube</p>
```

Replace the `<div className={styles.header}>...</div>` block with:

```jsx
<div className="flex items-center gap-3 mb-6">
    <img src="/images/7adidelsafina-logo.png" alt="7adid_elsafina logo" className="w-8 h-8 rounded-full" />
    <div>
        <h3 className="text-sm font-semibold text-text-primary">YouTube</h3>
        <p className="text-[0.7rem] text-text-secondary">Data Science in Arabic</p>
    </div>
</div>
```

Replace `<div className={styles.videosGrid}>` with `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">`.

Replace each `<div className={styles.videoCard} ...>` with `<div className="bg-bg-surface rounded overflow-hidden">`.

Replace `<div className={styles.thumbnail}>` with `<div className="relative aspect-video overflow-hidden">`. Remove the `<div className={styles.playButton}>` play button overlay.

Replace `<div className={styles.videoInfo}>` with `<div className="p-4">`.

Replace `<h4 className={styles.videoTitle}...>` with `<h4 className="text-[0.75rem] font-medium text-text-primary mb-1">`.

Replace `<p className={styles.videoDescription}...>` with `<p className="text-[0.65rem] text-text-secondary line-clamp-2">`.

Replace `<div className={styles.videoMeta}>` with `<div className="flex items-center justify-between mt-3">`.

Replace `<span className={styles.publishDate}...>` with `<span className="text-[0.6rem] text-text-muted">`.

Replace the watch button with: `<a ... className="text-[0.65rem] text-primary border-b border-primary/20 pb-px">Watch</a>`.

Replace the `<div className={styles.cta}>` block with:

```jsx
<div className="mt-6 text-center">
    <p className="text-[0.75rem] text-text-secondary mb-3">
        Love the content? Subscribe for more data science tutorials in Arabic!
    </p>
    <a
        href="https://www.youtube.com/@7adid_elsafina?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2 text-[0.7rem] text-primary border border-primary/30 rounded hover:border-primary/60 transition-colors"
    >
        Subscribe
    </a>
</div>
```

Close with `</div></section>`.

Also update loading and error states to use `text-text-secondary` and `text-text-muted` instead of `theme.tertiary`.

- [ ] **Step 2: Restyle TikTok feed wrapper**

In `src/components/tiktok-feed/tiktok-feed.js`, wrap in editorial section:

Replace `<div className={styles.tiktokFeed}>` with:
```jsx
<section className="border-b border-rule py-16" style={{ backgroundColor: theme.secondary }}>
    <div className="max-w-page mx-auto px-6 md:px-12">
        <p className="section-label">07 / TikTok</p>
```

Replace the header block with:
```jsx
<div className="flex items-center gap-3 mb-6">
    <img src="/images/7adidelsafina-logo.png" alt="7adid_elsafina logo" className="w-8 h-8 rounded-full" />
    <div>
        <h3 className="text-sm font-semibold text-text-primary">TikTok</h3>
        <p className="text-[0.7rem] text-text-secondary">Data Science in Arabic</p>
    </div>
</div>
```

Replace `<div className={styles.embedContainer}>` with `<div className="mb-6">`. Keep the TikTok blockquote embed as-is (it's a third-party embed).

Replace `<div className={styles.cta}>` block with:
```jsx
<div className="text-center">
    <p className="text-[0.75rem] text-text-secondary mb-3">
        Join 2,300+ data scientists learning together
    </p>
    <a
        href={contactsData.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2 text-[0.7rem] text-primary border border-primary/30 rounded hover:border-primary/60 transition-colors"
    >
        Follow on TikTok
    </a>
</div>
```

Close with `</div></section>`.

- [ ] **Step 3: Restyle Blog wrapper**

In `src/components/blog/blog.js`, wrap in editorial section. The `SingleBlog` card component keeps its existing functionality.

Replace the outer wrapper and header. Keep the `blogs.length > 0` check. The new structure:

```jsx
{blogs.length > 0 && (
    <section className="border-b border-rule py-16" id="blog" style={{ backgroundColor: theme.secondary }}>
        <div className="max-w-page mx-auto px-6 md:px-12">
            <p className="section-label">08 / Blog</p>
            <div className="flex items-center gap-3 mb-6">
                <img src="/images/medium-logo.webp" alt="Medium logo" className="w-8 h-8 rounded" />
                <div>
                    <h3 className="text-sm font-semibold text-text-primary">Medium</h3>
                    <p className="text-[0.7rem] text-text-secondary">Technical Content & Insights</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {blogs.slice(0, 3).reverse().map(blog => (
                    <SingleBlog ... />  {/* Keep existing props */}
                ))}
            </div>
            {blogs.length > 3 && (
                <div className="mt-6 text-center">
                    <Link href="/blog">
                        <span className="text-[0.7rem] text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors cursor-pointer">
                            View All Articles &rarr;
                        </span>
                    </Link>
                </div>
            )}
        </div>
    </section>
)}
```

- [ ] **Step 4: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/youtube-feed/youtube-feed.js src/components/tiktok-feed/tiktok-feed.js src/components/blog/blog.js
git commit -m "feat: restyle content feeds with editorial section layout"
```

---

### Task 11: Contact Section Rewrite

**Files:**
- Modify: `src/components/contacts/contacts.js`

- [ ] **Step 1: Rewrite contacts.js**

Keep all EmailJS logic, form validation, and Snackbar. Update the layout and styling to editorial design.

Replace the return JSX (keep all state, refs, and handler functions unchanged):

```jsx
return (
    <section
        className="border-b border-rule py-16"
        id="contacts"
        style={{ backgroundColor: theme.secondary }}
    >
        <div className="max-w-page mx-auto px-6 md:px-12">
            <p className="section-label">09 / Contact</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left — Info */}
                <div>
                    <h2 className="text-2xl font-light tracking-tight mb-4">
                        Let&apos;s work <strong className="font-bold">together</strong>
                    </h2>
                    <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-6">
                        Whether you need a consultation, project development, or just want to connect — I&apos;m here to help.
                    </p>
                    <div className="flex flex-col gap-3">
                        <a href={`mailto:${contactsData.email}`} className="text-[0.8rem] text-primary hover:text-primary/80 transition-colors">
                            {contactsData.email}
                        </a>
                        <span className="text-[0.8rem] text-text-secondary">{contactsData.address}</span>
                        <a href={contactsData.topmate} target="_blank" rel="noreferrer" className="text-[0.8rem] text-primary hover:text-primary/80 transition-colors">
                            topmate.io/abulkhair
                        </a>
                    </div>

                    {/* Social icons */}
                    <div className="flex gap-3 mt-6">
                        {socialsData.linkedIn && (
                            <a href={socialsData.linkedIn} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-rule flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors" aria-label="LinkedIn">
                                <FaLinkedinIn size={14} />
                            </a>
                        )}
                        {socialsData.github && (
                            <a href={socialsData.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-rule flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors" aria-label="GitHub">
                                <FaGithub size={14} />
                            </a>
                        )}
                        {socialsData.medium && (
                            <a href={socialsData.medium} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-rule flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors" aria-label="Medium">
                                <FaMediumM size={14} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Right — Form */}
                <div>
                    <form ref={form} onSubmit={handleContactForm} className="flex flex-col gap-4">
                        <div>
                            <label className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Name</label>
                            <input
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="user_name"
                                className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Email</label>
                            <input
                                placeholder="john@doe.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="user_email"
                                className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[0.7rem] text-text-muted uppercase tracking-wider mb-1 block">Message</label>
                            <textarea
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                name="message"
                                rows={5}
                                className="w-full bg-bg-surface border border-rule rounded px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:outline-none transition-colors resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="self-start px-6 py-2.5 bg-primary text-bg rounded text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            {!success ? 'Send' : 'Sent'}
                            {success && <AiOutlineCheckCircle />}
                        </button>
                    </form>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={open}
                        autoHideDuration={4000}
                        onClose={handleClose}
                    >
                        <SnackbarContent
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                            style={{ backgroundColor: '#e8c47c', color: '#0a0a0a', fontFamily: 'Inter, system-ui, sans-serif' }}
                            message={errMsg}
                        />
                    </Snackbar>
                </div>
            </div>
        </div>
    </section>
);
```

Keep the existing imports but add `FaGithub, FaMediumM` from react-icons. Remove unused imports (`FaFacebook, FaStackOverflow, FaTwitter, FiPhone, HiOutlineLocationMarker, Image`). Keep `FaLinkedinIn`. Remove the contacts background image at the bottom.

- [ ] **Step 2: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/contacts/contacts.js
git commit -m "feat: rewrite contact section with editorial design"
```

---

### Task 12: Footer, Sticky CTA, Back to Top

**Files:**
- Modify: `src/components/footer/footer.js`
- Modify: `src/components/sticky-cta/sticky-cta.js`
- Modify: `src/components/back-to-top/back-to-top.js`

- [ ] **Step 1: Rewrite footer.js**

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { socialsData } from '../../data/socials-data';
import { FaLinkedin, FaGithub, FaMedium, FaYoutube, FaTiktok } from 'react-icons/fa';

function Footer() {
    const { theme } = useContext(ThemeContext);
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaLinkedin, href: socialsData.linkedIn, label: 'LinkedIn' },
        { icon: FaGithub, href: socialsData.github, label: 'GitHub' },
        { icon: FaMedium, href: 'https://medium.com/@aaabulkhair', label: 'Medium' },
        { icon: FaYoutube, href: 'https://www.youtube.com/@7adid_elsafina', label: 'YouTube' },
        { icon: FaTiktok, href: 'https://www.tiktok.com/@7adid_elsafina', label: 'TikTok' },
    ].filter(link => link.href);

    return (
        <footer className="border-t border-rule mt-8" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-[0.65rem] text-text-muted">
                    &copy; {currentYear} Ahmed Abulkhair. All rights reserved. &bull; Built with Next.js
                </div>
                <div className="flex items-center gap-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-text-muted hover:text-primary transition-colors"
                            aria-label={social.label}
                        >
                            <social.icon size={14} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
```

- [ ] **Step 2: Rewrite sticky-cta.js**

Minimal editorial style — small fixed pill at bottom-right, no emoji:

```jsx
import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';

function StickyCTA() {
    const { theme } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible || isDismissed) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
            <a
                href={contactsData.monetizationLinks.primary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-bg text-[0.7rem] font-semibold rounded shadow-lg hover:opacity-90 transition-opacity"
            >
                {contactsData.monetizationLinks.primary.name}
            </a>
            <button
                onClick={() => setIsDismissed(true)}
                className="w-6 h-6 rounded-full bg-bg-surface border border-rule text-text-muted text-xs flex items-center justify-center hover:text-primary transition-colors"
                aria-label="Dismiss"
            >
                &times;
            </button>
        </div>
    );
}

export default StickyCTA;
```

- [ ] **Step 3: Rewrite back-to-top.js**

```jsx
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../contexts/theme-context';

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setVisible(document.documentElement.scrollTop > 300);
        window.addEventListener('scroll', toggle);
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-8 h-8 rounded-full border border-rule bg-bg text-text-muted hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center text-sm"
            aria-label="Back to top"
        >
            &uarr;
        </button>
    );
}

export default BackToTop;
```

- [ ] **Step 4: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/footer/footer.js src/components/sticky-cta/sticky-cta.js src/components/back-to-top/back-to-top.js
git commit -m "feat: rewrite footer, sticky CTA, and back-to-top with editorial design"
```

---

### Task 13: Index.js Cleanup + SEO Updates

**Files:**
- Modify: `src/pages/index.js`
- Modify: `src/components/seo/seo-head.js`
- Modify: `src/components/seo/structured-data.js`

- [ ] **Step 1: Clean up index.js**

Remove the background color wrapper `<div>` elements around YouTube, TikTok, and Blog. Each component now handles its own section styling.

```jsx
import React, { useContext } from 'react';
import {
  About, Blog, Contacts, Education,
  Experience, Landing, Navbar, Testimonials,
  WhatIDo, YouTubeFeed, TikTokFeed, StickyCTA
} from '../components';
import BackToTop from '../components/back-to-top/back-to-top';
import SEOHead from '../components/seo/seo-head';
import StructuredData from '../components/seo/structured-data';
import { ThemeContext } from '../contexts/theme-context';
import Footer from '../components/footer/footer';

function HomePage({ blogs }) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <SEOHead />
      <StructuredData pageType="website" />
      <BackToTop />
      <StickyCTA />
      <Navbar />
      <Landing />
      <About />
      <WhatIDo />
      <Experience />
      <Education />
      <Testimonials />
      <YouTubeFeed maxVideos={3} />
      <TikTokFeed maxVideos={3} />
      <Blog blogs={blogs} />
      <Contacts />
      <Footer />
    </>
  )
}

// ... getStaticProps stays exactly the same — do NOT modify it
```

Keep `getStaticProps` and the default export unchanged.

- [ ] **Step 2: Update seo-head.js**

In `src/components/seo/seo-head.js`, find and replace any occurrence of "Senior Data Scientist" with "AI Scientist" in the title and description meta tags. Keep all other meta tags unchanged.

- [ ] **Step 3: Update structured-data.js**

In `src/components/seo/structured-data.js`, find and replace:
- `"Senior Data Scientist"` → `"AI Scientist"`
- Any `jobTitle` references → `"AI Scientist"`
- Add `"Incept Labs"` to the `worksFor` organization if present

Keep all other schema data unchanged.

- [ ] **Step 4: Verify build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds with zero errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.js src/components/seo/seo-head.js src/components/seo/structured-data.js
git commit -m "feat: clean up page layout and update SEO for AI Scientist role"
```

---

### Task 14: Full Build Verification + Dev Server Check

- [ ] **Step 1: Run production build**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run build`
Expected: Build succeeds with zero errors

- [ ] **Step 2: Content audit — verify zero information loss**

Run a manual check through the data files to confirm:
- `src/data/header-data.js` — name, title, description, both CTAs with URLs, trust badges, languages, specialties all present
- `src/data/about-data.js` — both descriptions present
- `src/data/experience-data.js` — all 10 entries (9 original + Incept Labs), each with company, jobtitle, dates, description, achievements, tech
- `src/data/education-data.js` — all 3 entries unchanged
- `src/data/testimonials-data.js` — all entries unchanged
- `src/data/contacts-data.js` — all entries unchanged
- `src/data/socials-data.js` — all entries unchanged

- [ ] **Step 3: Start dev server and visually verify**

Run: `cd /Users/ahmedabulkhair/abulkhair-site && npm run dev`

Open http://localhost:3000 and verify:
- Navbar shows "AA" logo + text nav links
- Hero shows asymmetric split with name, "AI Scientist @ Incept Labs", CTAs, trust badges, photo, socials
- All 9 numbered sections render with horizontal rules
- Services show 5 cards without emojis
- Experience shows vertical timeline with Incept Labs first
- Education shows 3 entries in ruled format
- Testimonials show quote cards with gold accents
- YouTube/TikTok/Blog feeds load
- Contact form renders with editorial styling
- Footer shows copyright + social icons
- Sticky CTA appears on scroll
- Back to top button works

- [ ] **Step 4: Commit any final fixes**

If any issues found during verification, fix and commit.
