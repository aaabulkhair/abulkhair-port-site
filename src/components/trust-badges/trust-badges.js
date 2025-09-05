import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './trust-badges.module.css';

function TrustBadges({ badges, className = '' }) {
    const { theme } = useContext(ThemeContext);
    
    const defaultBadges = [
        {
            platform: 'Topmate',
            rating: contactsData.socialProof.topmate.rating,
            metric: `${contactsData.socialProof.topmate.reviews} Reviews`,
            icon: '⭐',
            url: contactsData.socialProof.topmate.url
        },
        {
            platform: 'Upwork',
            rating: `${contactsData.socialProof.upwork.jobSuccessRate}%`,
            metric: 'Job Success',
            icon: '✅',
            url: contactsData.socialProof.upwork.url
        }
    ];
    
    const badgesToRender = badges || defaultBadges;
    
    return (
        <div className={`${styles.trustBadges} ${className}`}>
            {badgesToRender.map((badge, index) => (
                <div 
                    key={index}
                    className={styles.badge}
                    style={{
                        backgroundColor: theme.secondary,
                        color: theme.tertiary,
                        border: `2px solid ${theme.primary}`
                    }}
                >
                    <span className={styles.icon}>{badge.icon}</span>
                    <div className={styles.content}>
                        <div className={styles.platform}>{badge.platform}</div>
                        <div className={styles.rating}>
                            <span className={styles.ratingValue}>{badge.rating}</span>
                            <span className={styles.metric}>{badge.metric}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TrustBadges;