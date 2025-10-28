import { test, expect } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

test.describe('Login functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login/')
  })

  test('User can successfully log in with valid credentials from environment variables', async ({
    page,
  }) => {
    // eslint-disable-next-line no-undef
    const email = process.env.TEST_EMAIL
    // eslint-disable-next-line no-undef
    const password = process.env.TEST_PASSWORD

    expect(email, 'Missing TEST_EMAIL env variable').toBeTruthy()
    expect(password, 'Missing TEST_PASSWORD env variable').toBeTruthy()

    await page.fill('input[type="email"], input[placeholder*="mail" i]', email)
    await page.fill(
      'input[type="password"], input[placeholder*="password" i]',
      password,
    )

    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/login') && resp.status() === 200,
      ),
      page.click('button:has-text("Login")'),
    ])

    const logoutLocator = page.locator(
      'button:has-text("Logout"), a:has-text("Logout")',
    )
    await expect(logoutLocator).toBeVisible({ timeout: 10000 })

    expect(page.url()).not.toContain('/login')
  })

  test('User sees an error message with invalid credentials', async ({ page }) => {
  await page.fill('input[type="email"], input[placeholder*="mail" i]', 'invalid@test.com')
  await page.fill('input[type="password"], input[placeholder*="password" i]', 'wrongpassword')

  await page.click('button:has-text("Login")')

  const errorLocator = page.locator('[role="alert"], .error-message, .notification-error')
  await expect(errorLocator).toBeVisible({ timeout: 10000 })

  const errorText = await errorLocator.textContent()
  expect(errorText?.trim()).toBeTruthy()

  expect(page.url()).toContain('/login')
})

})
