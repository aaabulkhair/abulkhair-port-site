import Head from 'next/head';
import { contactsData } from '../../data/contacts-data';
import { headerData } from '../../data/header-data';

function StructuredData({ locale = 'en', pageType = 'website', additionalData = {} }) {
    const baseUrl = 'https://abulkhair.ai';
    
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": locale === 'ar' ? "أحمد أبو الخير" : "Ahmed Abulkhair",
        "alternateName": ["Ahmed Abulkhair", "أحمد أبو الخير"],
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
            "Time Series Analysis",
            "Artificial Intelligence",
            "Python Programming",
            "Power BI",
            "Arabic Data Science Education"
        ],
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
        }
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
                "name": locale === 'ar' ? "استشارة علم البيانات" : "Data Science Consultation",
                "description": locale === 'ar' ? "جلسات استشارية في علم البيانات والذكاء الاصطناعي" : "Data Science and AI consultation sessions",
                "price": "35",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": contactsData.topmate
            },
            {
                "@type": "Offer", 
                "name": locale === 'ar' ? "تطوير مشاريع علم البيانات" : "Data Science Project Development",
                "description": locale === 'ar' ? "تطوير حلول علم البيانات والتعلم الآلي" : "Data Science and Machine Learning solutions development",
                "price": "35",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "35",
                    "priceCurrency": "USD",
                    "unitCode": "HUR"
                },
                "availability": "https://schema.org/InStock",
                "url": contactsData.upwork
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
                    "serviceType": "Data Science Consulting",
                    "provider": {
                        "@type": "Person",
                        "name": "Ahmed Abulkhair"
                    },
                    "areaServed": "Worldwide",
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Data Science Services",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "LLM Consulting",
                                    "description": "Large Language Model integration and development"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Time-Series Forecasting",
                                    "description": "Advanced time-series analysis and forecasting"
                                }
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
    
    const allSchemas = [
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