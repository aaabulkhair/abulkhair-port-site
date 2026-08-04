import React from 'react';
import Image from 'next/image';
import { FaTiktok } from 'react-icons/fa';
import { contactsData } from '../../data/contacts-data';

// Static branded card linking to the TikTok profile. The official embed
// script is intentionally not used: it renders an unstyled white widget
// inside the dark theme, fires CORS errors, and collapses when blocked.
function TikTokFeed() {
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

                <a
                    href={contactsData.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center gap-6 max-w-2xl p-6 bg-bg-surface border border-rule rounded hover:border-primary/30 transition-colors"
                >
                    <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full border border-primary/25 text-primary group-hover:bg-primary/10 transition-colors">
                        <FaTiktok size={22} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-text-primary">@7adid_elsafina</p>
                        <p className="text-[0.8rem] text-text-secondary leading-relaxed mt-1">
                            Quick data science and machine learning bites in Arabic —
                            join 2,300+ data scientists learning together.
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 self-start sm:self-center px-5 py-2 text-[0.7rem] text-primary border border-primary/30 rounded group-hover:border-primary/60 transition-colors">
                        Follow on TikTok
                    </span>
                </a>
            </div>
        </section>
    );
}

export default TikTokFeed;
