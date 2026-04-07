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
