import { Container } from '@mui/material';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import aiRobotBrain from '../../assets/lottie/ai-robot-brain.json';
import { ThemeContext } from '../../contexts/theme-context';
import { experienceData } from '../../data/experience-data';
import styles from '../../styles/experience.module.css';
import AnimationLottie from '../animation';
import ExperienceCard from './experience-card';

function Experience() {

    const { theme } = useContext(ThemeContext);
    const scrollerRef = useRef(null);
    const itemRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const sortedExperiences = useMemo(() => {
        return [...experienceData]
            .sort((a, b) => {
                const aTime = new Date(a.endYear === 'Present' ? Date.now() : `${a.endYear}`);
                const bTime = new Date(b.endYear === 'Present' ? Date.now() : `${b.endYear}`);
                if (bTime.getTime() === aTime.getTime()) {
                    return new Date(b.startYear).getTime() - new Date(a.startYear).getTime();
                }
                return bTime.getTime() - aTime.getTime();
            });
    }, []);

    useEffect(() => {
        if (!scrollerRef.current) return;
        const scroller = scrollerRef.current;

        // Debug logging
        console.log('Experience Scroller Debug:', {
            scrollWidth: scroller.scrollWidth,
            clientWidth: scroller.clientWidth,
            canScrollHorizontally: scroller.scrollWidth > scroller.clientWidth,
            itemCount: sortedExperiences.length,
            children: scroller.children.length
        });

        // Keep activeIndex in sync with manual scrolls
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const idx = itemRefs.current.findIndex((el) => el === entry.target);
                if (entry.isIntersecting && idx !== -1) {
                    setActiveIndex((prev) => (entry.intersectionRatio > 0.5 ? idx : prev));
                }
            });
        }, { root: scroller, threshold: [0.51, 0.75, 0.99] });

        itemRefs.current.forEach((el) => el && observer.observe(el));

        // Arrow key support and wheel horizontal normalization
        const onKey = (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollToIndex(Math.min(sortedExperiences.length - 1, activeIndex + 1));
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollToIndex(Math.max(0, activeIndex - 1));
            }
        };
        const onWheel = (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // pure horizontal okay
            // convert vertical wheel to horizontal scroll
            scroller.scrollBy({ left: e.deltaY, behavior: 'auto' });
            e.preventDefault();
        };
        scroller.addEventListener('wheel', onWheel, { passive: false });
        scroller.addEventListener('keydown', onKey);
        scroller.tabIndex = 0;
        return () => {
            observer.disconnect();
            scroller.removeEventListener('wheel', onWheel);
            scroller.removeEventListener('keydown', onKey);
        };
    }, [activeIndex, sortedExperiences.length]);

    const getPad = () => {
        if (!scrollerRef.current) return 24;
        const styles = getComputedStyle(scrollerRef.current);
        return parseInt(styles.getPropertyValue('--track-pad')) || 24;
    };

    const scrollByStep = (dir) => {
        if (!scrollerRef.current) return;
        const scroller = scrollerRef.current;
        const pad = getPad();
        const step = Math.max(200, scroller.clientWidth - pad * 2);
        
        // Debug info
        console.log('Scroll Debug:', {
            direction: dir,
            currentScrollLeft: scroller.scrollLeft,
            scrollWidth: scroller.scrollWidth,
            clientWidth: scroller.clientWidth,
            canScroll: scroller.scrollWidth > scroller.clientWidth,
            step: step
        });
        
        scroller.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    const scrollToIndex = (index) => {
        if (!scrollerRef.current || !itemRefs.current[index]) return;
        const pad = getPad();
        const left = itemRefs.current[index].offsetLeft - pad;
        scrollerRef.current.scrollTo({ left, behavior: 'smooth' });
        setActiveIndex(index);
    };
    return (
        <div style={{ backgroundColor: theme.secondary }}>
            <Container className={styles.experience} id="experience" disableGutters maxWidth={false}>
                <div className={styles.experienceBody} style={{ backgroundColor: theme.secondary }}>
                    <div className={styles.experienceImage} style={{ position: 'sticky', left: 0 }}>
                        <AnimationLottie animationPath={aiRobotBrain} />
                    </div>
                    <div className={styles.experienceDescription} style={{ backgroundColor: theme.secondary }}>
                        <h1 style={{ color: theme.primary }}>Experience</h1>
                        <div className="relative" style={{ backgroundColor: theme.secondary }}>
                            <button
                                className="flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2"
                                style={{ backgroundColor: theme.quaternary, color: theme.tertiary, boxShadow: '0 0 10px rgba(0,0,0,0.2)', borderColor: theme.tertiary }}
                                onClick={() => scrollByStep(-1)}
                                aria-label="Scroll left"
                            >
                                <HiOutlineChevronLeft size={20} />
                            </button>
                            <div
                                id="exp-scroll"
                                className={styles.horizontalScroller}
                                style={{ scrollBehavior: 'smooth', backgroundColor: theme.secondary, overflowY: 'hidden' }}
                                ref={scrollerRef}
                            >
                                <div className={styles.snapSpacer} aria-hidden="true" />
                                {sortedExperiences.map((exp, idx) => (
                                        <div key={exp.id} className={styles.snapItem} ref={el => itemRefs.current[idx] = el}>
                                            <ExperienceCard
                                                id={exp.id}
                                                jobtitle={exp.jobtitle}
                                                company={exp.company}
                                                startYear={exp.startYear}
                                                endYear={exp.endYear}
                                                description={exp.description}
                                                companyUrl={exp.companyUrl}
                                                logo={exp.logo}
                                                location={exp.location}
                                                employmentType={exp.employmentType}
                                                tech={exp.tech}
                                                achievements={exp.achievements}
                                                containerStyle={{ marginBottom: 0, width: '100%' }}
                                            />
                                        </div>
                                    ))}
                                <div className={styles.snapSpacer} aria-hidden="true" />
                            </div>
                            <button
                                className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-2"
                                style={{ backgroundColor: theme.quaternary, color: theme.tertiary, boxShadow: '0 0 10px rgba(0,0,0,0.2)', borderColor: theme.tertiary }}
                                onClick={() => scrollByStep(1)}
                                aria-label="Scroll right"
                            >
                                <HiOutlineChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Experience
