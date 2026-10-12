import fs from 'fs';
import os from 'os';
import path from 'path';
import { test, expect } from '@playwright/test';
import { pickMediumCover, fetchYouTubeVideos, fetchMediumArticles } from '../src/lib/feeds';
import { getPublishedSlugs } from '../src/lib/posts';
import { metrics, pricing } from '../src/data/metrics';

// Node-level checks for logic the page tests can't reach (feeds, drafts).

test.describe('feeds', () => {
  test('Medium cover skips the medium.com stat pixel and non-CDN hosts', () => {
    const pixel = '<img src="https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss" width="1" height="1">';
    const cover = '<img alt="" src="https://cdn-images-1.medium.com/max/1024/abc.png">';
    expect(pickMediumCover(pixel)).toBe('/images/medium-logo.webp');
    expect(pickMediumCover(`${pixel}${cover}`)).toBe('https://cdn-images-1.medium.com/max/1024/abc.png');
    expect(pickMediumCover(`${cover}${pixel}`)).toBe('https://cdn-images-1.medium.com/max/1024/abc.png');
    expect(pickMediumCover('<img src="https://evil.example/x.png">')).toBe('/images/medium-logo.webp');
  });

  test('feed fetchers return [] at build time but throw during ISR revalidation', async () => {
    const realFetch = global.fetch;
    global.fetch = async () => { throw new Error('network down'); };
    try {
      expect(await fetchYouTubeVideos(3)).toEqual([]);
      expect(await fetchMediumArticles()).toEqual([]);
      await expect(fetchYouTubeVideos(3, { throwOnError: true })).rejects.toThrow('network down');
      await expect(fetchMediumArticles({ throwOnError: true })).rejects.toThrow('network down');
    } finally {
      global.fetch = realFetch;
    }
  });
});

test.describe('posts', () => {
  test('drafts are never published, and a draft with a bad date does not break the build', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'posts-'));
    fs.writeFileSync(path.join(dir, 'live.mdx'), '---\ntitle: Live\ndate: "2026-01-01"\n---\nhi\n');
    fs.writeFileSync(path.join(dir, 'secret.mdx'), '---\ntitle: Secret\ndraft: true\ndate: TBD\n---\nhi\n');
    process.env.POSTS_DIR = dir;
    try {
      expect(getPublishedSlugs()).toEqual(['live']);
    } finally {
      delete process.env.POSTS_DIR;
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

test.describe('metrics are the only source of numbers', () => {
  test('JSON-LD prices come from metrics.js', async ({ page }) => {
    await page.goto('/');
    const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((b) => JSON.parse(b));
    const service = blocks.find((b) => b['@type'] === 'ProfessionalService');
    expect(service.priceRange).toBe(`$${pricing.consult.min}-$${pricing.development.max}`);
    const [consult, dev] = service.offers;
    expect(consult.price).toBe(String(pricing.consult.min));
    expect(dev.priceSpecification.minPrice).toBe(String(pricing.development.min));
    expect(dev.priceSpecification.maxPrice).toBe(String(pricing.development.max));
  });

  test('no unsourced audience or session counts in copy', async ({ page }) => {
    await page.goto('/');
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/2,300\+/);
    expect(text).not.toMatch(new RegExp(`${metrics.topmate.bookings} Topmate sessions`));
  });

  test('contact honeypot uses a name browsers will not autofill', async ({ page }) => {
    await page.goto('/');
    const hp = page.locator('form input[tabindex="-1"]');
    const name = await hp.getAttribute('name');
    expect(['website', 'url', 'name', 'email', 'phone', 'company']).not.toContain(name);
    expect(await page.locator(`label[for="${await hp.getAttribute('id')}"]`).innerText()).not.toMatch(/website|url/i);
  });
});
