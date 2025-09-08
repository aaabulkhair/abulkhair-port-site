import { Container } from '@mui/material';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import education from '../../assets/lottie/education.json';
import { ThemeContext } from '../../contexts/theme-context';
import { educationData } from '../../data/education-data';
import styles from '../../styles/education.module.css';
import AnimationLottie from '../animation';
import EducationCard from './education-card';

function Education() {

    const { theme } = useContext(ThemeContext);
    const scrollerRef = useRef(null);
    const itemRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const sortedEducation = useMemo(() => {
        return [...educationData]
            .sort((a, b) => {
                // Sort by start year descending (most recent first)
                return parseInt(b.startYear) - parseInt(a.startYear);
            });
    }, []);

    useEffect(() => {
        if (!scrollerRef.current) return;
        const scroller = scrollerRef.current;

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
                scrollToIndex(Math.min(sortedEducation.length - 1, activeIndex + 1));
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
    }, [activeIndex, sortedEducation.length]);

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
            <Container className={styles.education} id="education" disableGutters maxWidth={false}>
                <div className={styles.educationBody} style={{ backgroundColor: theme.secondary }}>
                    <div className={styles.educationImage} style={{ position: 'sticky', left: 0 }}>
                        <AnimationLottie animationPath={education} />
                    </div>
                    <div className={styles.educationDescription} style={{ backgroundColor: theme.secondary }}>
                        <h1 style={{ color: theme.primary }}>Education</h1>
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
                                id="edu-scroll"
                                className={styles.horizontalScroller}
                                style={{ scrollBehavior: 'smooth', backgroundColor: theme.secondary, overflowY: 'hidden' }}
                                ref={scrollerRef}
                            >
                                <div className={styles.snapSpacer} aria-hidden="true" />
                                {sortedEducation.map((edu, idx) => (
                                        <div key={edu.id} className={styles.snapItem} ref={el => itemRefs.current[idx] = el}>
                                            <EducationCard
                                                id={edu.id}
                                                institution={edu.institution}
                                                course={edu.course}
                                                startYear={edu.startYear}
                                                endYear={edu.endYear}
                                                location={edu.location}
                                                type={edu.type}
                                                grade={edu.grade}
                                                description={edu.description}
                                                subjects={edu.subjects}
                                                achievements={edu.achievements}
                                                logo={edu.logo}
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

export default Education
