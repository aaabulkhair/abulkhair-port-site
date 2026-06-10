import React from 'react';
import Link from '../../link';
import { MonetizationLink } from '../../analytics/enhanced-link-tracker';
import Reveal from '../../ui/reveal';
import { servicesBySlug } from '../../../data/services';

function ServiceCta({ finalCta, related }) {
    const relatedServices = (related || []).map((slug) => servicesBySlug[slug]).filter(Boolean);

    return (
        <section className="border-b border-rule py-20">
            <div className="max-w-page mx-auto px-6 md:px-12 text-center">
                <Reveal>
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                        {finalCta.heading}{' '}
                        <span className="font-serif italic text-primary">{finalCta.headingBold}</span>
                    </h2>
                    <p className="text-sm text-text-secondary mt-4 max-w-md mx-auto">{finalCta.sub}</p>
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <MonetizationLink href={finalCta.primary.url} platform={finalCta.primary.platform} position="service_footer">
                            <span className="inline-flex items-center justify-center px-7 py-3 bg-primary text-bg rounded font-semibold text-sm hover:opacity-90 transition-opacity">
                                {finalCta.primary.text}
                            </span>
                        </MonetizationLink>
                        {finalCta.secondary && (
                            <MonetizationLink href={finalCta.secondary.url} platform={finalCta.secondary.platform} position="service_footer">
                                <span className="inline-flex items-center justify-center px-7 py-3 border border-primary/30 text-primary rounded text-sm hover:border-primary/60 transition-colors">
                                    {finalCta.secondary.text}
                                </span>
                            </MonetizationLink>
                        )}
                    </div>

                    {relatedServices.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-rule max-w-md mx-auto">
                            <p className="text-[0.6rem] uppercase tracking-[3px] text-text-muted mb-4">Related services</p>
                            <div className="flex flex-wrap justify-center gap-6">
                                {relatedServices.map((service) => (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="text-[0.8rem] text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors"
                                    >
                                        {service.nav.title} →
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </Reveal>
            </div>
        </section>
    );
}

export default ServiceCta;
