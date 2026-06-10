import React from 'react';
import Reveal from '../../ui/reveal';

// Typographic blocks — no icons by design.
function ServiceIndustries({ industries, number }) {
    return (
        <section className="border-b border-rule py-16">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">{number} / Industries</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {industries.map((industry, i) => (
                        <Reveal key={industry.name} delay={i * 80}>
                            <div className="border-t border-rule pt-4">
                                <h3 className="text-sm font-semibold text-text-primary mb-3">{industry.name}</h3>
                                <ul className="space-y-1.5">
                                    {industry.applications.map((app) => (
                                        <li key={app} className="text-[0.75rem] text-text-secondary">{app}</li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServiceIndustries;
