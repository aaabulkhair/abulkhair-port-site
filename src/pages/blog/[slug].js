import React from 'react';
import Head from 'next/head';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { Navbar, BackToTop, StickyCTA } from '../../components';
import Footer from '../../components/footer/footer';
import Link from '../../components/link';
import SEOHead from '../../components/seo/seo-head';
import { getAllPosts, getPostBySlug, getPostSlugs } from '../../lib/posts';

const BASE_URL = 'https://abulkhair.ai';

// Editorial MDX styling — matches the homepage type scale.
const mdxComponents = {
    h2: (props) => <h2 className="text-2xl font-light tracking-tight text-text-primary mt-12 mb-4" {...props} />,
    h3: (props) => <h3 className="text-lg font-semibold text-text-primary mt-8 mb-3" {...props} />,
    p: (props) => <p className="text-[0.95rem] text-text-secondary leading-[1.8] mb-5" {...props} />,
    ul: (props) => <ul className="space-y-2 mb-5 pl-1" {...props} />,
    ol: (props) => <ol className="space-y-2 mb-5 pl-5 list-decimal text-[0.95rem] text-text-secondary leading-[1.8] marker:text-primary/60" {...props} />,
    li: (props) => (
        <li
            className="text-[0.95rem] text-text-secondary leading-[1.8] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[13px] before:w-1 before:h-1 before:rounded-full before:bg-primary/40 [ol_&]:pl-0 [ol_&]:before:hidden"
            {...props}
        />
    ),
    a: (props) => <a className="text-primary border-b border-primary/20 pb-px hover:border-primary/50 transition-colors" {...props} />,
    strong: (props) => <strong className="font-semibold text-text-primary" {...props} />,
    em: (props) => <em className="font-serif italic" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 border-primary/40 pl-5 my-6 font-serif italic text-text-secondary" {...props} />,
    hr: (props) => <hr className="border-rule my-10" {...props} />,
    code: (props) => <code className="text-[0.85em] text-primary bg-bg-surface border border-rule rounded-sm px-1.5 py-0.5" {...props} />,
    pre: (props) => <pre className="bg-bg-surface border border-rule rounded p-4 overflow-x-auto text-[0.8rem] leading-relaxed mb-5 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-text-secondary" {...props} />,
};

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function BlogPost({ post, mdxSource, prev, next }) {
    const canonical = `${BASE_URL}/blog/${post.slug}`;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        url: canonical,
        inLanguage: 'en',
        keywords: post.tags.join(', '),
        author: { '@type': 'Person', name: 'Ahmed Abulkhair', url: BASE_URL },
        publisher: { '@type': 'Person', name: 'Ahmed Abulkhair', url: BASE_URL },
        mainEntityOfPage: canonical,
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
        ],
    };

    return (
        <div className="bg-bg min-h-screen">
            <SEOHead
                title={post.title}
                description={post.description}
                canonical={canonical}
                ogType="article"
                ogImage={post.coverImage || undefined}
                articleData={{
                    publishedTime: post.date,
                    modifiedTime: post.updated || post.date,
                    tags: post.tags,
                }}
            />
            <Head>
                {[articleSchema, breadcrumbSchema].map((schema, i) => (
                    <script
                        key={i}
                        type="application/ld+json"
                        // Static site-owned content only.
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
                ))}
            </Head>

            <Navbar />
            <BackToTop />
            <StickyCTA />

            <main className="pt-32 pb-16">
                <article className="max-w-2xl mx-auto px-6 md:px-0">
                    <header className="mb-10">
                        <p className="section-label">
                            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                            {' '}/ {formatDate(post.date)}
                        </p>
                        <h1 className="text-3xl md:text-5xl font-light leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 mt-5 text-[0.7rem] text-text-muted">
                            <span>{post.readingTime} min read</span>
                            {post.tags.map((tag) => (
                                <span key={tag} className="border border-rule px-2 py-0.5 rounded-sm">{tag}</span>
                            ))}
                        </div>
                    </header>

                    <MDXRemote {...mdxSource} components={mdxComponents} />

                    <nav className="grid grid-cols-2 gap-4 mt-14 pt-8 border-t border-rule" aria-label="More posts">
                        <div>
                            {prev && (
                                <Link href={`/blog/${prev.slug}`} className="group block">
                                    <span className="text-[0.6rem] uppercase tracking-[2px] text-text-muted">← Previous</span>
                                    <span className="block text-[0.8rem] text-text-secondary group-hover:text-primary transition-colors mt-1">{prev.title}</span>
                                </Link>
                            )}
                        </div>
                        <div className="text-right">
                            {next && (
                                <Link href={`/blog/${next.slug}`} className="group block">
                                    <span className="text-[0.6rem] uppercase tracking-[2px] text-text-muted">Next →</span>
                                    <span className="block text-[0.8rem] text-text-secondary group-hover:text-primary transition-colors mt-1">{next.title}</span>
                                </Link>
                            )}
                        </div>
                    </nav>
                </article>
            </main>

            <Footer />
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: getPostSlugs().map((slug) => ({ params: { slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug);
    const mdxSource = await serialize(post.content);
    const all = getAllPosts();
    const index = all.findIndex((p) => p.slug === params.slug);

    const pick = (p) => (p ? { slug: p.slug, title: p.title } : null);
    const { content, ...meta } = post;

    return {
        props: {
            post: meta,
            mdxSource,
            prev: pick(all[index + 1]),
            next: pick(all[index - 1]),
        },
    };
}

export default BlogPost;
