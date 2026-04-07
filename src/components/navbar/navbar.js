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
