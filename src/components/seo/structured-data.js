import Head from 'next/head';
import { jsonLd } from '../../utils/json-ld';
import { contactsData } from '../../data/contacts-data';
import { headerData } from '../../data/header-data';

const baseUrl = 'https://abulkhair.ai';
const personId = `${baseUrl}/#person`;

// Profile URLs without tracking params — sameAs must identify the profile itself.
const cleanUrl = (url) => (url ? url.split('?')[0] : url);

function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": personId,
        "name": "Ahmed Abulkhair",
        "givenName": "Ahmed",
        "familyName": "Abulkhair",
        "alternateName": [
            "أحمد أبو الخير",
            "Ahmed Abu AlKhair",
            "Ahmed Abul Khair"
        ],
        "disambiguatingDescription": "AI Scientist at Incept Labs, known for Arabic language data science content, LLM research, and mentorship",
        "description": "Ahmed Abulkhair - AI Scientist at Incept Labs specializing in Large Language Models and Time-Series Analysis",
        "url": baseUrl,
        "image": `${baseUrl}/profile.png`,
        "sameAs": [
            contactsData.linkedIn,
            contactsData.github,
            contactsData.medium,
            contactsData.youtube,
            contactsData.tiktok,
            contactsData.topmate,
            contactsData.upwork
        ].filter(Boolean).map(cleanUrl),
        "jobTitle": "AI Scientist",
        "worksFor": {
            "@type": "Organization",
            "name": "Incept Labs",
            "url": "https://inceptlabs.ai/"
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
        "knowsLanguage": ["Arabic", "English"],
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
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": "Ahmed Abulkhair - Data Science Services",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "description": "Data Science and AI services specializing in Large Language Models and Time-Series Analysis",
        "founder": { "@id": personId },
        "areaServed": "Worldwide",
        "serviceType": "Data Science Consulting",
        "priceRange": "$50-$100",
        "telephone": contactsData.phone,
        "email": contactsData.email,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cairo",
            "addressCountry": "EG"
        },
        "offers": [
            {
                "@type": "Offer",
                "name": "1-on-1 Consulting",
                "description": "LLM, AI agents, RAG systems, machine learning and data science consulting",
                "price": "50",
                "priceCurrency": "USD",
                "category": "Consulting",
                "availability": "https://schema.org/InStock",
                "url": cleanUrl(contactsData.topmate),
                "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "50",
                    "priceCurrency": "USD",
                    "unitText": "per session"
                }
            },
            {
                "@type": "Offer",
                "name": "Project Development",
                "description": "End-to-end machine learning, data science, LLM and AI agent development",
                "priceCurrency": "USD",
                "category": "Development",
                "availability": "https://schema.org/InStock",
                "url": cleanUrl(contactsData.upwork),
                "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "minPrice": "60",
                    "maxPrice": "100",
                    "priceCurrency": "USD",
                    "unitCode": "HUR"
                }
            }
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "name": "Ahmed Abulkhair",
        "alternateName": "abulkhair.ai",
        "url": baseUrl,
        "description": headerData.description,
        "inLanguage": "en",
        "author": { "@id": personId }
    };

    const allSchemas = [personSchema, organizationSchema, websiteSchema];

    return (
        <Head>
            {allSchemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: jsonLd(schema)
                    }}
                />
            ))}
        </Head>
    );
}

export default StructuredData;
