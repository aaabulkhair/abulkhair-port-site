import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { ThemeContext } from '../../contexts/theme-context';
import { featuredTestimonials } from '../../data/testimonials-data';
import styles from './testimonials.module.css';

function Testimonials() {
    const { theme } = useContext(ThemeContext);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} style={{ color: index < rating ? '#FFD700' : '#ddd' }}>
                ★
            </span>
        ));
    };

    const getPlatformIcon = (platform) => {
        const icons = {
            'Topmate': '⭐',
            'Upwork': '✅', 
            'YouTube': '▶️',
            'TikTok': '🎵'
        };
        return icons[platform] || '💼';
    };

    const getServiceColor = (service) => {
        const colors = {
            '1-on-1 Consulting': '#4CAF50',
            'Project Development': '#2196F3',
            'Arabic Education': '#FF9800',
            'Technical Content': '#9C27B0'
        };
        return colors[service] || theme.primary;
    };

    return (
        <div className={styles.testimonials} style={{ backgroundColor: theme.secondary }}>
            <Container className={styles.testimonialsContainer} maxWidth="lg">
                <div className={styles.header}>
                    <h2 style={{ color: theme.primary }}>What Clients Say</h2>
                    <p style={{ color: theme.tertiary }}>
                        Real results from 100+ consultations and 28+ successful projects
                    </p>
                </div>
                
                <div className={styles.testimonialsGrid}>
                    {featuredTestimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id}
                            className={styles.testimonialCard}
                            style={{
                                backgroundColor: theme.quaternary,
                                border: `2px solid ${theme.primary}20`,
                                boxShadow: `0 4px 20px ${theme.primary}10`
                            }}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.clientInfo}>
                                    <h4 style={{ color: theme.tertiary, margin: 0 }}>
                                        {testimonial.name}
                                    </h4>
                                    <p style={{ color: theme.tertiary + '80', margin: 0, fontSize: '0.9rem' }}>
                                        {testimonial.role}
                                    </p>
                                </div>
                                <div className={styles.platformBadge}>
                                    <span className={styles.platformIcon}>
                                        {getPlatformIcon(testimonial.platform)}
                                    </span>
                                    <span style={{ color: theme.tertiary, fontSize: '0.8rem' }}>
                                        {testimonial.platform}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.serviceBadge}>
                                <span 
                                    className={styles.serviceTag}
                                    style={{ 
                                        backgroundColor: getServiceColor(testimonial.service) + '20',
                                        color: getServiceColor(testimonial.service),
                                        border: `1px solid ${getServiceColor(testimonial.service)}40`
                                    }}
                                >
                                    {testimonial.service}
                                </span>
                            </div>

                            <blockquote 
                                className={styles.testimonialText}
                                style={{ color: theme.tertiary }}
                            >
                                "{testimonial.testimonial}"
                            </blockquote>

                            <div className={styles.rating}>
                                {renderStars(testimonial.rating)}
                                <span style={{ color: theme.tertiary, marginLeft: '8px', fontSize: '0.9rem' }}>
                                    {testimonial.rating}/5
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.socialProof} style={{ backgroundColor: theme.primary + '10', marginTop: '2rem', padding: '1.5rem', borderRadius: '12px' }}>
                    <div className={styles.proofStats}>
                        <div className={styles.stat}>
                            <span style={{ color: theme.primary, fontSize: '2rem', fontWeight: 'bold' }}>4.9</span>
                            <span style={{ color: theme.tertiary }}>★ Average Rating</span>
                        </div>
                        <div className={styles.stat}>
                            <span style={{ color: theme.primary, fontSize: '2rem', fontWeight: 'bold' }}>100+</span>
                            <span style={{ color: theme.tertiary }}>Hours of Consultations</span>
                        </div>
                        <div className={styles.stat}>
                            <span style={{ color: theme.primary, fontSize: '2rem', fontWeight: 'bold' }}>100%</span>
                            <span style={{ color: theme.tertiary }}>Job Success Rate</span>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Testimonials;