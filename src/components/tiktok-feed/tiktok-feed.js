import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './tiktok-feed.module.css';

function TikTokFeed() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        // Load TikTok embed script if not already loaded
        if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // Trigger re-render of TikTok embeds if script already exists
            if (window.tiktokEmbedLoad) {
                window.tiktokEmbedLoad();
            } else if (window.tiktok?.embed?.load) {
                window.tiktok.embed.load();
            }
        }
    }, []);

    return (
        <div className={styles.tiktokFeed}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <div className={styles.logoContainer}>
                        <img 
                            src="/images/7adidelsafina-logo.png" 
                            alt="7adid_elsafina logo" 
                            className={styles.channelLogo}
                        />
                    </div>
                    <div className={styles.titleInfo}>
                        <h3 style={{ color: theme.primary }}>TikTok: 7adid_elsafina 📱</h3>
                        <p className={styles.subtitle} style={{ color: theme.tertiary + '80' }}>
                            Data Science in Arabic
                        </p>
                    </div>
                </div>
                <a 
                    href={contactsData.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.subscribeButton}
                >
                    Follow
                </a>
            </div>
            
            <div className={styles.embedContainer}>
                {/* Official TikTok Profile Embed - always shows latest ~10 videos */}
                <blockquote 
                    className="tiktok-embed" 
                    cite="https://www.tiktok.com/@7adidelsafina"
                    data-unique-id="7adidelsafina" 
                    data-embed-type="creator"
                    style={{
                        maxWidth: '720px',
                        minWidth: '288px',
                        margin: '0 auto',
                        backgroundColor: theme.secondary,
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}
                >
                    <section style={{ padding: '20px', textAlign: 'center' }}>
                        <a 
                            target="_blank" 
                            title="@7adidelsafina"
                            href="https://www.tiktok.com/@7adidelsafina" 
                            style={{ 
                                color: theme.primary,
                                textDecoration: 'none',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}
                        >
                            @7adidelsafina
                        </a>
                        <p style={{ 
                            color: theme.tertiary,
                            margin: '10px 0'
                        }}>
                            Data Science tips in Arabic 📊
                        </p>
                        <a 
                            target="_blank" 
                            title="♬ original sound - 7adid_elsafina"
                            href="https://www.tiktok.com/@7adidelsafina"
                            style={{
                                color: theme.primary,
                                textDecoration: 'none'
                            }}
                        >
                            ♬ View Latest Videos
                        </a>
                    </section>
                </blockquote>
            </div>
            
            <div className={styles.cta}>
                <div className={styles.ctaContent}>
                    <p style={{ color: theme.tertiary }}>
                        📊 Join 2,300+ Arabic data scientists learning together
                    </p>
                    <div className={styles.ctaButtons}>
                        <a 
                            href={contactsData.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.followButton}
                            style={{
                                backgroundColor: '#ff0050',
                                color: 'white'
                            }}
                        >
                            Follow on TikTok
                        </a>
                        <a 
                            href={contactsData.monetizationLinks.primary.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.consultButton}
                            style={{
                                backgroundColor: theme.primary,
                                color: theme.secondary,
                                border: `2px solid ${theme.primary}`
                            }}
                        >
                            Book 1:1 Session
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TikTokFeed;