import React, { useContext, useMemo, useState } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { experienceData } from '../../data/experience-data';

function Experience() {
    const { theme } = useContext(ThemeContext);
    const [showAll, setShowAll] = useState(false);

    const sortedExperiences = useMemo(() => {
        return [...experienceData]
            .sort((a, b) => {
                if (a.company === 'Incept Labs') return -1;
                if (b.company === 'Incept Labs') return 1;
                if (a.company === 'ALX Africa') return -1;
                if (b.company === 'ALX Africa') return 1;
                const aTime = new Date(a.endYear === 'Present' ? Date.now() : a.endYear);
                const bTime = new Date(b.endYear === 'Present' ? Date.now() : b.endYear);
                if (bTime.getTime() === aTime.getTime()) {
                    return new Date(b.startYear).getTime() - new Date(a.startYear).getTime();
                }
                return bTime.getTime() - aTime.getTime();
            });
    }, []);

    const visibleCount = showAll ? sortedExperiences.length : 4;
    const visible = sortedExperiences.slice(0, visibleCount);
    const remaining = sortedExperiences.length - visibleCount;

    return (
        <section className="border-b border-rule py-16" id="experience" style={{ backgroundColor: theme.secondary }}>
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">03 / Experience</p>

                <div className="flex flex-col">
                    {visible.map((exp) => (
                        <ExperienceItem key={exp.id} exp={exp} theme={theme} />
                    ))}
                </div>

                {remaining > 0 && !showAll && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="mt-4 text-[0.7rem] text-text-muted hover:text-primary transition-colors"
                    >
                        + {remaining} more positions &rarr;
                    </button>
                )}
                {showAll && sortedExperiences.length > 4 && (
                    <button
                        onClick={() => setShowAll(false)}
                        className="mt-4 text-[0.7rem] text-text-muted hover:text-primary transition-colors"
                    >
                        Show less
                    </button>
                )}
            </div>
        </section>
    );
}

function ExperienceItem({ exp, theme }) {
    const [expanded, setExpanded] = useState(false);

    const CompanyTag = exp.companyUrl ? 'a' : 'span';
    const companyProps = exp.companyUrl
        ? { href: exp.companyUrl, target: '_blank', rel: 'noopener noreferrer', className: 'hover:underline' }
        : {};

    return (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8 py-5 border-b border-[rgba(255,255,255,0.03)] last:border-b-0">
            <div className="text-[0.7rem] text-text-muted pt-0.5">
                {exp.startYear} &ndash; {exp.endYear}
            </div>
            <div>
                <div className="text-[0.85rem] font-semibold text-text-primary">
                    <CompanyTag {...companyProps}>{exp.company}</CompanyTag>
                </div>
                <div className="text-[0.75rem] text-primary/70 mb-1">{exp.jobtitle}</div>
                {(exp.location || exp.employmentType) && (
                    <div className="text-[0.65rem] text-text-muted mb-2">
                        {[exp.location, exp.employmentType].filter(Boolean).join(' \u2022 ')}
                    </div>
                )}
                <p className="text-[0.75rem] text-text-secondary leading-relaxed">
                    {exp.description}
                </p>

                {expanded && (
                    <>
                        {exp.achievements?.length > 0 && (
                            <ul className="mt-3 space-y-1">
                                {exp.achievements.map((a, i) => (
                                    <li key={i} className="text-[0.7rem] text-text-secondary pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-rule">
                                        {a}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

                {exp.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.tech.map((t, i) => (
                            <span key={i} className="text-[0.6rem] text-text-muted px-2 py-0.5 border border-rule rounded-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {exp.achievements?.length > 0 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 text-[0.65rem] text-text-muted hover:text-primary transition-colors"
                    >
                        {expanded ? 'Show less' : 'Show details \u2192'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Experience;
