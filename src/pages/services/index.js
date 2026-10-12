import React from 'react';
import { jsonLd } from '../../utils/json-ld';
import Head from 'next/head';
import Link from '../../components/link';
import { Navbar, BackToTop, StickyCTA } from '../../components';
import Footer from '../../components/footer/footer';
import SEOHead from '../../components/seo/seo-head';
import Reveal from '../../components/ui/reveal';
import { services } from '../../data/services';

const BASE_URL = 'https://abulkhair.ai';

function ServicesHub() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
        ],
    };

    return (
        <div className="bg-bg min-h-screen">
            <SEOHead
                title="AI & Data Science Services | Ahmed Abulkhair"
                description="LLM consulting, AI agents development, machine learning systems, and time-series forecasting — delivered in Arabic and English by Ahmed Abulkhair."
                canonical={`${BASE_URL}/services`}
            />
            <Head>
                <script
                    type="application/ld+json"
                    // Static site-owned data only.
                    dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
                />
            </Head>

            <Navbar />
            <BackToTop />
            <StickyCTA />

            <main>
                <section className="border-b border-rule pt-32 pb-16">
                    <div className="max-w-page mx-auto px-6 md:px-12">
                        <Reveal>
                            <p className="section-label">Services</p>
                            <h1 className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
                                What I can <span className="font-serif italic text-primary">build for you</span>
                            </h1>
                            <p className="text-base text-text-secondary leading-relaxed mt-6 max-w-xl">
                                Four ways to work together — from strategy sessions to production systems, in Arabic and English.
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="border-b border-rule py-16">
                    <div className="max-w-page mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {services.map((service, i) => (
                                <Reveal key={service.slug} delay={i * 80}>
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="group block h-full p-8 bg-bg-surface border-l-2 border-rule rounded-r hover:border-l-primary hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <p className="text-[0.6rem] uppercase tracking-[3px] text-text-muted mb-3">
                                            {String(i + 1).padStart(2, '0')}
                                        </p>
                                        <h2 className="text-lg font-semibold text-text-primary mb-2">{service.nav.title}</h2>
                                        <p className="text-[0.8rem] text-text-secondary leading-relaxed mb-4">{service.nav.teaser}</p>
                                        <span className="text-[0.75rem] text-primary border-b border-primary/20 pb-px group-hover:border-primary/50 transition-colors">
                                            Explore service →
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default ServicesHub;
