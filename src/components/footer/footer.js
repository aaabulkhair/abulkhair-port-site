import React from 'react';
import { socialsData } from '../../data/socials-data';
import { contactsData } from '../../data/contacts-data';
import { services } from '../../data/services';
import Link from '../link';
import { FaLinkedin, FaGithub, FaMedium, FaYoutube, FaTiktok } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaLinkedin, href: socialsData.linkedIn, label: 'LinkedIn' },
        { icon: FaGithub, href: socialsData.github, label: 'GitHub' },
        { icon: FaMedium, href: contactsData.medium, label: 'Medium' },
        { icon: FaYoutube, href: contactsData.youtube, label: 'YouTube' },
        { icon: FaTiktok, href: contactsData.tiktok, label: 'TikTok' },
    ].filter(link => link.href);

    const contentLinks = [
        { label: 'Blog', href: '/blog', internal: true },
        { label: 'Medium', href: contactsData.medium },
        { label: 'YouTube (Arabic)', href: contactsData.youtube },
        { label: 'TikTok', href: contactsData.tiktok },
    ];

    const linkClass = 'text-[0.75rem] text-text-secondary hover:text-primary transition-colors';

    return (
        <footer className="border-t border-rule mt-8">
            <div className="max-w-page mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <Link href="/" className="text-sm font-bold tracking-wider text-text-primary">AA</Link>
                    <p className="text-[0.75rem] text-text-secondary leading-relaxed mt-3 max-w-xs">
                        AI Scientist specializing in LLMs, time-series forecasting, and Arabic data science education.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
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

                <nav aria-label="Services">
                    <p className="text-[0.6rem] uppercase tracking-[3px] text-text-muted mb-4">Services</p>
                    <ul className="space-y-2">
                        {services.map((service) => (
                            <li key={service.slug}>
                                <Link href={`/services/${service.slug}`} className={linkClass}>
                                    {service.nav.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/services" className={linkClass}>All services →</Link>
                        </li>
                    </ul>
                </nav>

                <nav aria-label="Content">
                    <p className="text-[0.6rem] uppercase tracking-[3px] text-text-muted mb-4">Content</p>
                    <ul className="space-y-2">
                        {contentLinks.map((link) => (
                            <li key={link.label}>
                                {link.internal ? (
                                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                                ) : (
                                    <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>{link.label}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="border-t border-rule">
                <div className="max-w-page mx-auto px-6 md:px-12 py-4 text-[0.65rem] text-text-muted">
                    &copy;{' '}{currentYear}{' '}Ahmed Abulkhair. All rights reserved. &bull; Built with Next.js
                </div>
            </div>
        </footer>
    );
}

export default Footer;
