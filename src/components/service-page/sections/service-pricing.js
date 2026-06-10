import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { MonetizationLink } from '../../analytics/enhanced-link-tracker';
import Reveal from '../../ui/reveal';

function ServicePricing({ pricing, number }) {
    return (
        <section className="border-b border-rule py-16">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">{number} / Pricing</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                    {pricing.map((plan, i) => (
                        <Reveal key={plan.title} delay={i * 80}>
                            <div className={`relative h-full flex flex-col bg-bg-surface border rounded p-8 ${plan.featured ? 'border-primary/30' : 'border-rule'}`}>
                                {plan.featured && (
                                    <span className="absolute -top-2.5 left-8 text-[0.6rem] uppercase tracking-[2px] text-bg bg-primary px-2 py-0.5 rounded-sm">
                                        Most popular
                                    </span>
                                )}
                                <h3 className="text-sm font-semibold text-text-primary mb-4">{plan.title}</h3>
                                <div className="mb-3">
                                    <span className="text-3xl font-light text-primary">{plan.price}</span>
                                    <span className="text-[0.75rem] text-text-secondary">{plan.period}</span>
                                </div>
                                <p className="text-[0.8rem] text-text-secondary leading-relaxed mb-5">{plan.description}</p>
                                <ul className="space-y-2 mb-8 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-[0.75rem] text-text-secondary">
                                            <FiCheck size={13} aria-hidden="true" className="text-primary mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <MonetizationLink
                                    href={plan.cta.url}
                                    platform={plan.cta.platform}
                                    position="service_pricing"
                                >
                                    <span className="block w-full text-center px-6 py-2.5 bg-primary text-bg rounded text-sm font-semibold hover:opacity-90 transition-opacity">
                                        {plan.cta.text}
                                    </span>
                                </MonetizationLink>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicePricing;
