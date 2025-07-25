import Image from 'next/image';
import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import expImgBlack from '../../assets/svg/experience/expImgBlack.svg';
import expImgWhite from '../../assets/svg/experience/expImgWhite.svg';
import { ThemeContext } from '../../contexts/theme-context';
import styles from '../../styles/experience.module.css';


function ExperienceCard({ id, company, jobtitle, startYear, endYear, description, companyUrl }) {

    const { theme } = useContext(ThemeContext);

    const CompanyComponent = companyUrl ? 'a' : 'h5';
    const companyProps = companyUrl ? { 
        href: companyUrl, 
        target: '_blank', 
        rel: 'noopener noreferrer',
        className: 'hover:underline cursor-pointer transition-colors'
    } : {};

    return (
        <Fade bottom>
            <div key={id} className={`${styles.experienceCard} bg-[#1E2732]`}>
                <div className={styles.expcardImg} style={{ backgroundColor: theme.primary }}>
                    <Image src={theme.type === 'light' ? expImgBlack : expImgWhite} alt="" />
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
