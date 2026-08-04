import React from 'react';
import { Navbar } from '../components';
import Footer from '../components/footer/footer';
import Link from '../components/link';
import SEOHead from '../components/seo/seo-head';
import { contactsData } from '../data/contacts-data';

function NotFound() {
    return (
        <div className="bg-bg min-h-screen flex flex-col">
            <SEOHead title="Page Not Found" noIndex />
            <Navbar />

            <main className="flex-1 flex items-center">
                <div className="max-w-page mx-auto px-6 md:px-12 py-32 w-full">
                    <p className="text-8xl md:text-9xl font-light text-primary/20 font-serif italic leading-none" aria-hidden="true">
                        404
                    </p>
                    <h1 className="text-3xl md:text-5xl font-light tracking-tight mt-6">
                        Page <span className="font-serif italic text-primary">not found</span>
                    </h1>
                    <p className="text-base text-text-secondary leading-relaxed mt-4 max-w-md">
                        The page you&apos;re looking for doesn&apos;t exist or has moved. Here are some useful places instead:
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-7 py-3 bg-primary text-bg rounded font-semibold text-sm hover:opacity-90 transition-opacity"
                        >
                            Back home
                        </Link>
                        <a
                            href={contactsData.monetizationLinks.primary.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-7 py-3 border border-primary/30 text-primary rounded text-sm hover:border-primary/60 transition-colors"
                        >
                            Book a consultation
                        </a>
                    </div>
                    <div className="flex gap-6 mt-8 text-[0.8rem]">
                        <Link href="/services" className="text-text-secondary hover:text-primary transition-colors">Services</Link>
                        <Link href="/blog" className="text-text-secondary hover:text-primary transition-colors">Blog</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default NotFound;
