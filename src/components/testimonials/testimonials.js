import React from 'react';
import { metrics, proof } from '../../data/metrics';
import { featuredTestimonials } from '../../data/testimonials-data';
import Rating from '../ui/rating';

function Testimonials() {

    return (
        <section className="border-b border-rule py-24" id="testimonials">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">05 / Testimonials</p>
                <h2 className="display-section font-light mb-2">
                    What clients <strong className="font-serif italic font-medium text-primary">say</strong>
                </h2>
                <p className="text-sm text-text-secondary mb-8">
                    From {metrics.topmate.bookings} Topmate sessions and {metrics.upwork.jobs} Upwork jobs
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredTestimonials.map((t) => (
                        <div key={t.id} className="relative p-6 bg-bg-surface rounded">
                            <span className="absolute top-2 left-4 text-5xl text-primary/10 font-serif leading-none select-none">
                                &ldquo;
                            </span>
                            <p className="font-serif text-[0.85rem] text-text-secondary leading-relaxed italic pt-4 mb-4">
                                {t.testimonial}
                            </p>
                            <div className="text-[0.75rem] font-semibold text-text-primary">{t.name}</div>
                            <div className="text-[0.65rem] text-text-muted mb-3">{t.role}</div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <Rating value={t.rating} className="text-[0.65rem] text-primary" />
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
                        <div className="text-2xl font-bold text-primary">{metrics.topmate.rating}</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">&#9733; from {metrics.topmate.ratingCount} Topmate ratings</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{metrics.upwork.jobs}</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">Upwork Jobs Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{proof.jobSuccess}</div>
                        <div className="text-[0.65rem] text-text-muted mt-1">Upwork Job Success</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
