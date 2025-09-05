import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './tiktok-feed.module.css';

function TikTokFeed({ maxVideos = 3 }) {
    const { theme } = useContext(ThemeContext);

    // Sample TikTok content based on the profile
    const tiktokVideos = [
        {
            id: '7479145707497180424',
            title: 'أفضل مصادر لتعلم Data Science من البداية',
            description: 'Best resources to learn Data Science from scratch in Arabic',
            thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg', // Placeholder
            views: '1.2K',
            likes: '89',
            url: 'https://www.tiktok.com/@7adidelsafina/video/7479145707497180424'
        },
        {
            id: 'sample2',
            title: 'Data Science vs Business Intelligence - الفرق بينهما',
            description: 'Understanding the difference between Data Science and BI',
            thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg', // Placeholder
            views: '800',
            likes: '65',
            url: 'https://www.tiktok.com/@7adidelsafina'
        },
        {
            id: 'sample3',
            title: 'نصائح للمقابلات الشخصية في Data Science',
            description: 'Tips for Data Science job interviews in Arabic',
            thumbnail: 'https://img.youtube.com/vi/lE1vA0sQMzA/mqdefault.jpg', // Placeholder
            views: '950',
            likes: '72',
            url: 'https://www.tiktok.com/@7adidelsafina'
        }
    ];

    const displayVideos = tiktokVideos.slice(0, maxVideos);

    return (
        <div className={styles.tiktokFeed}>
            <div className={styles.header}>
                <h3 style={{ color: theme.primary }}>Latest TikTok Content</h3>
                <a 
                    href={contactsData.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.profileLink}
                    style={{ color: theme.primary }}
                >
                    @7adidelsafina →
                </a>
            </div>
            
            <div className={styles.videosContainer}>
                {displayVideos.map((video, index) => (
                    <div 
                        key={video.id}
                        className={styles.videoCard}
                        style={{
                            backgroundColor: theme.secondary,
                            border: `1px solid ${theme.primary}20`
                        }}
                    >
                        <div className={styles.videoThumbnail}>
                            <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                loading="lazy"
                            />
                            <div className={styles.playIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                            <div className={styles.tiktokBadge}>TikTok</div>
                        </div>
                        
                        <div className={styles.videoContent}>
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
                            
                            <div className={styles.videoStats}>
                                <div className={styles.stat}>
                                    <span>👀</span>
                                    <span style={{ color: theme.tertiary + '70' }}>{video.views}</span>
                                </div>
                                <div className={styles.stat}>
                                    <span>❤️</span>
                                    <span style={{ color: theme.tertiary + '70' }}>{video.likes}</span>
                                </div>
                            </div>
                            
                            <a 
                                href={`${video.url}?utm_source=abulkhair.ai&utm_medium=widget&utm_campaign=tiktok_feed`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.watchButton}
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.secondary
                                }}
                            >
                                Watch on TikTok
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className={styles.cta}>
                <div className={styles.ctaContent}>
                    <p style={{ color: theme.tertiary }}>
                        🎯 Follow for bite-sized data science tips in Arabic
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