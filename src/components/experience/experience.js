import { Container } from '@mui/material';
import React, { useContext } from 'react';
import aiRobotBrain from '../../assets/lottie/ai-robot-brain.json';
import { ThemeContext } from '../../contexts/theme-context';
import { experienceData } from '../../data/experience-data';
import styles from '../../styles/experience.module.css';
import AnimationLottie from '../animation';
import ExperienceCard from './experience-card';

function Experience() {

    const { theme } = useContext(ThemeContext);
    return (
        <div style={{ backgroundColor: theme.secondary }}>
            <Container className={styles.experience} id="experience">
                <div className={styles.experienceBody}>
                    <div className={styles.experienceImage}>
                        <AnimationLottie animationPath={aiRobotBrain} />
                    </div>
                    <div className={styles.experienceDescription}>
                        <h1 style={{ color: theme.primary }}>Experience</h1>
                        {experienceData.map(exp => (
                            <ExperienceCard
                                key={exp.id}
                                id={exp.id}
                                jobtitle={exp.jobtitle}
                                company={exp.company}
                                startYear={exp.startYear}
                                endYear={exp.endYear}
                                description={exp.description}
                                companyUrl={exp.companyUrl} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Experience
