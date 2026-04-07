import React, { useContext, useMemo } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { educationData } from '../../data/education-data';

function Education() {
    const { theme } = useContext(ThemeContext);

    const sortedEducation = useMemo(() => {
        return [...educationData].sort((a, b) => parseInt(b.startYear) - parseInt(a.startYear));
    }, []);

    return (
        <section className="border-b border-rule py-16" id="education" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">04 / Education</p>

                <div className="flex flex-col">
                    {sortedEducation.map((edu) => (
                        <div key={edu.id} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8 py-5 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
                            <div className="text-[0.7rem] text-text-muted pt-0.5">
                                {edu.startYear} &ndash; {edu.endYear}
                            </div>
                            <div>
                                <div className="text-[0.85rem] font-semibold text-text-primary">
                                    {edu.url ? (
                                        <a href={edu.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{edu.institution}</a>
                                    ) : edu.institution}
                                </div>
                                <div className="text-[0.75rem] text-primary/70 mb-1">{edu.course}</div>
                                {(edu.location || edu.grade) && (
                                    <div className="text-[0.65rem] text-text-muted mb-2">
                                        {[edu.location, edu.grade].filter(Boolean).join(' \u2022 ')}
                                    </div>
                                )}
                                <p className="text-[0.75rem] text-text-secondary leading-relaxed">{edu.description}</p>

                                {edu.subjects?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {edu.subjects.map((s, i) => (
                                            <span key={i} className="text-[0.6rem] text-text-muted px-2 py-0.5 border border-rule rounded-sm">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {edu.achievements?.length > 0 && (
                                    <ul className="mt-3 space-y-1">
                                        {edu.achievements.map((a, i) => (
                                            <li key={i} className="text-[0.7rem] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-rule">
                                                {a}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;
