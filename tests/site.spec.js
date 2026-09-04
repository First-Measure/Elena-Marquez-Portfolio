import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { sitePages } from './helpers/site-pages.js';

const localOrigin = `http://127.0.0.1:${process.env.PORT || 4173}`;

const pages = await sitePages();

function monitorBrowserErrors(page) {
  const errors = [];
  page.on('pageerror', error => errors.push(`Page error: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`Console error: ${message.text()}`);
  });
  return errors;
}

for (const path of pages) {
  test(`${path} passes smoke, link, asset, accessibility, and responsive gates`, async ({ page, request }) => {
    const browserErrors = monitorBrowserErrors(page);
    const failedLocalResponses = [];

    page.on('response', response => {
      const url = new URL(response.url());
      if (url.origin === localOrigin && response.status() >= 400) {
        failedLocalResponses.push(`${response.status()} ${url.pathname}`);
      }
    });

    const response = await page.goto(path, { waitUntil: 'networkidle' });
    expect(response?.ok(), `${path} did not load successfully`).toBeTruthy();
    await expect(page.locator('main')).toBeVisible();

    const references = await page.locator('[href], [src]').evaluateAll(elements => elements.map(element => ({
      tag: element.tagName,
      optional: element.hasAttribute('data-validation-optional'),
      raw: element.getAttribute('href') || element.getAttribute('src'),
      resolved: element.href || element.src
    })));

    for (const reference of references) {
      if (!reference.raw || reference.optional || /^(mailto:|tel:|javascript:)/i.test(reference.raw)) continue;

      if (reference.raw.startsWith('#')) {
        expect(
          await page.locator(reference.raw).count(),
          `${path} links to missing fragment ${reference.raw}`
        ).toBeGreaterThan(0);
        continue;
      }

      const url = new URL(reference.resolved);
      if (url.origin !== localOrigin) continue;
      url.hash = '';
      const target = await request.get(url.href);
      expect(target.ok(), `${path} references missing local resource ${reference.raw}`).toBeTruthy();
    }

    const accessibility = await new AxeBuilder({ page }).analyze();
    const violationSummary = accessibility.violations.map(violation =>
      `${violation.id} (${violation.impact}): ${violation.nodes.map(node => node.target.join(' ')).join(', ')}`
    );
    expect(violationSummary, `Accessibility violations on ${path}`).toEqual([]);

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(overflow.scrollWidth, `${path} has horizontal document overflow`).toBeLessThanOrEqual(overflow.clientWidth + 1);
    expect(failedLocalResponses, `Failed local responses on ${path}`).toEqual([]);
    expect(browserErrors, `Browser errors on ${path}`).toEqual([]);
  });
}

test('desktop navigation reaches its sections by keyboard', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) <= 680, 'Desktop navigation contract');
  await page.goto('/');
  const nav = page.locator('#site-nav');
  await expect(nav).toBeVisible();
  await expect(page.getByRole('button', { name: /navigation menu/i })).toBeHidden();

  const workLink = nav.getByRole('link', { name: 'Selected Work' });
  await workLink.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#work')).toBeVisible();
});

test('mobile navigation supports focus, selection, outside click, and Escape', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) > 680, 'Mobile navigation contract');
  await page.goto('/');

  const toggle = page.locator('.menu-toggle');
  const nav = page.locator('#site-nav');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAccessibleName('Open navigation menu');
  await expect(nav).not.toHaveClass(/open/);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAccessibleName('Close navigation menu');
  await expect(nav).toHaveClass(/open/);
  await expect(nav.getByRole('link').first()).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();

  await toggle.click();
  const viewport = page.viewportSize();
  await page.mouse.click((viewport?.width || 430) - 10, (viewport?.height || 900) - 10);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');

  await toggle.click();
  await nav.getByRole('link', { name: 'Selected Work' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
