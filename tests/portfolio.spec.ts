import { test, expect } from '@playwright/test';

test.describe('JN Labs Portfolio - Core Verification', () => {
  test.beforeEach(async ({ page }) => {
    // We use domcontentloaded because Next.js dev server compilation blocks the 'load' event initially or takes 30s+
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Hide hydration warnings in console for clean test logs
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('Hydration')) {
        return;
      }
    });
  });

  test('Hero section renders correctly and profile picture placeholder exists', async ({ page }) => {
    // Check if the main heading exists
    const heading = page.locator('h1:has-text("ENGINEER")');
    await expect(heading).toBeVisible();

    // Verify the image placeholder exists in the hero component
    const profileImage = page.locator('img[alt="Jamal Nadeem"]');
    await expect(profileImage).toBeAttached();
  });

  test('Framer Motion intersection observers correctly hydrate on scroll', async ({ page }) => {
    // Scroll down to the About section
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    // Check the watermark text in the about terminal
    const aboutHeader = page.locator('h2:has-text("MINDSET")');
    await expect(aboutHeader).toBeVisible();

    // The animated paragraph should be visible after scroll
    const paragraph = page.locator('p:has-text("if a task can be predicted, it can be automated.")');
    await expect(paragraph).toHaveCSS('opacity', '1');
  });

  test('Dynamic System Status Footer eliminates FOUC and renders state', async ({ page }) => {
    // Scroll to the absolute bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Wait for the client-side setIntervals to boot (mimicking real-world latency)
    await page.waitForTimeout(2000);

    // Assert that the fallback text (--:--) has been dynamically replaced by the live clock logic
    const clockElement = page.locator('text=/SYNCED: \\d{2}:\\d{2} UTC/i');
    await expect(clockElement).toBeVisible();

    // Verify the CPU simulator is pushing a number (not placeholder)
    const cpuMetric = page.locator('text=/CPU:\\s\\d{1,3}%/i');
    await expect(cpuMetric).toBeVisible();
  });

  test('Contact form execution simulator (Network mock)', async ({ page }) => {
    // Scroll to contact form
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    // Route intercept explicitly to prevent actual Web3Forms spam during CI/CD tests
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully.' }),
      });
    });

    // Fill out the simulation data
    await page.fill('input[name="name"]', 'SQA Cybernetics Bot');
    await page.fill('input[name="email"]', 'bot@jnlabs.com');
    await page.fill('textarea[name="message"]', 'Verifying robust automation layer deployment.');

    // Click submit
    await page.click('button[type="submit"]');

    // Wait for the simulated success and ensure the overlay triggered
    const thankYouHeader = page.locator('h2:has-text("PAYLOAD_DELIVERED.")');
    await expect(thankYouHeader).toBeVisible();
  });

  test('Live GitHub Terminal fetches or mocks initial boot loop', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 3000));
    
    // Verify the bash header is present
    await expect(page.locator('text=LIVE_FEED // GITHUB.ACTIVITY')).toBeVisible();

    // Verify terminal pushes a line starting with '> '
    const terminalLine = page.locator('.text-glow-silver:has-text(">")').first();
    await expect(terminalLine).toBeVisible();
  });
});
