import React from 'react';
import { MonetizationLink } from '../../analytics/enhanced-link-tracker';
import Reveal from '../../ui/reveal';

function ServiceHero({ hero }) {
    return (
        <section className="border-b border-rule pt-32 pb-16">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <Reveal>
                    <p className="section-label">{hero.label}</p>
                    <h1 className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-3xl">
                        {hero.title}{' '}
                        <span className="font-serif italic text-primary">{hero.titleBold}</span>
                    </h1>
                    <p className="text-base text-text-secondary leading-relaxed mt-6 max-w-xl">
                        {hero.description}
                    </p>

                    {hero.stats?.length > 0 && (
                        <div className="flex flex-wrap gap-10 mt-10">
                            {hero.stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-2xl font-light text-primary">{stat.value}</div>
                                    <div className="text-[0.6rem] uppercase tracking-[2px] text-text-muted mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-10">
                        <MonetizationLink
                            href={hero.cta.url}
                            platform={hero.cta.platform}
                            position={hero.cta.position || 'service_hero'}
                        >
                            <span className="inline-flex items-center justify-center px-7 py-3 bg-primary text-bg rounded font-semibold text-sm hover:opacity-90 transition-opacity">
                                {hero.cta.text}
                            </span>
                        </MonetizationLink>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default ServiceHero;
