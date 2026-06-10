import React, { useContext, useState, useEffect, useCallback } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ThemeContext } from '../../contexts/theme-context';
import Link from '../link';

function Navbar() {
    const { drawerOpen, setHandleDrawer } = useContext(ThemeContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeDrawer = useCallback(() => setHandleDrawer(false), [setHandleDrawer]);

    // Escape closes; body scroll locks while the drawer is open.
    useEffect(() => {
        if (!drawerOpen) return;
        const onKeyDown = (e) => e.key === 'Escape' && closeDrawer();
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [drawerOpen, closeDrawer]);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/#about' },
        { label: 'Services', href: '/services' },
        { label: 'Resume', href: '/#experience' },
        { label: 'Blog', href: '/blog' },
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

                <button
                    type="button"
                    className="md:hidden text-text-primary hover:text-primary transition-colors"
                    onClick={() => setHandleDrawer(!drawerOpen)}
                    aria-expanded={drawerOpen}
                    aria-controls="mobile-nav"
                    aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                >
                    {drawerOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
            </div>

            {/* Mobile drawer */}
            <div
                id="mobile-nav"
                className={`md:hidden fixed inset-0 top-16 bg-bg/95 backdrop-blur-md transition-opacity duration-300 ${
                    drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="flex flex-col gap-8 px-6 pt-12">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={closeDrawer}
                            className={`text-2xl font-light tracking-tight text-text-primary hover:text-primary transition-all duration-300 ${
                                drawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                            }`}
                            style={{ transitionDelay: drawerOpen ? `${i * 50}ms` : '0ms' }}
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
