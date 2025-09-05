import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './sticky-cta.module.css';

function StickyCTA() {
    const { theme } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Show CTA after user scrolls down 50% of viewport height
            if (scrolled > windowHeight * 0.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className={`${styles.stickyCta} ${isMinimized ? styles.minimized : ''}`}
            style={{
                backgroundColor: theme.primary,
                color: theme.secondary,
                boxShadow: `0 -4px 20px rgba(0, 0, 0, 0.15)`
            }}
        >
            {!isMinimized ? (
                <div className={styles.content}>
                    <div className={styles.text}>
                        <div className={styles.title}>Ready to get started?</div>
                        <div className={styles.subtitle}>Book a free discovery call</div>
                    </div>
                    <div className={styles.actions}>
                        <a 
                            href={contactsData.monetizationLinks.primary.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                            style={{
                                backgroundColor: theme.secondary,
                                color: theme.primary,
                                border: `2px solid ${theme.secondary}`
                            }}
                        >
                            {contactsData.monetizationLinks.primary.name}
                        </a>
                        <button
                            onClick={() => setIsMinimized(true)}
                            className={styles.minimizeButton}
                            style={{ color: theme.secondary }}
                            aria-label="Minimize CTA"
                        >
                            ×
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsMinimized(false)}
                    className={styles.expandButton}
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.secondary,
                        border: `1px solid ${theme.secondary}`
                    }}
                >
                    💬 Book Consultation
                </button>
            )}
        </div>
    );
}

export default StickyCTA;