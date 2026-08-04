import React from 'react';
import Reveal from '../../ui/reveal';

function ServiceOfferings({ offerings, number }) {
    return (
        <section className="border-b border-rule py-16">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">{number} / What I deliver</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {offerings.map((offering, i) => (
                        <Reveal key={offering.title} delay={i * 80}>
                            <div className="h-full p-6 bg-bg-surface border-l-2 border-rule rounded-r hover:border-l-primary hover:-translate-y-0.5 transition-all duration-200">
                                <h3 className="text-sm font-semibold text-text-primary mb-2">{offering.title}</h3>
                                <p className="text-[0.8rem] text-text-secondary leading-relaxed mb-4">{offering.description}</p>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {offering.technologies.map((tech) => (
                                        <span key={tech} className="text-[0.65rem] border border-rule text-text-secondary px-2 py-0.5 rounded-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <ul className="space-y-1">
                                    {offering.outcomes.map((outcome) => (
                                        <li key={outcome} className="text-[0.75rem] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-primary/40">
                                            {outcome}
                                        </li>
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

export default ServiceOfferings;
