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
