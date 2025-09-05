import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './what-i-do.module.css';

function WhatIDo() {
    const { theme } = useContext(ThemeContext);

    const services = [
        {
            title: 'Data Science Consulting',
            icon: '🔬',
            description: 'Time-series forecasting, LLM/AI agents, and advanced analytics solutions for business growth.',
            features: ['Time-Series Analysis', 'LLM Integration', 'Predictive Modeling', 'AI Agent Development'],
            cta: {
                text: 'Book Consultation',
                url: contactsData.monetizationLinks.primary.url,
                type: 'primary'
            },
            pricing: 'Starting from $35/session'
        },
        {
            title: 'Freelance Development',
            icon: '💼',
            description: 'End-to-end data pipeline development, ML model deployment, and Power BI solutions.',
            features: ['ETL/Data Pipelines', 'ML Model Deployment', 'Power BI Dashboards', 'Database Optimization'],
            cta: {
                text: 'Hire on Upwork',
                url: contactsData.monetizationLinks.secondary.url,
                type: 'secondary'
            },
            pricing: '$35/hr • 100% Job Success'
        },
        {
            title: 'Educational Content',
            icon: '🎓',
            description: 'Data science education in Arabic through YouTube tutorials and TikTok bite-sized learning.',
            features: ['YouTube Tutorials', 'TikTok Quick Tips', 'Career Guidance', 'Interview Prep'],
            cta: {
                text: 'Subscribe & Follow',
                url: contactsData.youtube,
                type: 'social'
            },
            pricing: 'Free educational content'
        },
        {
            title: 'Technical Writing',
            icon: '✍️',
            description: 'In-depth technical articles and thought leadership content on Medium.',
            features: ['Technical Deep-dives', 'Industry Analysis', 'Best Practices', 'Case Studies'],
            cta: {
                text: 'Read Articles',
                url: contactsData.medium,
                type: 'social'
            },
            pricing: 'Free & premium content'
        }
    ];

    const getCtaStyle = (type) => {
        switch (type) {
            case 'primary':
                return {
                    backgroundColor: theme.primary,
                    color: theme.secondary,
                    border: `2px solid ${theme.primary}`
                };
            case 'secondary':
                return {
                    backgroundColor: theme.secondary,
                    color: theme.primary,
                    border: `2px solid ${theme.primary}`
                };
            case 'social':
                return {
                    backgroundColor: 'transparent',
                    color: theme.primary,
                    border: `2px solid ${theme.primary}`
                };
            default:
                return {};
        }
    };

    return (
        <section className={styles.whatIDo} id="services">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 style={{ color: theme.primary }}>What I Do</h2>
                    <p style={{ color: theme.tertiary }}>
                        Four ways I help individuals and businesses leverage data science and AI
                    </p>
                </div>

                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div 
                            key={index}
                            className={styles.serviceCard}
                            style={{
                                backgroundColor: theme.secondary,
                                border: `1px solid ${theme.primary}20`,
                                boxShadow: `0 4px 20px ${theme.primary}10`
                            }}
                        >
                            <div className={styles.serviceHeader}>
                                <div className={styles.serviceIcon}>{service.icon}</div>
                                <h3 
                                    className={styles.serviceTitle}
                                    style={{ color: theme.primary }}
                                >
                                    {service.title}
                                </h3>
                            </div>

                            <p 
                                className={styles.serviceDescription}
                                style={{ color: theme.tertiary }}
                            >
                                {service.description}
                            </p>

                            <ul 
                                className={styles.serviceFeatures}
                                style={{ color: theme.tertiary }}
                            >
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <span className={styles.checkmark}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.servicePricing}>
                                <span 
                                    className={styles.pricingText}
                                    style={{ color: theme.primary }}
                                >
                                    {service.pricing}
                                </span>
                            </div>

                            <a
                                href={service.cta.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.serviceButton}
                                style={getCtaStyle(service.cta.type)}
                            >
                                {service.cta.text}
                            </a>
                        </div>
                    ))}
                </div>

                <div 
                    className={styles.bottomCta}
                    style={{
                        backgroundColor: theme.primary + '10',
                        border: `2px solid ${theme.primary}30`
                    }}
                >
                    <div className={styles.bottomCtaContent}>
                        <h3 style={{ color: theme.primary }}>
                            Not sure which service fits your needs?
                        </h3>
                        <p style={{ color: theme.tertiary }}>
                            Book a free 15-minute discovery call to discuss your project and find the best solution.
                        </p>
                        <a
                            href={`${contactsData.monetizationLinks.primary.url}&utm_campaign=services_discovery`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.discoveryButton}
                            style={{
                                backgroundColor: theme.primary,
                                color: theme.secondary
                            }}
                        >
                            Book Free Discovery Call
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhatIDo;