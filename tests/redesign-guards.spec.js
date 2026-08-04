import { test, expect } from '@playwright/test';

// Guards for the elevated-editorial redesign: the regressions we fixed must
// never come back. Run against the dev server (playwright.config webServer).

const pages = ['/', '/blog', '/services'];

test.describe('redesign guards', () => {
  for (const path of pages) {
    test(`${path} loads with zero console and page errors`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
      });

      await page.goto(path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // React hydration mismatches (#418/#425) must stay gone.
      const hydration = errors.filter((e) => /#418|#425|Hydration/i.test(e));
      expect(hydration, `hydration errors on ${path}`).toEqual([]);
      expect(errors, `console/page errors on ${path}`).toEqual([]);
    });
  }

  test('window is the scroll container (scroll model regression guard)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.scrollTo(0, 1500));
    const scrollY = await page.evaluate(() => window.scrollY);
    // If body becomes the scroller again, window.scrollY stays 0.
    expect(scrollY).toBeGreaterThan(1000);
  });

  test('navbar gains backdrop after scrolling', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(400);
    const navClass = await page.locator('nav').first().getAttribute('class');
    expect(navClass).toContain('backdrop-blur');
  });

  test('hero shows CV credential strip', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Top-5 on OALL & Arabic HELM').first()).toBeVisible();
    await expect(page.getByText('Kaggle Expert').first()).toBeVisible();
    await expect(page.getByText('Upwork Top-Rated').first()).toBeVisible();
  });

  test('experience dates match CV', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const experience = page.locator('#experience');
    await expect(experience.getByText('Nov 2025 – Present')).toBeVisible();
    await expect(experience.getByText('Mar 2023 – Jul 2025')).toBeVisible();
  });

  test('no third-party embed iframes (tiktok embed removed)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const tiktokFrame = page.locator('iframe[src*="tiktok"]');
    await expect(tiktokFrame).toHaveCount(0);
  });
});
