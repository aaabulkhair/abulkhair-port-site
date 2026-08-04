import React from 'react';
import Reveal from '../../ui/reveal';

// Reuses the Experience timeline grammar: ghost number column + hairline rules.
function ServiceProcess({ process, number }) {
    return (
        <section className="border-b border-rule py-16">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">{number} / Process</p>
                <div className="max-w-2xl">
                    {process.map((step, i) => (
                        <Reveal key={step.step} delay={i * 80}>
                            <div className="grid grid-cols-[64px_1fr] gap-4 py-6 border-b border-rule last:border-b-0">
                                <div className="text-3xl font-light text-primary/30 leading-none">{step.step}</div>
                                <div>
                                    <h3 className="text-sm font-semibold text-text-primary mb-1">{step.title}</h3>
                                    <p className="text-[0.8rem] text-text-secondary leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServiceProcess;
