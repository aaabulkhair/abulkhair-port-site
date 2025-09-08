import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './youtube-feed.module.css';

function YouTubeFeed({ maxVideos = 3 }) {
    const { theme } = useContext(ThemeContext);
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
            <div className={styles.loading} style={{ color: theme.tertiary }}>
                Loading latest videos...
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error} style={{ color: theme.tertiary }}>
                {error}
            </div>
        );
    }

    return (
        <div className={styles.youtubeFeed}>
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
                        <h3 style={{ color: theme.primary }}>YouTube: 7adid_elsafina 📺</h3>
                        <p className={styles.subtitle} style={{ color: theme.tertiary + '80' }}>
                            Data Science in Arabic
                        </p>
                    </div>
                </div>
                <a 
                    href={contactsData.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.subscribeButton}
                >
                    Subscribe
                </a>
            </div>
            
            <div className={styles.videosGrid}>
                {videos.map((video, index) => (
                    <div 
                        key={video.id}
                        className={styles.videoCard}
                        style={{
                            backgroundColor: theme.secondary,
                            border: `1px solid ${theme.primary}20`
                        }}
                    >
                        <div className={styles.thumbnail}>
                            <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                loading="lazy"
                            />
                            <div className={styles.playButton}>▶</div>
                        </div>
                        
                        <div className={styles.videoInfo}>
                            <h4 
                                className={styles.videoTitle}
                                style={{ color: theme.tertiary }}
                            >
                                {video.title}
                            </h4>
                            
                            <p 
                                className={styles.videoDescription}
                                style={{ color: theme.tertiary + '80' }}
                            >
                                {video.description}
                            </p>
                            
                            <div className={styles.videoMeta}>
                                <span 
                                    className={styles.publishDate}
                                    style={{ color: theme.tertiary + '60' }}
                                >
                                    {formatDate(video.publishedAt)}
                                </span>
                                
                                <a 
                                    href={`${video.url}?utm_source=abulkhair.ai&utm_medium=widget&utm_campaign=youtube_feed`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.watchButton}
                                    style={{
                                        color: theme.primary,
                                        border: `1px solid ${theme.primary}`
                                    }}
                                >
                                    Watch
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className={styles.cta}>
                <p style={{ color: theme.tertiary }}>
                    Love the content? Subscribe for more data science tutorials in Arabic!
                </p>
                <div className={styles.youtubeSubscribeContainer}>
                    <a 
                        href="https://www.youtube.com/@7adid_elsafina?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.youtubeSubscribeButton}
                    >
                        <span className={styles.youtubeIcon}>▶</span>
                        Subscribe
                    </a>
                </div>
            </div>
        </div>
    );
}

export default YouTubeFeed;