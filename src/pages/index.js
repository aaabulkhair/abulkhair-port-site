import React from 'react';
import {
  About, Blog, Contacts, Education,
  Experience, Landing, Navbar, Testimonials,
  WhatIDo, YouTubeFeed, TikTokFeed, StickyCTA
} from '../components';
import BackToTop from '../components/back-to-top/back-to-top';
import SEOHead from '../components/seo/seo-head';
import StructuredData from '../components/seo/structured-data';
import Footer from '../components/footer/footer';

function HomePage({ blogs, videos }) {
  return (
    <>
      <SEOHead />
      <StructuredData pageType="website" />
      <BackToTop />
      <StickyCTA />
      <Navbar />
      <Landing />
      <About />
      <WhatIDo />
      <Experience />
      <Education />
      <Testimonials />
      <YouTubeFeed videos={videos} />
      <TikTokFeed />
      <Blog blogs={blogs} />
      <Contacts />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  // Native MDX posts come first; Medium articles fill the remaining slots.
  const { getAllPosts } = await import('../lib/posts');
  const { fetchMediumArticles, fetchYouTubeVideos } = await import('../lib/feeds');
  const nativePosts = getAllPosts().map((post) => ({
    id: `native-${post.slug}`,
    title: post.title,
    description: post.description,
    published_at: post.date,
    cover_image: post.coverImage,
    url: `/blog/${post.slug}`,
    internal: true,
  }));

  // Tolerate feed outages during `next build`; on ISR revalidation, throw so the
  // last good page keeps being served instead of one with empty feeds.
  const throwOnError = process.env.NEXT_PHASE !== 'phase-production-build';
  const [articles, videos] = await Promise.all([
    fetchMediumArticles({ throwOnError }),
    fetchYouTubeVideos(3, { throwOnError }),
  ]);

  return {
    props: {
      blogs: [...nativePosts, ...articles].slice(0, 6),
      videos,
    },
    // Re-fetch the Medium and YouTube feeds at most once an hour.
    revalidate: 3600,
  };
}

export default HomePage
