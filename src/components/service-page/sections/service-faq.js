import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

// Native <details>/<summary> — accessible and functional without JS.
function ServiceFaq({ faq, number }) {
    return (
        <section className="border-b border-rule py-16">
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">{number} / FAQ</p>
                <div className="max-w-2xl">
                    {faq.map((item) => (
                        <details key={item.question} className="group border-b border-rule py-5">
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm font-medium text-text-primary [&::-webkit-details-marker]:hidden">
                                {item.question}
                                <FiChevronDown size={14} aria-hidden="true" className="shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <p className="text-[0.8rem] text-text-secondary leading-relaxed mt-3 pr-8">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServiceFaq;
