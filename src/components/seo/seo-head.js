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
        "أحمد أبو الخير - عالم بيانات كبير ومُعلم | استشارات علم البيانات والذكاء الاصطناعي" :
        "Ahmed Abulkhair - Senior Data Scientist & Educator | AI & Data Science Consulting";
    
    const defaultDescription = locale === 'ar' ? 
        "عالم بيانات كبير متخصص في نماذج اللغة الكبيرة وتحليل السلاسل الزمنية. أقدم استشارات علم البيانات والذكاء الاصطناعي، وخدمات التطوير المستقل، والمحتوى التعليمي باللغة العربية." :
        "Senior Data Scientist specializing in Large Language Models and Time-Series Forecasting. Offering Data Science consulting, AI solutions, freelance development, and Arabic educational content.";

    const pageTitle = title ? `${title} | Ahmed Abulkhair` : defaultTitle;
    const pageDescription = description || defaultDescription;
    const pageCanonical = canonical || baseUrl;
    const pageOgImage = ogImage || `${baseUrl}/images/og-image.jpg`;
    
    // Generate alternate language URLs
    const alternateUrl = locale === 'en' ? `${baseUrl}/ar` : baseUrl;
    
    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={locale === 'ar' ? 
                "أحمد أبو الخير, علم البيانات, ذكاء اصطناعي, نماذج اللغة, تحليل البيانات, استشارات, تعلم آلي, Ahmed Abulkhair" :
                "Ahmed Abulkhair, data science, artificial intelligence, machine learning, LLM, time-series, consulting, senior data scientist"} />
            <meta name="author" content="Ahmed Abulkhair" />
            <meta name="creator" content="Ahmed Abulkhair" />
            <meta name="publisher" content="Ahmed Abulkhair" />
            <meta name="subject" content="Ahmed Abulkhair - Senior Data Scientist & AI Educator" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
            
            {/* Canonical and Language */}
            <link rel="canonical" href={pageCanonical} />
            <link rel="alternate" hrefLang={locale === 'en' ? 'ar' : 'en'} href={alternateUrl} />
            <link rel="alternate" hrefLang="x-default" href={baseUrl} />
            <meta httpEquiv="content-language" content={locale} />
            
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
            <meta property="og:locale" content={locale === 'ar' ? 'ar_EG' : 'en_US'} />
            <meta property="og:locale:alternate" content={locale === 'ar' ? 'en_US' : 'ar_EG'} />
            
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
            <meta name="theme-color" content="#0066cc" />
            <meta name="msapplication-navbutton-color" content="#0066cc" />
            <meta name="apple-mobile-web-app-status-bar-style" content="#0066cc" />
            
            {/* Preconnect for Performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
    );
}

export default SEOHead;