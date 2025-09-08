import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';
import styles from './what-i-do.module.css';

function WhatIDo() {
    const { theme } = useContext(ThemeContext);

    const services = [
        {
            title: '1-on-1 Consulting',
            icon: '🎯',
            description: 'Get personalized guidance from a 4.9/5★ rated mentor. 100+ hours of successful consultations delivered.',
            outcome: 'Transform your career or solve complex data challenges with expert guidance.',
            features: [
                'Time-Series Forecasting (ARIMA/SARIMA/Prophet/TFT)',
                'LLM Integration & RAG Systems (LangChain/LangGraph)',
                'Career Mentorship & Interview Prep',
                'Project Architecture & Best Practices'
            ],
            socialProof: '4.9/5★ rating • 100+ consultation hours',
            cta: {
                text: 'Book Your Session',
                url: `${contactsData.monetizationLinks.primary.url}&utm_campaign=services_consulting`,
                type: 'primary'
            },
            pricing: '$35/session • Same-day booking available'
        },
        {
            title: 'Project Development',
            icon: '🚀',
            description: 'Complete data science solutions delivered by a Top Rated freelancer. 28 completed jobs, 100% Job Success Rate.',
            outcome: 'Launch production-ready ML systems that drive measurable business results.',
            features: [
                'End-to-End ML Pipelines (Scikit-learn/TensorFlow)',
                'Real-time Data Processing & ETL',
                'Power BI & Advanced Analytics Dashboards',
                'API Development & Model Deployment (FastAPI/Docker)'
            ],
            socialProof: '100% Job Success • 28 completed projects',
            cta: {
                text: 'Hire Me Now',
                url: `${contactsData.monetizationLinks.secondary.url}&utm_campaign=services_development`,
                type: 'primary'
            },
            pricing: '$35-45/hr • Available for long-term projects'
        },
        {
            title: 'Arabic Data Science Education',
            icon: '📚',
            description: 'Breaking language barriers in data science education. Helping Arabic speakers master AI and data science.',
            outcome: 'Master data science concepts in your native language with practical, industry-focused content.',
            features: [
                'YouTube Deep-dive Tutorials (Arabic)',
                'TikTok Quick Learning Bites',
                'Real-world Case Studies & Projects',
                'Career Transition Guidance'
            ],
            socialProof: 'Growing Arabic DS community',
            cta: {
                text: 'Subscribe Now',
                url: `${contactsData.youtube}?utm_source=abulkhair.ai&utm_campaign=services_education`,
                type: 'social'
            },
            pricing: 'Free content • Premium courses coming soon'
        },
        {
            title: 'Technical Content & Thought Leadership',
            icon: '✍️',
            description: 'In-depth technical articles and industry insights. Sharing real-world solutions to complex data challenges.',
            outcome: 'Stay ahead of industry trends and learn from practical implementation experiences.',
            features: [
                'Deep Technical Tutorials & Walkthroughs',
                'Industry Trend Analysis & Predictions',
                'Case Studies from Real Projects',
                'Best Practices & Lessons Learned'
            ],
            socialProof: 'Featured technical writer',
            cta: {
                text: 'Read Latest Articles',
                url: `${contactsData.medium}?utm_source=abulkhair.ai&utm_campaign=services_writing`,
                type: 'social'
            },
            pricing: 'Free insights • Sponsor content available'
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
                    <h2 style={{ color: theme.primary }}>How I Can Help You Succeed</h2>
                    <p style={{ color: theme.tertiary }}>
                        Four proven ways to accelerate your data science journey and business growth. 
                        <strong> Trusted by 100+ clients with 4.9/5★ rating.</strong>
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

                            <div 
                                className={styles.serviceOutcome}
                                style={{ 
                                    color: theme.primary,
                                    fontWeight: '600',
                                    fontSize: '0.95rem',
                                    margin: '1rem 0',
                                    fontStyle: 'italic'
                                }}
                            >
                                💡 {service.outcome}
                            </div>

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

                            <div 
                                className={styles.socialProof}
                                style={{
                                    backgroundColor: theme.primary + '15',
                                    color: theme.primary,
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    margin: '1rem 0'
                                }}
                            >
                                ⭐ {service.socialProof}
                            </div>

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
                            🚀 Ready to Transform Your Data Science Journey?
                        </h3>
                        <p style={{ color: theme.tertiary }}>
                            Join 100+ satisfied clients who've accelerated their careers and projects. 
                            <strong> Book now - same-day sessions available.</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
                            <a
                                href={`${contactsData.monetizationLinks.primary.url}&utm_campaign=services_bottom_cta_primary`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.discoveryButton}
                                style={{
                                    backgroundColor: theme.primary,
                                    color: theme.secondary,
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '600'
                                }}
                            >
                                💬 Book Consultation ($35)
                            </a>
                            <a
                                href={`${contactsData.monetizationLinks.secondary.url}&utm_campaign=services_bottom_cta_secondary`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.discoveryButton}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: theme.primary,
                                    border: `2px solid ${theme.primary}`,
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '600'
                                }}
                            >
                                💼 Hire for Projects
                            </a>
                        </div>
                        <p style={{ 
                            color: theme.primary, 
                            fontSize: '0.9rem', 
                            marginTop: '1rem',
                            fontWeight: '600'
                        }}>
                            ⚡ 4.9/5★ rating • 100% Job Success • Same-day availability
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhatIDo;