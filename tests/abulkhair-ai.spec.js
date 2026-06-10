import { test, expect } from '@playwright/test';

const indexablePages = [
  '/',
  '/services',
  '/services/llm-consulting-egypt',
  '/services/ai-agents-development',
  '/services/machine-learning-development',
  '/services/time-series-forecasting',
  '/blog',
  '/blog/choosing-time-series-forecasting-models',
];

test.describe('abulkhair.ai — pages & SEO', () => {
  for (const path of indexablePages) {
    test(`${path} renders with valid SEO meta`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      const title = await page.title();
      expect(title).toMatch(/Ahmed Abulkhair/i);

      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc.length).toBeGreaterThan(50);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toMatch(/^https:\/\/abulkhair\.ai/);

      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
    });

    test(`${path} has valid JSON-LD structured data`, async ({ page }) => {
      await page.goto(path);
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      expect(jsonLdScripts.length).toBeGreaterThan(0);

      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const parsed = JSON.parse(content);
        expect(parsed['@context']).toBe('https://schema.org');
        expect(parsed['@type']).toBeTruthy();
      }
    });
  }

  test('404 page is on-brand and offers navigation', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/not found/i);
    await expect(page.getByRole('link', { name: /back home/i })).toBeVisible();
  });
});

test.describe('abulkhair.ai — homepage functionality', () => {
  test('hero CTAs and trust metadata are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a').filter({ hasText: /Book Consultation/i }).first()).toBeVisible();
    await expect(page.locator('a').filter({ hasText: /Hire on Upwork/i }).first()).toBeVisible();
    await expect(page.getByText(/Topmate 4\.9/).first()).toBeVisible();
  });

  test('monetization links carry UTM parameters', async ({ page }) => {
    await page.goto('/');
    const externalLinks = await page.locator('a[href^="http"]').all();
    let monetizationCount = 0;

    for (const link of externalLinks) {
      const href = await link.getAttribute('href');
      if (href && /(topmate|upwork)/i.test(href)) {
        monetizationCount++;
        expect(href, `missing UTM on ${href}`).toMatch(/utm_/);
      }
    }
    expect(monetizationCount).toBeGreaterThan(0);
  });

  test('service pages are internally linked from homepage and footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="/services"]').first()).toBeVisible();
    await expect(page.locator('a[href="/services/llm-consulting-egypt"]').first()).toBeAttached();
    await expect(page.locator('a[href="/services/ai-agents-development"]').first()).toBeAttached();
    await expect(page.locator('a[href="/blog"]').first()).toBeAttached();
  });

  test('contact form renders fields and validates empty submit', async ({ page }) => {
    await page.goto('/#contacts');
    await expect(page.locator('input[name="user_name"]')).toBeVisible();
    await expect(page.locator('input[name="user_email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
  });

  test('mobile nav drawer opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /open menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
    await expect(page.locator('#mobile-nav').getByRole('link', { name: 'Services' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
  });

  test('no horizontal scroll at mobile width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('basic accessibility smoke', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav').first()).toBeVisible();

    const images = await page.locator('img').all();
    for (const img of images.slice(0, 5)) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });
});
