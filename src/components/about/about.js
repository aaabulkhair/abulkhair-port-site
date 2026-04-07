import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import { aboutData } from '../../data/about-data';

function About() {
    const { theme } = useContext(ThemeContext);

    return (
        <section
            className="border-b border-rule py-16"
            id="about"
            style={{ backgroundColor: theme.secondary }}
        >
            <div className="max-w-page mx-auto px-6 md:px-12">
                <p className="section-label">01 / About</p>
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12">
                    <div>
                        <p className="text-[0.95rem] text-text-secondary leading-[1.8]">
                            {aboutData.description1}
                        </p>
                        <br />
                        <p className="text-[0.95rem] text-text-secondary leading-[1.8]">
                            {aboutData.description2}
                        </p>
                    </div>
                    <div>{/* Breathing room */}</div>
                </div>
            </div>
        </section>
    );
}

export default About;
