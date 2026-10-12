import Image from 'next/image';
import React, { useContext } from 'react';
import { FaGithub, FaLinkedin, FaMediumM, FaYoutube, FaTiktok } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/theme-context';
import { headerData } from '../../data/header-data';
import { socialsData } from '../../data/socials-data';
import { achievementsData } from '../../data/achievements-data';
import { MonetizationLink } from '../analytics/enhanced-link-tracker';
import { m, useReducedMotion, fadeUp, EASE } from '../ui/motion';
import { withUtm } from '../../utils/utm';

function Landing() {
    const { drawerOpen } = useContext(ThemeContext);
    const reduceMotion = useReducedMotion();

    const socials = [
        { icon: FaLinkedin, href: socialsData.linkedIn, label: 'LinkedIn' },
        { icon: FaGithub, href: socialsData.github, label: 'GitHub' },
        { icon: FaMediumM, href: socialsData.medium, label: 'Medium' },
        { icon: FaYoutube, href: 'https://www.youtube.com/@7adid_elsafina', label: 'YouTube' },
        { icon: FaTiktok, href: 'https://www.tiktok.com/@7adid_elsafina', label: 'TikTok' },
    ]
        .filter(s => s.href)
        .map(s => ({ ...s, href: withUtm(s.href, { medium: 'social', campaign: `hero_${s.label.toLowerCase()}` }) }));

    // Hero credential strip — the four strongest CV proof points.
    const credentials = [
        achievementsData.find(a => a.id === 'oall'),
        achievementsData.find(a => a.id === 'kaggle'),
        achievementsData.find(a => a.id === 'upwork'),
        achievementsData.find(a => a.id === 'experience'),
    ].filter(Boolean);

    return (
        <div className="relative min-h-screen flex items-center bg-bg hero-backdrop grain overflow-hidden">
            <div className="max-w-page mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center pt-24 pb-20 relative">
                {/* Left — Content */}
                <div className="flex-[1.3] md:pr-16">
                    <m.p
                        className="text-[0.65rem] tracking-[4px] uppercase text-text-muted mb-8"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                    >
                        {headerData.title}
                    </m.p>

                    <h1 className="display-hero">
                        <m.span
                            className="block font-serif italic font-light text-text-primary"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={1}
                        >
                            {headerData.name.split(' ')[0]}
                        </m.span>
                        <m.span
                            className="block font-extrabold text-text-primary"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                        >
                            {headerData.name.split(' ').slice(1).join(' ')}
                        </m.span>
                    </h1>

                    <m.p
                        className="text-base text-text-secondary leading-relaxed mt-8 max-w-md"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                    >
                        {headerData.description}
                    </m.p>

                    {/* CTAs */}
                    <m.div
                        className="flex flex-wrap gap-3 mt-10"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                    >
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
                    </m.div>

                    {/* Credential strip — CV proof points */}
                    <m.div
                        className="flex flex-wrap gap-x-8 gap-y-3 mt-12 pt-6 border-t border-rule"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={5}
                    >
                        {credentials.map((c) => (
                            <div key={c.id} className="max-w-[180px]">
                                <p className="text-[0.7rem] font-semibold text-primary leading-snug">{c.label}</p>
                                <p className="text-[0.65rem] text-text-muted leading-snug mt-1">{c.detail}</p>
                            </div>
                        ))}
                    </m.div>
                </div>

                {/* Right — Photo + Socials */}
                <m.div
                    className="flex-[0.7] flex items-center justify-center relative py-12"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                >
                    {/* Gold halo behind the portrait */}
                    <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
                    <div className={`relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-primary/20 transition-opacity duration-300 ${drawerOpen ? 'opacity-0' : 'opacity-100'}`}>
                        <Image
                            src={headerData.image}
                            alt={headerData.name}
                            fill
                            sizes="(max-width: 768px) 224px, 288px"
                            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                            priority
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
                </m.div>

                {/* Scroll cue */}
                <m.div
                    className="absolute bottom-6 left-6 md:left-12 flex items-center gap-3"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    aria-hidden="true"
                >
                    <span className="text-[0.6rem] tracking-[3px] uppercase text-text-muted">Scroll</span>
                    <m.span
                        className="block w-10 h-px bg-primary/50 origin-left"
                        animate={reduceMotion ? {} : { scaleX: [1, 0.4, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </m.div>
            </div>
        </div>
    );
}

export default Landing;
