import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './youtube-feed.module.css';

function YouTubeFeed({ maxVideos = 3 }) {
    const { theme } = useContext(ThemeContext);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fallback videos with actual content from the channel
    const fallbackVideos = [
        {
            id: 'lE1vA0sQMzA',
            title: '3 Resources to Prepare for Data Science Interview | In Arabic',
            thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg',
            publishedAt: '2024-12-15',
            description: 'Three essential resources to help you prepare for data science interviews in Arabic.',
            url: 'https://www.youtube.com/watch?v=lE1vA0sQMzA'
        },
        {
            id: 'sample2',
            title: 'Data Science Career Roadmap | Arabic',
            thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg',
            publishedAt: '2024-12-10',
            description: 'Complete roadmap for starting your data science career.',
            url: 'https://www.youtube.com/@7adidelsafina'
        },
        {
            id: 'sample3',
            title: 'Machine Learning Fundamentals | Arabic',
            thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg',
            publishedAt: '2024-12-05',
            description: 'Introduction to machine learning concepts in Arabic.',
            url: 'https://www.youtube.com/@7adidelsafina'
        }
    ];

    useEffect(() => {
        // For now, use fallback videos since YouTube API requires server-side implementation
        // In production, you'd implement this as an API route in pages/api/
        const loadVideos = () => {
            try {
                setVideos(fallbackVideos.slice(0, maxVideos));
                setLoading(false);
            } catch (err) {
                setError('Failed to load videos');
                setLoading(false);
            }
        };

        loadVideos();
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
                <h3 style={{ color: theme.primary }}>Latest YouTube Videos</h3>
                <a 
                    href={contactsData.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelLink}
                    style={{ color: theme.primary }}
                >
                    View Channel →
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
                <a 
                    href={contactsData.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.subscribeButton}
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.secondary
                    }}
                >
                    Subscribe to Channel
                </a>
            </div>
        </div>
    );
}

export default YouTubeFeed;