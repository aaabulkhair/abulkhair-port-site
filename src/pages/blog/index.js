import React from 'react';
import { jsonLd } from '../../utils/json-ld';
import Head from 'next/head';
import { Navbar, BackToTop, StickyCTA } from '../../components';
import Footer from '../../components/footer/footer';
import Link from '../../components/link';
import SEOHead from '../../components/seo/seo-head';
import Reveal from '../../components/ui/reveal';
import { contactsData } from '../../data/contacts-data';
import { getAllPosts } from '../../lib/posts';

const BASE_URL = 'https://abulkhair.ai';

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function BlogIndex({ posts }) {
    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Ahmed Abulkhair — Blog',
        url: `${BASE_URL}/blog`,
        description: 'Technical articles on data science, machine learning, LLMs, and AI.',
        author: { '@type': 'Person', name: 'Ahmed Abulkhair', url: BASE_URL },
        blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: `${BASE_URL}/blog/${post.slug}`,
            datePublished: post.date,
        })),
    };

    return (
        <div className="bg-bg min-h-screen">
            <SEOHead
                title="Blog — Data Science & AI Articles"
                description="Technical articles on data science, machine learning, LLMs, and AI by Ahmed Abulkhair."
                canonical={`${BASE_URL}/blog`}
            />
            <Head>
                <script
                    type="application/ld+json"
                    // Static site-owned content only.
                    dangerouslySetInnerHTML={{ __html: jsonLd(blogSchema) }}
                />
            </Head>

            <Navbar />
            <BackToTop />
            <StickyCTA />

            <main>
                <section className="border-b border-rule pt-32 pb-16">
                    <div className="max-w-page mx-auto px-6 md:px-12">
                        <Reveal>
                            <p className="section-label">Blog</p>
                            <h1 className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
                                Notes from <span className="font-serif italic text-primary">the field</span>
                            </h1>
                            <p className="text-base text-text-secondary leading-relaxed mt-6 max-w-xl">
                                Practical writing on machine learning, LLMs, and forecasting — from real projects, not theory.
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="border-b border-rule py-16">
                    <div className="max-w-page mx-auto px-6 md:px-12">
                        <div className="max-w-2xl">
                            {posts.map((post, i) => (
                                <Reveal key={post.slug} delay={i * 80}>
                                    <Link href={`/blog/${post.slug}`} className="group block py-8 border-b border-rule">
                                        <p className="text-[0.65rem] uppercase tracking-[2px] text-text-muted mb-2">
                                            {formatDate(post.date)} · {post.readingTime} min read
                                        </p>
                                        <h2 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-[0.85rem] text-text-secondary leading-relaxed mt-2">
                                            {post.description}
                                        </p>
                                        <span className="inline-block text-[0.75rem] text-primary border-b border-primary/20 pb-px group-hover:border-primary/50 transition-colors mt-4">
                                            Read article →
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>

                        <p className="text-[0.8rem] text-text-secondary mt-10">
                            Earlier articles live on{' '}
                            <a href={contactsData.medium} target="_blank" rel="noreferrer" className="text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors">
                                Medium
                            </a>
                            .
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export async function getStaticProps() {
    const posts = getAllPosts().map(({ content, ...meta }) => meta);
    return { props: { posts } };
}

export default BlogIndex;
