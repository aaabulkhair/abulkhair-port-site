import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { contactsData } from '../../data/contacts-data';

function WhatIDo() {
    const { theme } = useContext(ThemeContext);

    const services = [
        {
            title: '1-on-1 Consulting',
            description: 'Get personalized guidance from a Top 1% Topmate mentor. 100+ hours of successful consultations delivered.',
            outcome: 'Transform your career or solve complex ML and data challenges with expert guidance.',
            features: [
                'Machine Learning (Scikit-learn/TensorFlow/PyTorch)',
                'Time-Series Forecasting (ARIMA/SARIMA/Prophet/TFT)',
                'LLM Integration & RAG Systems (LangChain/LangGraph)',
                'Career Mentorship & Interview Prep',
                'Project Architecture & Best Practices'
            ],
            socialProof: 'Top 1% on Topmate \u2022 4.9/5\u2605 rating \u2022 100+ consultation hours',
            cta: {
                text: 'Book Your Session',
                url: `${contactsData.monetizationLinks.primary.url}&utm_campaign=services_consulting`,
            },
            pricing: 'Flexible scheduling available'
        },
        {
            title: 'Project Development',
            description: 'Complete data science solutions delivered by a Top Rated Upwork freelancer with 100% Job Success Rate.',
            outcome: 'Launch production-ready ML systems that drive measurable business results.',
            features: [
                'End-to-End ML Pipelines (Scikit-learn/TensorFlow/PyTorch)',
                'LLM & AI Agents Development (LangChain/RAG Systems)',
                'Real-time Data Processing & Model Deployment',
                'API Development & Containerization (FastAPI/Docker)'
            ],
            socialProof: 'Top Rated Upwork Freelancer \u2022 100% Job Success Rate',
            cta: {
                text: 'Hire Me Now',
                url: `${contactsData.monetizationLinks.secondary.url}&utm_campaign=services_development`,
            },
            pricing: 'Ready to work on your project directly'
        },
        {
            title: 'Arabic Data Science Education',
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
            },
            pricing: 'Free content \u2022 Premium courses coming soon'
        },
        {
            title: 'Agentic AI & RAG Solutions',
            description: 'Cutting-edge AI agent development and RAG system implementation. Specializing in LangChain, autonomous agents, and intelligent automation.',
            outcome: 'Build intelligent AI agents that can reason, plan, and execute complex tasks autonomously.',
            features: [
                'RAG Systems with Vector Databases (Pinecone/Chroma)',
                'Multi-Agent Architectures (LangGraph/CrewAI)',
                'Tool-Using AI Agents & Function Calling',
                'Conversational AI & Chatbot Development',
                'LLM Fine-tuning & Custom Model Training'
            ],
            socialProof: 'Cutting-edge AI expertise \u2022 ALX Africa Senior Data Scientist',
            cta: {
                text: 'Build AI Agents',
                url: `${contactsData.monetizationLinks.primary.url}&utm_campaign=services_agentic_ai`,
            },
            pricing: 'Enterprise AI solutions available'
        },
        {
            title: 'Technical Content & Thought Leadership',
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
            },
            pricing: 'Free insights \u2022 Sponsor content available'
        }
    ];

    return (
        <section className="border-b border-rule py-16" id="services" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">02 / Services</p>
                <h2 className="text-3xl font-light tracking-tight mb-2">
                    How I Can Help You <strong className="font-bold">Succeed</strong>
                </h2>
                <p className="text-sm text-text-secondary mb-8">
                    Five proven ways to accelerate your data science journey and business growth.{' '}
                    <strong className="text-text-primary">Trusted by 100+ clients with 4.9/5&#9733; rating.</strong>
                </p>

                {/* Top row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {services.slice(0, 3).map((service, index) => (
                        <ServiceCard key={index} service={service} theme={theme} />
                    ))}
                </div>

                {/* Bottom row: 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.slice(3).map((service, index) => (
                        <ServiceCard key={index + 3} service={service} theme={theme} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, theme }) {
    return (
        <div className="p-6 bg-bg-surface border-l-2 border-rule rounded-r hover:border-l-primary transition-colors duration-200">
            <h4 className="text-[0.85rem] font-semibold text-text-primary mb-2">{service.title}</h4>
            <p className="text-[0.75rem] text-text-secondary leading-relaxed mb-3">{service.description}</p>

            <p className="text-[0.75rem] text-primary/70 font-medium italic mb-3">
                {service.outcome}
            </p>

            <ul className="mb-3 space-y-1">
                {service.features.map((feature, idx) => (
                    <li key={idx} className="text-[0.7rem] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-rule">
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="text-[0.65rem] text-primary/50 font-semibold text-center bg-primary-dim rounded py-2 px-3 mb-3">
                {service.socialProof}
            </div>

            <div className="text-[0.65rem] text-primary/60 mb-3">{service.pricing}</div>

            <a
                href={service.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[0.7rem] text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors"
            >
                {service.cta.text} &rarr;
            </a>
        </div>
    );
}

export default WhatIDo;
