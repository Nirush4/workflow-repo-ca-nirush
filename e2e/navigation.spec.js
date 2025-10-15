import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5500'

test('User can navigate to venue details from home page', async ({ page }) => {
  await page.goto(BASE_URL)

  // Wait for venue cards to load
  const venueCards = page.locator('#venue-container > *')
  await expect(venueCards.first()).toBeVisible({ timeout: 10000 })

  // Click first venue card and wait for URL change
  const firstVenue = venueCards.first()
  await Promise.all([
    page.waitForURL(/\/venue\/\?id=/, { timeout: 7000 }),
    firstVenue.click(),
  ])

  // Assert that the heading on the venue details page is visible and meaningful
  const heading = page.locator('h1')
  await expect(heading).toBeVisible({ timeout: 7000 })

  // Optional: more robust match if you know the expected heading structure
  await expect(heading).not.toHaveText('Welcome to this site')
})
