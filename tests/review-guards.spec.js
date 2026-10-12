import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { test, expect } from '@playwright/test';

// Guards for the 2026-10 full review: SEO honesty, crawlability, draft
// leakage, and UTM attribution must not regress.

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const posts = fs.readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => ({ slug: f.replace(/\.mdx$/, ''), draft: Boolean(matter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8')).data.draft) }));

const ctaPages = [
  '/',
  '/services',
  '/services/llm-consulting-egypt',
  '/services/ai-agents-development',
  '/services/machine-learning-development',
  '/services/time-series-forecasting',
  '/blog',
];

test.describe('review guards', () => {
  test('robots.txt lets crawlers fetch /_next/ assets and JSON', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text();
    expect(body).not.toMatch(/^Disallow:\s*\/_next/m);
    expect(body).not.toMatch(/^Disallow:.*\.json/m);
    expect(body).toMatch(/^Sitemap: https:\/\/abulkhair\.ai\/sitemap\.xml/m);
  });

  test('sitemap lists every published post and no drafts', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap-0.xml')).text();
    for (const post of posts) {
      const loc = `https://abulkhair.ai/blog/${post.slug}</loc>`;
      if (post.draft) expect(sitemap, `draft ${post.slug} leaked`).not.toContain(loc);
      else expect(sitemap, `published ${post.slug} missing`).toContain(loc);
    }
  });

  test('draft posts have no public page', async ({ request }) => {
    for (const post of posts.filter((p) => p.draft)) {
      expect((await request.get(`/blog/${post.slug}`)).status()).toBe(404);
    }
  });

  for (const pagePath of ctaPages) {
    test(`${pagePath}: every UTM link has exactly one utm_campaign`, async ({ page }) => {
      await page.goto(pagePath);
      const hrefs = await page.locator('a[href*="utm_"]').evaluateAll((els) => els.map((a) => a.href));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        const url = new URL(href);
        expect(url.searchParams.getAll('utm_campaign'), href).toHaveLength(1);
        expect(url.searchParams.getAll('utm_source'), href).toEqual(['abulkhair.ai']);
        expect(href.split('?').length, `double "?" in ${href}`).toBe(2);
      }
    });
  }

  test('JSON-LD makes no unverifiable claims', async ({ page }) => {
    await page.goto('/');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const all = blocks.join('\n');
    expect(all).not.toMatch(/aggregateRating/);
    expect(all).not.toMatch(/"Dr\.? /);
    expect(all).not.toMatch(/Top Rated Plus/);
    // sameAs must point at clean profile URLs.
    for (const block of blocks) {
      const sameAs = JSON.parse(block).sameAs || [];
      for (const url of [].concat(sameAs)) expect(url, url).not.toContain('utm_');
    }
  });

  test('visible copy makes no unverifiable claims', async ({ page }) => {
    for (const pagePath of ctaPages) {
      await page.goto(pagePath);
      const text = await page.locator('body').innerText();
      expect(text, pagePath).not.toMatch(/100\+ (projects|clients|consultations|hours|successful)/i);
      expect(text, pagePath).not.toMatch(/Top 1%/);
      expect(text, pagePath).not.toMatch(/Egypt['’]s leading/i);
    }
  });

  test('contact form fields are labelled', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('Name', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Email', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Message', { exact: true })).toBeVisible();
  });
});
