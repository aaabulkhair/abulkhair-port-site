import React from 'react';
import {
  About, Blog, Contacts, Education,
  Experience, Landing, Navbar, Testimonials,
  WhatIDo, YouTubeFeed, TikTokFeed, StickyCTA
} from '../components';
import BackToTop from '../components/back-to-top/back-to-top';
import ChangeTheme from '../components/change-theme/change-theme';

function HomePage({ blogs }) {

  return (
    <>
      <BackToTop />
      <ChangeTheme />
      <StickyCTA />
      <Navbar />
      <Landing />
      <About />
      <WhatIDo />
      <Experience />
      <Education />
      <Testimonials />
      <YouTubeFeed maxVideos={3} />
      <TikTokFeed maxVideos={3} />
      <Blog blogs={blogs} />
      <Contacts />
    </>
  )
}

export async function getStaticProps() {
  try {
    // Try to fetch from Medium RSS first
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/medium-feed`);
    const data = await res.json();
    
    if (data.success && data.articles) {
      return {
        props: {
          blogs: data.articles
        },
      };
    } else {
      throw new Error('Medium RSS fetch failed');
    }
  } catch (error) {
    console.error('Failed to fetch Medium articles:', error);
    
    // Fallback to Dev.to if Medium RSS fails
    try {
      const username = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'said7388';
      const res = await fetch(`https://dev.to/api/articles?username=${username}`);
      const data = await res.json();
      const filteredBlogs = data.sort(() => Math.random() - 0.5);

      return {
        props: {
          blogs: filteredBlogs
        },
      };
    } catch (fallbackError) {
      console.error('Fallback to Dev.to also failed:', fallbackError);
      
      // Return empty blogs if everything fails
      return {
        props: {
          blogs: []
        },
      };
    }
  }
}

export default HomePage
