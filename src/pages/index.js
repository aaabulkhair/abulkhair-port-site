import React from 'react';
import {
  About, Blog, Contacts, Education,
  Experience, Landing, Navbar, Projects, Skills,
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
      <Skills />
      <Projects />
      <YouTubeFeed maxVideos={3} />
      <TikTokFeed maxVideos={3} />
      <Education />
      <Blog blogs={blogs} />
      <Contacts />
    </>
  )
}

export async function getStaticProps() {
  const username = process.env.NEXT_PUBLIC_DEVTO_USERNAME || 'said7388';
  const res = await fetch(`https://dev.to/api/articles?username=${username}`);
  const data = await res.json();
  const filteredBlogs = data.sort(() => Math.random() - 0.5);

  return {
    props: {
      blogs: filteredBlogs
    },
  };
}

export default HomePage
