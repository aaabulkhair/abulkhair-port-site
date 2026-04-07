import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { featuredTestimonials } from '../../data/testimonials-data';

function Testimonials() {
    const { theme } = useContext(ThemeContext);

    return (
        <section className="border-b border-rule py-16" id="testimonials" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">05 / Testimonials</p>
                <h2 className="text-3xl font-light tracking-tight mb-2">
                    What Clients <strong className="font-bold">Say</strong>
                </h2>
                <p className="text-sm text-text-secondary mb-8">
                    Real results from 100+ consultations and 28+ successful projects
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredTestimonials.map((t) => (
                        <div key={t.id} className="relative p-6 bg-bg-surface rounded">
                            <span className="absolute top-2 left-4 text-5xl text-primary/10 font-serif leading-none select-none">
                                &ldquo;
                            </span>
                            <p className="text-[0.8rem] text-text-secondary leading-relaxed italic pt-4 mb-4">
                                {t.testimonial}
                            </p>
                            <div className="text-[0.75rem] font-semibold text-text-primary">{t.name}</div>
                            <div className="text-[0.65rem] text-text-muted mb-3">{t.role}</div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-[0.65rem] text-primary">
                                    {Array.from({ length: t.rating }, () => '\u2605').join('')} {t.rating}/5
                                </span>
                                <span className="text-[0.6rem] text-text-muted px-2 py-0.5 border border-rule rounded-sm">
                                    {t.platform}
                                </span>
                                <span className="text-[0.6rem] text-primary/50 px-2 py-0.5 border border-primary/15 rounded-sm">
                                    {t.service}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-12 mt-8 p-6 bg-bg-surface rounded">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">4.9</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">&#9733; Average Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">100+</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">Hours of Consultations</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">Job Success Rate</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
