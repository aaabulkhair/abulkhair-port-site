import Image from 'next/image';
import React, { useContext, useState } from 'react';
import Fade from 'react-reveal/Fade';
import expImgBlack from '../../assets/svg/experience/expImgBlack.svg';
import expImgWhite from '../../assets/svg/experience/expImgWhite.svg';
import { ThemeContext } from '../../contexts/theme-context';
import styles from '../../styles/experience.module.css';


function ExperienceCard({ id, company, jobtitle, startYear, endYear, description, companyUrl, logo, location, employmentType, tech = [], achievements = [], containerStyle }) {

    const { theme } = useContext(ThemeContext);
    const [showDetails, setShowDetails] = useState(false);

    const CompanyComponent = companyUrl ? 'a' : 'h5';
    const companyProps = companyUrl ? { 
        href: companyUrl, 
        target: '_blank', 
        rel: 'noopener noreferrer',
        className: 'hover:underline cursor-pointer transition-colors'
    } : {};

    // Determine which icon to show
    const getIconSrc = () => {
        if (logo && logo.startsWith('/images/')) {
            return logo;
        }
        return theme.type === 'light' ? expImgBlack : expImgWhite;
    };

    const getIconStyle = () => {
        if (logo && logo.startsWith('/images/')) {
            return { 
                backgroundColor: 'white',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
            };
        }
        return { backgroundColor: theme.primary };
    };

    return (
        <Fade bottom>
            <div key={id} className={styles.experienceCard} style={{ backgroundColor: theme.quaternary, ...(containerStyle || {}) }}>
                <div className={styles.expcardImg} style={getIconStyle()}>
                    <Image 
                        src={getIconSrc()} 
                        alt={company || 'Company'} 
                        width={logo && logo.startsWith('/images/') ? 80 : undefined}
                        height={logo && logo.startsWith('/images/') ? 80 : undefined}
                        style={logo && logo.startsWith('/images/') ? {objectFit: 'contain', width: '100%', height: 'auto'} : undefined}
                    />
                </div>
                <div className={styles.experienceDetails} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h6 style={{ color: theme.primary }}>{startYear}-{endYear}</h6>
                    <CompanyComponent 
                        {...companyProps}
                        style={{ color: theme.tertiary, fontSize: '1.15rem', fontWeight: 600, margin: 0 }}
                    >
                        {company}
                    </CompanyComponent>
                    <h4 style={{ color: theme.tertiary }}>{jobtitle}</h4>
                    {(location || employmentType) && (
                        <p className="text-xs opacity-80" style={{ color: theme.tertiary }}>
                            {[location, employmentType].filter(Boolean).join(' • ')}
                        </p>
                    )}
                    
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        {description && (
                            <p 
                                className="mt-2 text-sm leading-relaxed opacity-90"
                                style={{ color: theme.tertiary }}
                            >
                                {showDetails ? description : `${description.length > 80 ? description.substring(0, 80) + '...' : description}`}
                            </p>
                        )}
                        
                        {showDetails && (
                            <div className="mt-3 space-y-3">
                                {tech.length > 0 && (
                                    <div>
                                        <h5 className="text-xs font-semibold mb-2 opacity-80" style={{ color: theme.primary }}>Technologies:</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {tech.map((t, i) => (
                                                <span key={i} className="px-2 py-1 text-xs rounded-full border" style={{ color: theme.tertiary, borderColor: theme.tertiary }}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {achievements.length > 0 && (
                                    <div>
                                        <h5 className="text-xs font-semibold mb-2 opacity-80" style={{ color: theme.primary }}>Key Achievements:</h5>
                                        <ul className="list-disc ml-5 space-y-1">
                                            {achievements.map((a, i) => (
                                                <li key={i} className="text-sm leading-relaxed" style={{ color: theme.tertiary }}>
                                                    {a}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="mt-3 text-xs font-medium hover:underline transition-all self-start"
                        style={{ color: theme.primary }}
                    >
                        {showDetails ? '← Show Less' : 'Show More Details →'}
                    </button>
                </div>
            </div>
        </Fade>
    )
}

export default ExperienceCard
