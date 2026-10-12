import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiPlay } from 'react-icons/fi';
import { contactsData } from '../../data/contacts-data';
import { withUtm } from '../../utils/utm';

function SkeletonCard() {
    return (
        <div className="bg-bg-surface rounded overflow-hidden animate-pulse" aria-hidden="true">
            <div className="aspect-video bg-rule" />
            <div className="p-4 space-y-2">
                <div className="h-3 bg-rule rounded w-3/4" />
                <div className="h-2.5 bg-rule rounded w-full" />
                <div className="h-2.5 bg-rule rounded w-1/3" />
            </div>
        </div>
    );
}

function YouTubeFeed({ maxVideos = 3 }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // YouTube channel handle for RSS feed
    const CHANNEL_HANDLE = '7adid_elsafina';

    useEffect(() => {
        // Load Google Platform JavaScript for YouTube subscribe button
        if (!document.querySelector('script[src="https://apis.google.com/js/platform.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/platform.js';
            script.async = true;
            document.head.appendChild(script);
        }

        const fetchYouTubeVideos = async () => {
            try {
                setLoading(true);
                setError(null);

                // Use our Next.js API route
                const response = await fetch('/api/youtube-feed');

                if (!response.ok) {
                    throw new Error('Failed to fetch from API');
                }

                const data = await response.json();

                if (data.videos && data.videos.length > 0) {
                    setVideos(data.videos.slice(0, maxVideos));
                } else {
                    throw new Error('No videos in API response');
                }

            } catch (err) {
                console.error('YouTube API fetch error:', err);
                setError('Unable to load latest videos');

                // Fallback to static data if API fails
                const fallbackVideos = [
                    {
                        id: 'lE1vA0sQMzA',
                        title: '3 Resources to Prepare for Data Science Interview | In Arabic',
                        thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg',
                        publishedAt: '2024-12-15',
                        description: 'Three essential resources to help you prepare for data science interviews in Arabic.',
                        url: 'https://www.youtube.com/watch?v=lE1vA0sQMzA'
                    }
                ];
                setVideos(fallbackVideos.slice(0, maxVideos));

            } finally {
                setLoading(false);
            }
        };

        fetchYouTubeVideos();
    }, [maxVideos]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <section className="border-b border-rule py-16">
                <div className="max-w-page mx-auto px-6 md:px-12">
                    <p className="section-label">06 / YouTube</p>
                    <p className="sr-only" role="status">Loading latest videos</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                </div>
            </section>
        );
    }

    if (error && videos.length === 0) {
        return (
            <section className="border-b border-rule py-16">
                <div className="max-w-page mx-auto px-6 md:px-12">
                    <p className="text-text-secondary text-sm">{error}</p>
                </div>
            </section>
        );
    }

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
