import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5500'

test('User can navigate to venue details from home page', async ({ page }) => {
  await page.goto(BASE_URL)

  const venueCards = page.locator('#venue-container > *')
  await expect(venueCards.first()).toBeVisible({ timeout: 10000 })

  const firstVenue = venueCards.first()
  await Promise.all([
    firstVenue.click(),
    page.waitForNavigation({
      url: /\/venue\/\?id=/,
      waitUntil: 'load',
      timeout: 10000,
    }),
  ])

  const heading = page.locator('h1')
  await expect(heading).toBeVisible({ timeout: 7000 })

  await expect(heading).not.toHaveText('Welcome to this site')
})
