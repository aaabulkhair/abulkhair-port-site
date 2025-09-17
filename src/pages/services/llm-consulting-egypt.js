import React from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { Navbar, BackToTop } from '../../components';
import ChangeTheme from '../../components/change-theme/change-theme';
import SEOHead from '../../components/seo/seo-head';
import StructuredData from '../../components/seo/structured-data';
import { contactsData } from '../../data/contacts-data';
import styles from '../../styles/ServicePage.module.css';

function LLMConsultingEgypt() {
    const { theme } = React.useContext(ThemeContext);
    const pageData = {
        title: "LLM Consulting Egypt | Large Language Models Expert",
        description: "Expert LLM consulting in Egypt. Specializing in RAG systems, LangChain, AI agents, and Arabic NLP. 100+ successful projects. Book consultation with Ahmed Abulkhair.",
        canonical: "https://abulkhair.ai/services/llm-consulting-egypt"
    };

    const serviceDetails = {
        title: "LLM & AI Consulting Services in Egypt",
        subtitle: "Transform Your Business with Large Language Models & Intelligent AI Agents",
        hero: {
            title: "Egypt's Leading LLM Consultant",
            description: "Specializing in Large Language Models, RAG systems, and AI agents development. Helping Egyptian businesses harness the power of conversational AI and intelligent automation.",
            cta: {
                text: "Book LLM Consultation",
                url: `${contactsData.monetizationLinks.primary.url}&utm_campaign=llm_consulting_egypt_hero`
            }
        },
        services: [
            {
                title: "RAG Systems Development",
                description: "Build production-ready Retrieval-Augmented Generation systems with vector databases and semantic search.",
                technologies: ["LangChain", "Pinecone", "Chroma", "FAISS", "OpenAI", "Hugging Face"],
                outcomes: ["Accurate document retrieval", "Contextual AI responses", "Reduced hallucinations"]
            },
            {
                title: "AI Agents & Automation",
                description: "Create intelligent agents that can reason, plan, and execute complex tasks autonomously using LangGraph and CrewAI.",
                technologies: ["LangGraph", "CrewAI", "Function Calling", "Tool Integration", "Multi-Agent Systems"],
                outcomes: ["Automated workflows", "Intelligent decision making", "24/7 AI assistance"]
            },
            {
                title: "Arabic NLP Solutions",
                description: "Specialized in Arabic language processing, cultural context understanding, and bilingual AI systems.",
                technologies: ["Arabic BERT", "mBERT", "AraBERT", "CAMeLBERT", "Custom Fine-tuning"],
                outcomes: ["Accurate Arabic understanding", "Cultural context awareness", "Bilingual capabilities"]
            },
            {
                title: "LLM Fine-tuning & Training",
                description: "Custom model training and fine-tuning for domain-specific applications and improved performance.",
                technologies: ["PyTorch", "Transformers", "LoRA", "QLoRA", "PEFT", "Custom Datasets"],
                outcomes: ["Domain expertise", "Improved accuracy", "Cost optimization"]
            }
        ],
        pricing: {
            consultation: {
                title: "LLM Strategy Consultation",
                price: "$50/hour",
                description: "1-on-1 sessions to plan your LLM implementation strategy",
                features: [
                    "LLM architecture design",
                    "Technology stack recommendations",
                    "Implementation roadmap",
                    "Cost optimization strategies",
                    "Arabic NLP guidance"
                ]
            },
            development: {
                title: "LLM Development Projects",
                price: "$60-100/hour",
                description: "End-to-end LLM system development and deployment",
                features: [
                    "RAG system implementation",
                    "AI agent development",
                    "Custom model fine-tuning",
                    "Production deployment",
                    "Ongoing maintenance"
                ]
            }
        },
        testimonials: [
            {
                name: "Sarah Ahmed",
                company: "Egyptian Fintech Startup",
                text: "Ahmed helped us build a sophisticated RAG system for Arabic financial document analysis. The system now processes thousands of documents daily with 95% accuracy.",
                rating: 5
            },
            {
                name: "Mohamed Hassan",
                company: "Cairo Tech Company",
                text: "His expertise in LangChain and AI agents transformed our customer service. We now handle 80% of inquiries automatically with human-like responses.",
                rating: 5
            }
        ],
        faq: [
            {
                question: "What makes your LLM consulting unique for Egyptian businesses?",
                answer: "I specialize in Arabic language processing and understand the cultural context crucial for Middle Eastern applications. My experience at ALX Africa gives me deep insights into regional business needs."
            },
            {
                question: "How long does it take to implement a RAG system?",
                answer: "Depending on complexity, a basic RAG system takes 2-4 weeks. Enterprise-grade systems with custom fine-tuning may take 6-12 weeks. I provide detailed timelines during consultation."
            },
            {
                question: "Do you work with both Arabic and English content?",
                answer: "Yes, I specialize in bilingual AI systems. Many of my projects involve processing both Arabic and English content simultaneously with proper language detection and context switching."
            },
            {
                question: "What's included in the consultation sessions?",
                answer: "Strategy planning, architecture design, technology recommendations, implementation roadmap, cost estimates, and ongoing support guidance. All sessions include follow-up documentation."
            }
        ]
    };

    return (
        <div>
            <SEOHead
                title={pageData.title}
                description={pageData.description}
                canonical={pageData.canonical}
            />
            <StructuredData pageType="services" />

            <BackToTop />
            <ChangeTheme />
            <Navbar />

            <div className={styles.servicePage}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <h1 className={styles.heroTitle}>{serviceDetails.hero.title}</h1>
                        <p className={styles.heroDescription}>{serviceDetails.hero.description}</p>
                        <div className={styles.heroStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>100+</span>
                                <span className={styles.statLabel}>LLM Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>4.9★</span>
                                <span className={styles.statLabel}>Client Rating</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>Arabic</span>
                                <span className={styles.statLabel}>& English</span>
                            </div>
                        </div>
                        <a
                            href={serviceDetails.hero.cta.url}
                            className={styles.heroCta}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {serviceDetails.hero.cta.text}
                        </a>
                    </div>
                </section>

                {/* Services Grid */}
                <section className={styles.servicesSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>LLM & AI Services</h2>
                        <div className={styles.servicesGrid}>
                            {serviceDetails.services.map((service, index) => (
                                <div key={index} className={styles.serviceCard}>
                                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                                    <p className={styles.serviceDescription}>{service.description}</p>

                                    <div className={styles.technologies}>
                                        <h4>Technologies:</h4>
                                        <div className={styles.techTags}>
                                            {service.technologies.map((tech, idx) => (
                                                <span key={idx} className={styles.techTag}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.outcomes}>
                                        <h4>Outcomes:</h4>
                                        <ul>
                                            {service.outcomes.map((outcome, idx) => (
                                                <li key={idx}>{outcome}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className={styles.pricingSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>LLM Consulting Pricing</h2>
                        <div className={styles.pricingGrid}>
                            <div className={styles.pricingCard}>
                                <h3>{serviceDetails.pricing.consultation.title}</h3>
                                <div className={styles.price}>{serviceDetails.pricing.consultation.price}</div>
                                <p>{serviceDetails.pricing.consultation.description}</p>
                                <ul>
                                    {serviceDetails.pricing.consultation.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                                <a
                                    href={`${contactsData.monetizationLinks.primary.url}&utm_campaign=llm_consulting_pricing`}
                                    className={styles.pricingCta}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Book Consultation
                                </a>
                            </div>

                            <div className={styles.pricingCard}>
                                <h3>{serviceDetails.pricing.development.title}</h3>
                                <div className={styles.price}>{serviceDetails.pricing.development.price}</div>
                                <p>{serviceDetails.pricing.development.description}</p>
                                <ul>
                                    {serviceDetails.pricing.development.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                                <a
                                    href={`${contactsData.monetizationLinks.secondary.url}&utm_campaign=llm_development_pricing`}
                                    className={styles.pricingCta}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Hire for Project
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className={styles.faqSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                        <div className={styles.faqGrid}>
                            {serviceDetails.faq.map((item, index) => (
                                <div key={index} className={styles.faqItem}>
                                    <h3 className={styles.faqQuestion}>{item.question}</h3>
                                    <p className={styles.faqAnswer}>{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LLMConsultingEgypt;