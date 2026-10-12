import React from 'react';
import { jsonLd } from '../../utils/json-ld';
import Head from 'next/head';
import { Navbar, BackToTop, StickyCTA } from '../index';
import Footer from '../footer/footer';
import SEOHead from '../seo/seo-head';
import ServiceHero from './sections/service-hero';
import ServiceOfferings from './sections/service-offerings';
import ServiceIndustries from './sections/service-industries';
import ServiceProcess from './sections/service-process';
import ServicePricing from './sections/service-pricing';
import ServiceFaq from './sections/service-faq';
import ServiceCta from './sections/service-cta';

const BASE_URL = 'https://abulkhair.ai';

function buildJsonLd(service) {
    const canonical = `${BASE_URL}/services/${service.slug}`;

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.nav.title,
        description: service.seo.description,
        url: canonical,
        areaServed: ['Egypt', 'Middle East', 'Worldwide'],
        availableLanguage: ['English', 'Arabic'],
        provider: {
            '@type': 'Person',
            name: 'Ahmed Abulkhair',
            url: BASE_URL,
        },
    };

    const faqSchema = service.faq?.length
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: service.faq.map((item) => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
          }
        : null;

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
            { '@type': 'ListItem', position: 3, name: service.nav.title, item: canonical },
        ],
    };

    return [serviceSchema, faqSchema, breadcrumbSchema].filter(Boolean);
}

function ServicePage({ service }) {
    // Section numbering follows whichever sections this service defines.
    let n = 0;
    const next = () => String(++n).padStart(2, '0');

    return (
        <div className="bg-bg min-h-screen">
            <SEOHead
                title={service.seo.title}
                description={service.seo.description}
                canonical={`${BASE_URL}/services/${service.slug}`}
            />
            <Head>
                {buildJsonLd(service).map((schema, i) => (
                    <script
                        key={i}
                        type="application/ld+json"
                        // Static site-owned data only — never user input.
                        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
                    />
                ))}
            </Head>

            <Navbar />
            <BackToTop />
            <StickyCTA />

            <main>
                <ServiceHero hero={service.hero} />
                {service.offerings?.length > 0 && <ServiceOfferings offerings={service.offerings} number={next()} />}
                {service.industries?.length > 0 && <ServiceIndustries industries={service.industries} number={next()} />}
                {service.process?.length > 0 && <ServiceProcess process={service.process} number={next()} />}
                {service.pricing?.length > 0 && <ServicePricing pricing={service.pricing} number={next()} />}
                {service.faq?.length > 0 && <ServiceFaq faq={service.faq} number={next()} />}
                <ServiceCta finalCta={service.finalCta} related={service.related} />
            </main>

            <Footer />
        </div>
    );
}

export default ServicePage;
