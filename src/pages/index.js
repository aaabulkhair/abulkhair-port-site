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

function HomePage({ blogs }) {
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
      <YouTubeFeed maxVideos={3} />
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
  const nativePosts = getAllPosts().map((post) => ({
    id: `native-${post.slug}`,
    title: post.title,
    description: post.description,
    published_at: post.date,
    cover_image: post.coverImage,
    url: `/blog/${post.slug}`,
    internal: true,
  }));

  try {
    // Try to fetch directly from Medium RSS (better for static generation)
    const mediumUsername = 'aaabulkhair';
    const rssUrl = `https://medium.com/@${mediumUsername}/feed`;
    
    const { parseStringPromise } = await import('xml2js');
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS reader)',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlData = await response.text();
    const result = await parseStringPromise(xmlData);
    
    if (!result.rss || !result.rss.channel || !result.rss.channel[0].item) {
      throw new Error('Invalid RSS structure');
    }
    
    // Transform RSS items to match the expected blog format
    const articles = result.rss.channel[0].item.map((item, index) => {
      // Extract image from content or use a default Medium image
      let coverImage = '/images/medium-logo.webp'; // Default fallback
      
      // Try to extract image from content
      if (item['content:encoded'] && item['content:encoded'][0]) {
        const imgMatch = item['content:encoded'][0].match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          coverImage = imgMatch[1];
        }
      }
      
      // Clean up description by removing HTML tags
      let description = '';
      if (item.description && item.description[0]) {
        description = item.description[0]
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .substring(0, 150) + '...'; // Truncate to 150 chars
      }
      
      return {
        id: `medium-${index + 1}`,
        title: item.title ? item.title[0] : 'Untitled',
        description: description,
        published_at: item.pubDate ? item.pubDate[0] : null,
        cover_image: coverImage,
        url: item.link ? item.link[0] : '#',
        internal: false,
      };
    });

    return {
      props: {
        blogs: [...nativePosts, ...articles].slice(0, 6),
      },
    };

  } catch (error) {
    console.error('Failed to fetch Medium articles:', error);
    return {
      props: {
        blogs: nativePosts,
      },
    };
  }
}

export default HomePage
