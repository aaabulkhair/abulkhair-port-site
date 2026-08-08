import Head from 'next/head';
import { headerData } from '../../data/header-data';

function SEOHead({ 
    title,
    description, 
    canonical,
    locale = 'en',
    ogImage,
    ogType = 'website',
    articleData,
    noIndex = false 
}) {
    const baseUrl = 'https://abulkhair.ai';
    const defaultTitle = locale === 'ar' ?
        "أحمد أبو الخير - عالم بيانات كبير وخبير LLM | استشارات الذكاء الاصطناعي مصر" :
        "Ahmed Abulkhair - AI Scientist & LLM Expert Egypt | AI Consultant";
    
    const defaultDescription = locale === 'ar' ?
        "خبير علم البيانات والذكاء الاصطناعي في مصر. متخصص في LLM وأنظمة RAG والعوامل الذكية. استشارات باللغة العربية والإنجليزية. 100+ مشروع ناجح." :
        "AI Scientist with 7+ years of production ML. LLM fine-tuning & evaluation — tuned Arabic models rank top-5 on OALL & Arabic HELM. Arabic & English consulting: RAG systems, AI agents, time-series forecasting.";

    const pageTitle = title ? `${title} | Ahmed Abulkhair` : defaultTitle;
    const pageDescription = description || defaultDescription;
    const pageCanonical = canonical || baseUrl;
    const pageOgImage = ogImage
        ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`)
        : `${baseUrl}/images/og-image.png`;
    
    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="author" content="Ahmed Abulkhair" />
            <meta name="creator" content="Ahmed Abulkhair" />
            <meta name="publisher" content="Ahmed Abulkhair" />
            <meta name="subject" content="Ahmed Abulkhair - AI Scientist @ Incept Labs" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

            {/* Canonical */}
            <link rel="canonical" href={pageCanonical} />
            <meta httpEquiv="content-language" content="en" />
            
            {/* Robots */}
            {noIndex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            )}
            
            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:url" content={pageCanonical} />
            <meta property="og:image" content={pageOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={pageTitle} />
            <meta property="og:site_name" content="Ahmed Abulkhair" />
            <meta property="og:locale" content="en_US" />
            
            {/* Article specific OG tags */}
            {articleData && (
                <>
                    <meta property="article:author" content="Ahmed Abulkhair" />
                    <meta property="article:published_time" content={articleData.publishedTime} />
                    {articleData.modifiedTime && (
                        <meta property="article:modified_time" content={articleData.modifiedTime} />
                    )}
                    {articleData.tags && articleData.tags.map(tag => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </>
            )}
            
            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={pageOgImage} />
            <meta name="twitter:image:alt" content={pageTitle} />
            <meta name="twitter:site" content="@aaabulkhair" />
            <meta name="twitter:creator" content="@aaabulkhair" />
            
            {/* Additional Meta Tags */}
            <meta name="theme-color" content="#0a0a0a" />

            {/* Feeds */}
            <link rel="alternate" type="application/rss+xml" title="Ahmed Abulkhair — Blog" href="/rss.xml" />

            {/* Preconnect for Performance */}
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://img.youtube.com" />
            <link rel="preconnect" href="https://i.ibb.co" />
            
            {/* DNS Prefetch for External Resources */}
            <link rel="dns-prefetch" href="//topmate.io" />
            <link rel="dns-prefetch" href="//upwork.com" />
            <link rel="dns-prefetch" href="//medium.com" />
            <link rel="dns-prefetch" href="//youtube.com" />
            <link rel="dns-prefetch" href="//tiktok.com" />
            
            {/* Favicons */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon512.png" />
            <link rel="manifest" href="/manifest.json" />
        </Head>
    );
}

export default SEOHead;