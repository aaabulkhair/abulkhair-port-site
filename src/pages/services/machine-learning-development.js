import React from 'react';
import Head from 'next/head';
import { ThemeContext } from '../../contexts/theme-context';
import { Navbar, BackToTop } from '../../components';
import ChangeTheme from '../../components/change-theme/change-theme';
import SEOHead from '../../components/seo/seo-head';
import StructuredData from '../../components/seo/structured-data';
import { contactsData } from '../../data/contacts-data';
import styles from '../../styles/ServicePage.module.css';

function MachineLearningDevelopment() {
    const { theme } = React.useContext(ThemeContext);
    const pageData = {
        title: "Machine Learning Development Egypt | ML Expert Services",
        description: "Expert machine learning development in Egypt. End-to-end ML pipelines, time-series forecasting, computer vision, NLP. 100+ successful ML projects. Hire Ahmed Abulkhair.",
        canonical: "https://abulkhair.ai/services/machine-learning-development"
    };

    const serviceDetails = {
        title: "Machine Learning Development Services",
        subtitle: "End-to-End ML Solutions from Data to Deployment",
        hero: {
            title: "Egypt's Top ML Development Expert",
            description: "Building production-ready machine learning systems that drive real business value. From proof-of-concept to scalable deployment, I deliver complete ML solutions.",
            cta: {
                text: "Start ML Project",
                url: `${contactsData.monetizationLinks.secondary.url}&utm_campaign=ml_development_egypt_hero`
            }
        },
        services: [
            {
                title: "End-to-End ML Pipelines",
                description: "Complete machine learning workflows from data ingestion to model deployment with automated retraining and monitoring.",
                technologies: ["Scikit-learn", "TensorFlow", "PyTorch", "MLflow", "Docker", "Kubernetes"],
                outcomes: ["Automated ML workflows", "Scalable predictions", "Model monitoring", "CI/CD integration"]
            },
            {
                title: "Time-Series Forecasting",
                description: "Advanced forecasting models for business planning, demand prediction, and trend analysis using state-of-the-art techniques.",
                technologies: ["ARIMA", "SARIMA", "Prophet", "TFT", "LSTM", "Transformer"],
                outcomes: ["Accurate forecasts", "Seasonal pattern detection", "Uncertainty quantification", "Real-time predictions"]
            },
            {
                title: "Computer Vision Solutions",
                description: "Custom computer vision applications including object detection, image classification, and video analysis for business applications.",
                technologies: ["OpenCV", "YOLO", "ResNet", "EfficientNet", "TensorFlow", "PyTorch"],
                outcomes: ["Automated visual inspection", "Real-time detection", "Image analysis", "Quality control"]
            },
            {
                title: "Natural Language Processing",
                description: "NLP solutions for text analysis, sentiment analysis, document processing, and conversational AI with Arabic language expertise.",
                technologies: ["spaCy", "NLTK", "Transformers", "BERT", "Arabic NLP", "Sentiment Analysis"],
                outcomes: ["Text understanding", "Arabic processing", "Sentiment insights", "Document automation"]
            }
        ],
        industries: [
            {
                name: "E-commerce",
                applications: ["Recommendation Systems", "Price Optimization", "Demand Forecasting", "Customer Segmentation"],
                icon: "🛒"
            },
            {
                name: "Finance",
                applications: ["Fraud Detection", "Risk Assessment", "Algorithmic Trading", "Credit Scoring"],
                icon: "💰"
            },
            {
                name: "Healthcare",
                applications: ["Medical Image Analysis", "Drug Discovery", "Patient Risk Prediction", "Clinical Decision Support"],
                icon: "🏥"
            },
            {
                name: "Manufacturing",
                applications: ["Quality Control", "Predictive Maintenance", "Supply Chain Optimization", "Process Automation"],
                icon: "🏭"
            }
        ],
        process: [
            {
                step: "1",
                title: "Discovery & Planning",
                description: "Understanding your business problem, data assessment, and solution architecture design."
            },
            {
                step: "2",
                title: "Data Preparation",
                description: "Data cleaning, feature engineering, and exploratory data analysis for optimal model performance."
            },
            {
                step: "3",
                title: "Model Development",
                description: "Algorithm selection, model training, hyperparameter tuning, and performance optimization."
            },
            {
                step: "4",
                title: "Deployment & Monitoring",
                description: "Production deployment, API development, monitoring setup, and maintenance planning."
            }
        ],
        pricing: {
            consulting: {
                title: "ML Strategy Consultation",
                price: "$45/hour",
                description: "Expert guidance on ML strategy and implementation planning",
                features: [
                    "Problem definition and scoping",
                    "Data strategy and assessment",
                    "Algorithm selection guidance",
                    "Architecture and infrastructure planning",
                    "ROI estimation and timeline planning"
                ]
            },
            development: {
                title: "Full ML Development",
                price: "$60-90/hour",
                description: "Complete ML solution development from concept to deployment",
                features: [
                    "End-to-end pipeline development",
                    "Model training and optimization",
                    "API development and deployment",
                    "Monitoring and maintenance setup",
                    "Documentation and knowledge transfer"
                ]
            }
        },
        faq: [
            {
                question: "What types of ML projects do you work on?",
                answer: "I work on end-to-end ML pipelines, time-series forecasting, NLP, computer vision, and recommendation systems. Each project is tailored to your specific business requirements."
            },
            {
                question: "How long does a typical ML project take?",
                answer: "A proof-of-concept takes 2-4 weeks. Production-ready solutions typically take 6-12 weeks depending on complexity, data quality, and deployment requirements."
            },
            {
                question: "Do you provide ongoing model maintenance?",
                answer: "Yes, I offer monitoring and retraining services to ensure model performance doesn't degrade over time. This includes drift detection, automated retraining pipelines, and performance dashboards."
            },
            {
                question: "What industries have you worked in?",
                answer: "I have experience across e-commerce, finance, healthcare, manufacturing, and maritime. My solutions adapt to domain-specific requirements and regulatory constraints."
            }
        ],
        testimonials: [
            {
                name: "Omar Khalil",
                company: "ShopBrain Egypt",
                text: "Ahmed built our recommendation system that increased sales by 25%. His expertise in both machine learning and business understanding is exceptional.",
                rating: 5
            },
            {
                name: "Fatima Al-Rashid",
                company: "Cairo Insurance Co.",
                text: "The fraud detection model he developed saved us millions in fraudulent claims. The system is now processing thousands of transactions daily with 98% accuracy.",
                rating: 5
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
                                <span className={styles.statLabel}>ML Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>98%</span>
                                <span className={styles.statLabel}>Accuracy Rate</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>5+</span>
                                <span className={styles.statLabel}>Years Experience</span>
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
                        <h2 className={styles.sectionTitle}>ML Development Services</h2>
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

                {/* Industries Section */}
                <section className={styles.industriesSection} style={{ padding: '80px 0', background: 'white' }}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Industries We Serve</h2>
                        <div className={styles.servicesGrid}>
                            {serviceDetails.industries.map((industry, index) => (
                                <div key={index} className={styles.serviceCard}>
                                    <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                                        {industry.icon}
                                    </div>
                                    <h3 className={styles.serviceTitle}>{industry.name}</h3>
                                    <div className={styles.outcomes}>
                                        <h4>Applications:</h4>
                                        <ul>
                                            {industry.applications.map((app, idx) => (
                                                <li key={idx}>{app}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section style={{ padding: '80px 0', background: '#f8fafc' }}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Our ML Development Process</h2>
                        <div className={styles.servicesGrid}>
                            {serviceDetails.process.map((step, index) => (
                                <div key={index} className={styles.serviceCard}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                        color: '#667eea',
                                        marginBottom: '1rem'
                                    }}>
                                        Step {step.step}
                                    </div>
                                    <h3 className={styles.serviceTitle}>{step.title}</h3>
                                    <p className={styles.serviceDescription}>{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className={styles.pricingSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>ML Development Pricing</h2>
                        <div className={styles.pricingGrid}>
                            <div className={styles.pricingCard}>
                                <h3>{serviceDetails.pricing.consulting.title}</h3>
                                <div className={styles.price}>{serviceDetails.pricing.consulting.price}</div>
                                <p>{serviceDetails.pricing.consulting.description}</p>
                                <ul>
                                    {serviceDetails.pricing.consulting.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                                <a
                                    href={`${contactsData.monetizationLinks.primary.url}&utm_campaign=ml_consulting_pricing`}
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
                                    href={`${contactsData.monetizationLinks.secondary.url}&utm_campaign=ml_development_pricing`}
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

                {/* Related Services */}
                <section style={{ padding: '40px 0', textAlign: 'center' }}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Related Services</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            Need LLM and AI agent solutions?
                            Check out our <a href="/services/llm-consulting-egypt" style={{ color: '#667eea', textDecoration: 'underline' }}>LLM Consulting Services</a>.
                        </p>
                    </div>
                </section>
            </div>

            {/* FAQ Schema - static data only, safe for JSON-LD injection */}
            <Head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": serviceDetails.faq.map(item => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    }))
                })}} />
            </Head>
        </div>
    );
}

export default MachineLearningDevelopment;