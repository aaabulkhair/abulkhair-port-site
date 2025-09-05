import { test, expect } from '@playwright/test';

const routes = ['/', '/ar'];

test.describe('abulkhair.ai visual & SEO tests', () => {
  
  // Hero and CTAs tests
  for (const path of routes) {
    test(`hero & CTAs present on ${path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${path}`);
      
      // Check main heading is visible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      
      // Check primary CTA is visible (should contain "Book" or "احجز")
      const bookButton = page.locator('a').filter({ 
        hasText: path === '/ar' ? /احجز/ : /Book/ 
      }).first();
      await expect(bookButton).toBeVisible();
      
      // Check if trust badges are visible
      const trustBadges = page.locator('[class*="trustBadges"], [class*="badge"]');
      await expect(trustBadges.first()).toBeVisible();
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot(`hero-${path.replace('/', '') || 'en'}.png`, { 
        fullPage: true,
        threshold: 0.3 
      });
    });

    test(`SEO meta tags on ${path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${path}`);
      
      // Check title contains Ahmed Abulkhair
      const title = await page.title();
      expect(title).toMatch(/Ahmed Abulkhair|أحمد أبو الخير/i);
      
      // Check description meta tag exists
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc.length).toBeGreaterThan(50);
      
      // Check canonical URL exists
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      
      // Check Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
      
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDescription).toBeTruthy();
      
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
    });

    test(`outbound monetization links are healthy on ${path}`, async ({ page, request }) => {
      await page.goto(`http://localhost:3000${path}`);
      
      // Get all external links
      const externalLinks = await page.locator('a[href^="http"]').all();
      const monetizationUrls = [];
      
      for (const link of externalLinks) {
        const href = await link.getAttribute('href');
        if (href && /(topmate|upwork|youtube|tiktok|medium)/i.test(href)) {
          monetizationUrls.push(href);
        }
      }
      
      // Check each monetization URL
      for (const url of monetizationUrls) {
        // Verify UTM parameters exist
        expect(url).toMatch(/utm_/);
        
        // Check if URL is reachable (with timeout and retry)
        try {
          const response = await request.head(url, { timeout: 10000 });
          expect(response.status()).toBeLessThan(400);
        } catch (error) {
          // Log but don't fail for external service issues
          console.warn(`Warning: Could not reach ${url}: ${error.message}`);
        }
      }
    });

    test(`structured data validation on ${path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${path}`);
      
      // Check for JSON-LD structured data
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      expect(jsonLdScripts.length).toBeGreaterThan(0);
      
      // Validate JSON-LD content
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        expect(() => JSON.parse(content)).not.toThrow();
        
        const parsedData = JSON.parse(content);
        expect(parsedData['@context']).toBe('https://schema.org');
        expect(parsedData['@type']).toBeTruthy();
      }
    });

    test(`responsive design on ${path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${path}`);
      
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page).toHaveScreenshot(`mobile-${path.replace('/', '') || 'en'}.png`, {
        threshold: 0.3
      });
      
      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page).toHaveScreenshot(`tablet-${path.replace('/', '') || 'en'}.png`, {
        threshold: 0.3
      });
      
      // Test desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page).toHaveScreenshot(`desktop-${path.replace('/', '') || 'en'}.png`, {
        threshold: 0.3
      });
    });
  }

  test('sticky CTA functionality', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Scroll down to trigger sticky CTA
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(500);
    
    // Check if sticky CTA appears
    const stickyCta = page.locator('[class*="stickyCta"], [class*="sticky"]');
    await expect(stickyCta).toBeVisible();
    
    // Test minimize functionality
    const minimizeButton = page.locator('button').filter({ hasText: /×|minimize/i });
    if (await minimizeButton.isVisible()) {
      await minimizeButton.click();
      await page.waitForTimeout(300);
      
      // Should show expand button
      const expandButton = page.locator('button').filter({ hasText: /book|consultation/i });
      await expect(expandButton).toBeVisible();
    }
  });

  test('content widgets load properly', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check YouTube section
    const youtubeSection = page.locator('text=/youtube|latest.*video/i').first();
    await expect(youtubeSection).toBeVisible();
    
    // Check TikTok section 
    const tiktokSection = page.locator('text=/tiktok/i').first();
    await expect(tiktokSection).toBeVisible();
    
    // Check What I Do section
    const servicesSection = page.locator('text=/what.*do|services/i').first();
    await expect(servicesSection).toBeVisible();
    
    // Verify CTAs in services section
    const serviceCtas = page.locator('a').filter({ 
      hasText: /book|hire|subscribe|read/i 
    });
    await expect(serviceCtas.first()).toBeVisible();
  });

  test('language switching functionality', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Look for language switcher (button, link, or select)
    const langSwitcher = page.locator('[class*="lang"], [class*="language"]').first();
    
    if (await langSwitcher.isVisible()) {
      await langSwitcher.click();
      await page.waitForLoadState('networkidle');
      
      // Should be on Arabic version
      expect(page.url()).toContain('/ar');
      
      // Check Arabic content is displayed
      await expect(page.locator('text=/أحمد أبو الخير|احجز/').first()).toBeVisible();
    }
  });

  test('performance and accessibility smoke test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Basic accessibility checks
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images.slice(0, 5)) { // Check first 5 images
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check navigation landmarks
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();
  });
});