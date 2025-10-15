/* eslint-disable no-undef */
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
    const email = process.env.TEST_EMAIL
    const password = process.env.TEST_PASSWORD

    expect(email, 'Missing TEST_EMAIL env variable').toBeTruthy()
    expect(password, 'Missing TEST_PASSWORD env variable').toBeTruthy()

    await page.fill('input[type="email"], input[placeholder*="mail" i]', email)
    await page.fill(
      'input[type="password"], input[placeholder*="password" i]',
      password,
    )

    await page.click('button:has-text("Login")')

    await page.waitForURL((url) => !url.pathname.startsWith('/login'), {
      timeout: 10000,
    })

    const logoutLocator = page.locator('button:has-text("Logout")')
    await expect(logoutLocator).toBeVisible({ timeout: 10000 })

    expect(page.url()).not.toContain('/login')
  })

  test('User sees an error message with invalid credentials', async ({
    page,
  }) => {
    await page.fill(
      'input[type="email"], input[placeholder*="mail" i]',
      'invalid@test.com',
    )
    await page.fill(
      'input[type="password"], input[placeholder*="password" i]',
      'wrongpassword',
    )
    await page.click('button:has-text("Login")')

    await page.waitForTimeout(2000)

    expect(page.url()).toContain('/login')

    const pageContent = await page.textContent('body')

    const hasErrorIndicator =
      pageContent?.includes('Invalid') ||
      pageContent?.includes('incorrect') ||
      pageContent?.includes('failed') ||
      pageContent?.includes('error')

    expect(hasErrorIndicator).toBeTruthy()
  })
})
