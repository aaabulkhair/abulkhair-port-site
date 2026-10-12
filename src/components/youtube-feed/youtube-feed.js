import React from 'react';
import Image from 'next/image';
import { FiPlay } from 'react-icons/fi';
import { withUtm } from '../../utils/utm';

function formatDate(dateString) {
    const date = new Date(dateString);
    if (!dateString || Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

// Videos come from getStaticProps (src/lib/feeds.js); hide the section if the feed was empty.
function YouTubeFeed({ videos = [] }) {
    if (videos.length === 0) return null;

    return (
        <section className="border-b border-rule py-24">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">06 / YouTube</p>
                <div className="flex items-center gap-3 mb-8">
                    <Image
                        src="/images/7adidelsafina-logo.png"
                        alt="7adid_elsafina logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <h3 className="text-base font-semibold text-text-primary">YouTube</h3>
                        <p className="text-[0.75rem] text-text-secondary">Data Science in Arabic</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <div key={video.id} className="group bg-bg-surface rounded overflow-hidden">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover grayscale-[0.6] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="text-[0.75rem] font-medium text-text-primary mb-1">
                                    {video.title}
                                </h4>
                                <p className="text-[0.65rem] text-text-secondary line-clamp-2 mb-2">
                                    {video.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[0.6rem] text-text-muted">
                                        {formatDate(video.publishedAt)}
                                    </span>
                                    <a
                                        href={withUtm(video.url, { medium: 'widget', campaign: 'youtube_feed' })}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[0.65rem] text-primary border-b border-primary/20 pb-px"
                                    >
                                        Watch
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <p className="text-[0.8rem] text-text-secondary">
                        Love the content? Subscribe for more data science tutorials in Arabic!
                    </p>
                    <a
                        href={withUtm('https://www.youtube.com/@7adid_elsafina?sub_confirmation=1', { medium: 'widget', campaign: 'youtube_subscribe' })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2 text-[0.7rem] text-primary border border-primary/30 rounded hover:border-primary/60 transition-colors"
                    >
                        <FiPlay size={10} aria-hidden="true" />
                        Subscribe
                    </a>
                </div>
            </div>
        </section>
    );
}

export default YouTubeFeed;
