import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React/)
})

test('get started link', async ({ page }) => {
  await page.goto('/')

  // Click the get started link.
  await page.getByRole('button', { name: /count is/i }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('button', { name: /count is/i })).toBeVisible()
})
