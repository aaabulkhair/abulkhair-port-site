import React from 'react';
import { aboutData } from '../../data/about-data';
import { achievementsData } from '../../data/achievements-data';

function About() {
    return (
        <section
            className="border-b border-rule py-24"
            id="about"
        >
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">01 / About</p>
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12">
                    <div>
                        <p className="font-serif italic text-xl md:text-2xl text-text-primary leading-[1.5] mb-8">
                            &ldquo;I turn complex data into products people rely on — from forecasting engines to Arabic LLMs that rank with the best.&rdquo;
                        </p>
                        <p className="text-[0.95rem] text-text-secondary leading-[1.8]">
                            {aboutData.description1}
                        </p>
                        <br />
                        <p className="text-[0.95rem] text-text-secondary leading-[1.8]">
                            {aboutData.description2}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:pt-2">
                        {achievementsData.map((a) => (
                            <div
                                key={a.id}
                                className="p-4 bg-bg-surface border border-rule rounded hover:border-primary/25 transition-colors"
                            >
                                <p className="text-[0.75rem] font-semibold text-primary">{a.label}</p>
                                <p className="text-[0.7rem] text-text-secondary leading-relaxed mt-1">{a.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
