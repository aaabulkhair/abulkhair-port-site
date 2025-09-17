import Head from 'next/head';
import { contactsData } from '../../data/contacts-data';
import { headerData } from '../../data/header-data';

function StructuredData({ locale = 'en', pageType = 'website', additionalData = {} }) {
    const baseUrl = 'https://abulkhair.ai';
    
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": locale === 'ar' ? "أحمد أبو الخير" : "Ahmed Abulkhair",
        "givenName": locale === 'ar' ? "أحمد" : "Ahmed",
        "familyName": locale === 'ar' ? "أبو الخير" : "Abulkhair", 
        "alternateName": [
            "Ahmed Abulkhair",
            "أحمد أبو الخير",
            "Ahmed Abu AlKhair",
            "Ahmed Abul Khair",
            "Dr. Ahmed Abulkhair"
        ],
        "disambiguatingDescription": "Senior Data Scientist and AI educator, known for Arabic language data science content and mentorship",
        "url": baseUrl,
        "image": `${baseUrl}/images/profile.jpg`,
        "sameAs": [
            contactsData.linkedIn,
            contactsData.github,
            contactsData.medium,
            contactsData.youtube,
            contactsData.tiktok,
            contactsData.topmate,
            contactsData.upwork
        ].filter(Boolean),
        "jobTitle": locale === 'ar' ? "عالم بيانات كبير ومُعلم" : "Senior Data Scientist & Educator",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance Data Scientist"
        },
        "knowsAbout": [
            "Data Science",
            "Machine Learning",
            "Large Language Models",
            "AI Agents",
            "RAG Systems",
            "LangChain",
            "Time Series Analysis",
            "Artificial Intelligence",
            "Python Programming",
            "Arabic Data Science Education",
            "Agentic AI",
            "Vector Databases"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": contactsData.phone,
            "contactType": "customer service",
            "email": contactsData.email,
            "availableLanguage": ["Arabic", "English"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cairo",
            "addressCountry": "EG"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": baseUrl
        },
        "description": locale === 'ar' ? 
            "أحمد أبو الخير - عالم بيانات كبير ومُعلم متخصص في نماذج اللغة الكبيرة وتحليل السلاسل الزمنية" :
            "Ahmed Abulkhair - Senior Data Scientist & Educator specializing in Large Language Models and Time-Series Analysis",
        "knowsLanguage": [
            {
                "@type": "Language",
                "name": "Arabic",
                "alternateName": "ar"
            },
            {
                "@type": "Language", 
                "name": "English",
                "alternateName": "en"
            }
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": locale === 'ar' ? "عالم بيانات كبير" : "Senior Data Scientist",
            "occupationLocation": {
                "@type": "City",
                "name": "Cairo"
            },
            "skills": [
                "Machine Learning",
                "Large Language Models",
                "AI Agents Development",
                "RAG Systems",
                "LangChain",
                "Time Series Forecasting",
                "Python Programming",
                "Agentic AI",
                "Vector Databases",
                "Artificial Intelligence"
            ]
        },
        "award": [
            "4.9/5 Star Rating on Topmate (100+ consultations)",
            "100% Job Success Rate on Upwork",
            "Top Rated Plus Freelancer",
            "Featured Arabic Data Science Educator"
        ]
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": locale === 'ar' ? "أحمد أبو الخير - خدمات علم البيانات" : "Ahmed Abulkhair - Data Science Services",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "description": locale === 'ar' ? 
            "خدمات علم البيانات والذكاء الاصطناعي متخصصة في نماذج اللغة الكبيرة وتحليل السلاسل الزمنية" :
            "Data Science and AI services specializing in Large Language Models and Time-Series Analysis",
        "founder": {
            "@type": "Person",
            "name": "Ahmed Abulkhair"
        },
        "areaServed": "Worldwide",
        "serviceType": "Data Science Consulting",
        "priceRange": "$35-$100",
        "telephone": contactsData.phone,
        "email": contactsData.email,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cairo",
            "addressCountry": "EG"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5",
            "ratingCount": "13",
            "reviewCount": "13"
        },
        "offers": [
            {
                "@type": "Offer",
                "name": locale === 'ar' ? "استشارة فردية" : "1-on-1 Consulting",
                "description": locale === 'ar' ? "استشارات في LLM والعوامل الذكية وأنظمة RAG مع خبير 4.9/5 نجوم" : "LLM, AI Agents & RAG systems consulting from a 4.9/5★ rated expert",
                "price": "35",
                "priceCurrency": "USD",
                "category": "Consulting",
                "availability": "https://schema.org/InStock",
                "url": contactsData.topmate,
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "35",
                    "priceCurrency": "USD",
                    "unitText": "per session"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "bestRating": "5",
                    "ratingCount": "100"
                }
            },
            {
                "@type": "Offer",
                "name": locale === 'ar' ? "تطوير المشاريع" : "Project Development",
                "description": locale === 'ar' ? "حلول علم البيانات شاملة من مطور بمعدل نجاح 100%" : "Complete data science solutions from a Top Rated freelancer",
                "price": "35",
                "priceCurrency": "USD",
                "category": "Development",
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "35",
                    "maxPrice": "45",
                    "priceCurrency": "USD",
                    "unitCode": "HUR"
                },
                "availability": "https://schema.org/InStock",
                "url": contactsData.upwork,
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5.0",
                    "bestRating": "5",
                    "description": "100% Job Success Rate"
                }
            },
            {
                "@type": "Offer",
                "name": locale === 'ar' ? "التعليم باللغة العربية" : "Arabic Data Science Education",
                "description": locale === 'ar' ? "محتوى تعليمي مجاني في علم البيانات باللغة العربية" : "Free data science education content in Arabic",
                "price": "0",
                "priceCurrency": "USD",
                "category": "Education",
                "availability": "https://schema.org/InStock",
                "url": contactsData.youtube,
                "educationalUse": "Data Science Training",
                "teaches": ["Machine Learning", "Data Analysis", "Career Development"]
            },
            {
                "@type": "Offer",
                "name": locale === 'ar' ? "حلول الذكاء الاصطناعي والعوامل الذكية" : "Agentic AI & RAG Solutions",
                "description": locale === 'ar' ? "تطوير عوامل ذكية متقدمة وأنظمة RAG باستخدام LangChain والتقنيات الحديثة" : "Advanced AI agent development and RAG system implementation using LangChain",
                "price": "50",
                "priceCurrency": "USD",
                "category": "AI Development",
                "availability": "https://schema.org/InStock",
                "url": contactsData.topmate,
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "50",
                    "maxPrice": "100",
                    "priceCurrency": "USD",
                    "unitText": "per hour"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "bestRating": "5",
                    "ratingCount": "25"
                }
            },
            {
                "@type": "Offer",
                "name": locale === 'ar' ? "المحتوى التقني والقيادة الفكرية" : "Technical Content & Thought Leadership",
                "description": locale === 'ar' ? "مقالات تقنية متعمقة ورؤى صناعية" : "In-depth technical articles and industry insights",
                "price": "0",
                "priceCurrency": "USD",
                "category": "Content",
                "availability": "https://schema.org/InStock",
                "url": contactsData.medium,
                "educationalUse": "Professional Development"
            }
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": locale === 'ar' ? "أحمد أبو الخير" : "Ahmed Abulkhair",
        "alternateName": "abulkhair.ai",
        "url": baseUrl,
        "description": locale === 'ar' ? 
            headerData.desciption.replace(/Book a consultation or hire me for your next project\. Available in Arabic and English\./, "احجز استشارة أو وظفني لمشروعك القادم. متوفر باللغتين العربية والإنجليزية.") :
            headerData.desciption,
        "inLanguage": [
            {
                "@type": "Language",
                "name": "English",
                "alternateName": "en"
            },
            {
                "@type": "Language",
                "name": "Arabic", 
                "alternateName": "ar"
            }
        ],
        "author": {
            "@type": "Person",
            "name": "Ahmed Abulkhair"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": locale === 'ar' ? "الرئيسية" : "Home",
                "item": baseUrl
            }
        ]
    };

    // Additional schemas based on page type
    const getPageSpecificSchema = () => {
        switch (pageType) {
            case 'services':
                return {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Data Science Consulting & Development",
                    "provider": {
                        "@type": "Person",
                        "name": "Ahmed Abulkhair"
                    },
                    "areaServed": "Worldwide",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "bestRating": "5",
                        "ratingCount": "100"
                    },
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Data Science & AI Services",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "1-on-1 Consulting",
                                    "description": "Time-Series Forecasting (ARIMA/SARIMA/Prophet/TFT), LLM Integration & RAG Systems (LangChain/LangGraph), Career Mentorship & Interview Prep",
                                    "provider": {
                                        "@type": "Person",
                                        "name": "Ahmed Abulkhair"
                                    }
                                },
                                "price": "35",
                                "priceCurrency": "USD"
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Project Development",
                                    "description": "End-to-End ML Pipelines (Scikit-learn/TensorFlow/PyTorch), LLM & AI Agents Development (LangChain/RAG Systems), Real-time Data Processing & Model Deployment, API Development & Containerization (FastAPI/Docker)",
                                    "provider": {
                                        "@type": "Person",
                                        "name": "Ahmed Abulkhair"
                                    }
                                },
                                "price": "35",
                                "priceCurrency": "USD"
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "EducationEvent",
                                    "name": "Arabic Data Science Education",
                                    "description": "YouTube Deep-dive Tutorials (Arabic), TikTok Quick Learning Bites, Real-world Case Studies & Projects",
                                    "provider": {
                                        "@type": "Person",
                                        "name": "Ahmed Abulkhair"
                                    }
                                },
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Article",
                                    "name": "Technical Content & Thought Leadership",
                                    "description": "Deep Technical Tutorials & Walkthroughs, Industry Trend Analysis & Predictions, Case Studies from Real Projects",
                                    "author": {
                                        "@type": "Person",
                                        "name": "Ahmed Abulkhair"
                                    }
                                },
                                "price": "0",
                                "priceCurrency": "USD"
                            }
                        ]
                    }
                };
            case 'blog':
                return additionalData.articles ? {
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "name": locale === 'ar' ? "مدونة أحمد أبو الخير" : "Ahmed Abulkhair Blog",
                    "description": locale === 'ar' ? "مقالات في علم البيانات والذكاء الاصطناعي" : "Articles about Data Science and AI",
                    "url": `${baseUrl}/blog`,
                    "author": {
                        "@type": "Person",
                        "name": "Ahmed Abulkhair"
                    },
                    "blogPost": additionalData.articles.map(article => ({
                        "@type": "BlogPosting",
                        "headline": article.title,
                        "description": article.description,
                        "url": article.url,
                        "datePublished": article.published_at,
                        "author": {
                            "@type": "Person",
                            "name": "Ahmed Abulkhair"
                        }
                    }))
                } : null;
            default:
                return null;
        }
    };

    const pageSchema = getPageSpecificSchema();
    
    // Add a priority name schema to reinforce correct name ordering
    const nameAuthoritySchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}#person`,
        "name": "Ahmed Abulkhair",
        "givenName": "Ahmed",
        "familyName": "Abulkhair",
        "alternateName": "Ahmed Abu AlKhair",
        "url": baseUrl,
        "sameAs": baseUrl,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": baseUrl
        }
    };

    const allSchemas = [
        nameAuthoritySchema, // First for priority
        personSchema,
        organizationSchema, 
        websiteSchema,
        breadcrumbSchema,
        ...(pageSchema ? [pageSchema] : [])
    ];

    return (
        <Head>
            {allSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}
        </Head>
    );
}

export default StructuredData;