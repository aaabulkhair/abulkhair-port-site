import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';

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
        <section className="border-b border-rule py-16" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">07 / TikTok</p>
                <div className="flex items-center gap-3 mb-8">
                    <img
                        src="/images/7adidelsafina-logo.png"
                        alt="7adid_elsafina logo"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <h3 className="text-base font-semibold text-text-primary">TikTok</h3>
                        <p className="text-[0.75rem] text-text-secondary">Data Science in Arabic</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    {/* Official TikTok Profile Embed - always shows latest ~10 videos */}
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@7adid_elsafina"
                        data-unique-id="7adid_elsafina"
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
                                title="@7adid_elsafina"
                                href="https://www.tiktok.com/@7adid_elsafina"
                                style={{
                                    color: theme.primary,
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                            >
                                @7adid_elsafina
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
                                href="https://www.tiktok.com/@7adid_elsafina"
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

                <div className="flex items-center gap-4 mt-8">
                    <p className="text-[0.8rem] text-text-secondary">
                        📊 Join 2,300+ data scientists learning together
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
            </div>
        </section>
    );
}

export default TikTokFeed;
