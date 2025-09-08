import Image from 'next/image';
import React, { useContext, useState } from 'react';
import Fade from 'react-reveal/Fade';
import eduImgBlack from '../../assets/svg/education/eduImgBlack.svg';
import eduImgWhite from '../../assets/svg/education/eduImgWhite.svg';
import { ThemeContext } from '../../contexts/theme-context';
import styles from '../../styles/education.module.css';

function EducationCard({ id, institution, course, startYear, endYear, location, type, grade, description, subjects = [], achievements = [], logo, containerStyle }) {

    const { theme } = useContext(ThemeContext);
    const [showDetails, setShowDetails] = useState(false);

    // Determine which icon to show
    const getIconSrc = () => {
        if (logo && logo.startsWith('/images/')) {
            return logo;
        }
        return theme.type === 'light' ? eduImgBlack : eduImgWhite;
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
            <div key={id} className={styles.educationCard} style={{ backgroundColor: theme.quaternary, ...(containerStyle || {}) }}>
                <div className={styles.educardImg} style={getIconStyle()}>
                    <Image 
                        src={getIconSrc()} 
                        alt={institution || 'Institution'} 
                        width={logo && logo.startsWith('/images/') ? 80 : undefined}
                        height={logo && logo.startsWith('/images/') ? 80 : undefined}
                        style={logo && logo.startsWith('/images/') ? {objectFit: 'contain', width: '100%', height: 'auto'} : undefined}
                    />
                </div>
                <div className={styles.educationDetails} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h6 style={{ color: theme.primary }}>{startYear}-{endYear}</h6>
                    <h5 
                        style={{ color: theme.tertiary, fontSize: '1.15rem', fontWeight: 600, margin: 0 }}
                    >
                        {institution}
                    </h5>
                    <h4 style={{ color: theme.tertiary }}>{course}</h4>
                    {(location || type) && (
                        <p className="text-xs opacity-80" style={{ color: theme.tertiary }}>
                            {[type, location].filter(Boolean).join(' • ')}
                        </p>
                    )}
                    {grade && (
                        <p className="text-sm font-medium" style={{ color: theme.primary }}>
                            Grade: {grade}
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
                                {subjects.length > 0 && (
                                    <div>
                                        <h5 className="text-xs font-semibold mb-2 opacity-80" style={{ color: theme.primary }}>Key Subjects:</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {subjects.map((subject, i) => (
                                                <span key={i} className="px-2 py-1 text-xs rounded-full border" style={{ color: theme.tertiary, borderColor: theme.tertiary }}>
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {achievements.length > 0 && (
                                    <div>
                                        <h5 className="text-xs font-semibold mb-2 opacity-80" style={{ color: theme.primary }}>Achievements:</h5>
                                        <ul className="list-disc ml-5 space-y-1">
                                            {achievements.map((achievement, i) => (
                                                <li key={i} className="text-sm leading-relaxed" style={{ color: theme.tertiary }}>
                                                    {achievement}
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

export default EducationCard
