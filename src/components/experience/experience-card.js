import Image from 'next/image';
import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import expImgBlack from '../../assets/svg/experience/expImgBlack.svg';
import expImgWhite from '../../assets/svg/experience/expImgWhite.svg';
import alxLogoBlack from '../../assets/svg/experience/alx-logo-black.svg';
import alxLogoWhite from '../../assets/svg/experience/alx-logo-white.svg';
import { ThemeContext } from '../../contexts/theme-context';
import styles from '../../styles/experience.module.css';


function ExperienceCard({ id, company, jobtitle, startYear, endYear, description, companyUrl, logo }) {

    const { theme } = useContext(ThemeContext);

    const CompanyComponent = companyUrl ? 'a' : 'h5';
    const companyProps = companyUrl ? { 
        href: companyUrl, 
        target: '_blank', 
        rel: 'noopener noreferrer',
        className: 'hover:underline cursor-pointer transition-colors'
    } : {};

    // Determine which icon to show
    const getIconSrc = () => {
        if (logo === 'alx-africa') {
            return theme.type === 'light' ? alxLogoBlack : alxLogoWhite;
        }
        return theme.type === 'light' ? expImgBlack : expImgWhite;
    };

    const getIconStyle = () => {
        if (logo === 'alx-africa') {
            return { 
                backgroundColor: 'transparent',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            };
        }
        return { backgroundColor: theme.primary };
    };

    return (
        <Fade bottom>
            <div key={id} className={`${styles.experienceCard} bg-[#1E2732]`}>
                <div className={styles.expcardImg} style={getIconStyle()}>
                    <Image src={getIconSrc()} alt={logo === 'alx-africa' ? 'ALX Africa' : ''} />
                </div>
                <div className={styles.experienceDetails}>
                    <h6 style={{ color: theme.primary }}>{startYear}-{endYear}</h6>
                    <CompanyComponent 
                        {...companyProps}
                        style={{ color: theme.tertiary, fontSize: '1.15rem', fontWeight: 600, margin: 0 }}
                    >
                        {company}
                    </CompanyComponent>
                    <h4 style={{ color: theme.tertiary }}>{jobtitle}</h4>
                    {description && (
                        <p 
                            className="mt-2 text-sm leading-relaxed opacity-90"
                            style={{ color: theme.tertiary }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </Fade>
    )
}

export default ExperienceCard
