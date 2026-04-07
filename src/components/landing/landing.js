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
