import Image from 'next/image';
import React, { useContext } from 'react';
import {
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaTwitter
} from 'react-icons/fa';
import Typed from 'react-typed';
import { ThemeContext } from '../../contexts/theme-context';
import { headerData } from '../../data/header-data';
import { socialsData } from '../../data/socials-data';
import Link from '../link';
import TrustBadges from '../trust-badges/trust-badges';
import { MonetizationLink } from '../analytics/enhanced-link-tracker';

function Landing() {
    const { drawerOpen } = useContext(ThemeContext);

    return (
        <div className="min-h-screen flex items-center justify-center bg-quaternary">
            <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">
                {/* Left Side (Socials) */}
                <div className="hidden md:flex flex-col items-center justify-center gap-6 p-8 bg-quaternary">
                    <div className="flex flex-col gap-5">
                        {socialsData.linkedIn && (
                            <a href={socialsData.linkedIn} target='_blank' rel='noreferrer'>
                                <FaLinkedin
                                    className="text-3xl text-primary hover:scale-110 transition-transform duration-300"
                                    aria-label='LinkedIn'
                                />
                            </a>
                        )}
                        {socialsData.github && (
                            <a href={socialsData.github} target='_blank' rel='noreferrer'>
                                <FaGithub
                                    className="text-3xl text-primary hover:scale-110 transition-transform duration-300"
                                    aria-label='GitHub'
                                />
                            </a>
                        )}
                        {socialsData.twitter && (
                            <a href={socialsData.twitter} target='_blank' rel='noreferrer'>
                                <FaTwitter
                                    className="text-3xl text-primary hover:scale-110 transition-transform duration-300"
                                    aria-label='Twitter'
                                />
                            </a>
                        )}
                        {socialsData.facebook && (
                            <a href={socialsData.facebook} target='_blank' rel='noreferrer'>
                                <FaFacebook
                                    className="text-3xl text-primary hover:scale-110 transition-transform duration-300"
                                    aria-label='facebook'
                                />
                            </a>
                        )}
                    </div>
                </div>

                {/* Center Image */}
                <div className={`relative w-[350px] h-[350px] rounded-full border-[3px] border-primary overflow-hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-0' : 'opacity-100'}`}>
                    <Image
                        src={headerData.image}
                        alt={headerData.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                    />
                </div>

                {/* Right Side (Content) */}
                <div className="flex-1 flex flex-col justify-center p-8 bg-secondary h-full text-tertiary">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-bold mb-4">{headerData.name}</h1>
                        <div className="text-xl font-medium text-primary mb-6 h-8">
                            <Typed
                                strings={[
                                    'Data Scientist',
                                    'Machine Learning Engineer',
                                    'Data Science Mentor']}
                                typeSpeed={40}
                                backSpeed={50}
                                loop
                            />
                        </div>
                        <p className="text-lg leading-relaxed mb-8 opacity-90">{headerData.description}</p>

                        {/* Trust Badges */}
                        <div className="mb-8">
                            <TrustBadges badges={headerData.trustBadges} />
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {/* Primary CTA - Book Consultation */}
                            {headerData.ctaPrimary && (
                                <MonetizationLink
                                    href={headerData.ctaPrimary.url}
                                    platform="topmate"
                                    position="hero_primary"
                                    value={35}
                                >
                                    <button
                                        className="w-[280px] bg-primary text-quaternary rounded-full 
                                        text-base font-medium h-12 border-[3px] border-primary 
                                        transition-all duration-300 hover:bg-button-color hover:border-button-color hover:text-quaternary
                                        flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        {headerData.ctaPrimary.text}
                                    </button>
                                </MonetizationLink>
                            )}

                            {/* Secondary CTA - Hire on Upwork */}
                            {headerData.ctaSecondary && (
                                <MonetizationLink
                                    href={headerData.ctaSecondary.url}
                                    platform="upwork"
                                    position="hero_secondary"
                                    value={35}
                                >
                                    <button
                                        className="w-[280px] text-primary bg-transparent rounded-full 
                                        text-base font-medium h-12 border-[3px] border-primary 
                                        transition-all duration-300 hover:bg-button-color hover:border-button-color hover:text-quaternary
                                        flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        {headerData.ctaSecondary.text}
                                    </button>
                                </MonetizationLink>
                            )}

                            {/* Fallback resume download if needed */}
                            {headerData.resumePdf && (
                                <a
                                    href={headerData.resumePdf}
                                    download='resume'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <button
                                        className="w-36 text-quaternary-light rounded-full text-sm
                                        font-medium h-10 border-[2px] border-quaternary-light 
                                        transition-all duration-300 hover:bg-quaternary-light hover:text-quaternary"
                                    >
                                        Download CV
                                    </button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Landing;
