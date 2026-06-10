import React, { useEffect } from 'react';
import Image from 'next/image';
import { contactsData } from '../../data/contacts-data';

function TikTokFeed() {

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
        <section className="border-b border-rule py-16">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">07 / TikTok</p>
                <div className="flex items-center gap-3 mb-8">
                    <Image
                        src="/images/7adidelsafina-logo.png"
                        alt="7adid_elsafina logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <h3 className="text-base font-semibold text-text-primary">TikTok</h3>
                        <p className="text-[0.75rem] text-text-secondary">Data Science in Arabic</p>
                    </div>
                </div>

                {/* min-height reserves space until the TikTok script hydrates (CLS) */}
                <div className="flex justify-center min-h-[480px]">
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
                            backgroundColor: '#0a0a0a',
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
                                    color: '#e8c47c',
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                            >
                                @7adid_elsafina
                            </a>
                            <p style={{
                                color: '#f0f0f0',
                                margin: '10px 0'
                            }}>
                                Data Science tips in Arabic
                            </p>
                            <a
                                target="_blank"
                                title="Latest videos from 7adid_elsafina"
                                href="https://www.tiktok.com/@7adid_elsafina"
                                style={{
                                    color: '#e8c47c',
                                    textDecoration: 'none'
                                }}
                            >
                                View Latest Videos
                            </a>
                        </section>
                    </blockquote>
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <p className="text-[0.8rem] text-text-secondary">
                        Join 2,300+ data scientists learning together
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
