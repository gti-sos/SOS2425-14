// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:16078/');

  await expect(page).toHaveTitle(/SOS2425-14/);
});

test('get cybercrime link', async ({ page }) => {
  await page.goto('http://localhost:16078');
  await page.waitForLoadState('domcontentloaded');

  const dashboardButton = page.locator('text=Dashboards');
  await expect(dashboardButton).toBeVisible();
  await dashboardButton.click();

  const cybercrimeLink = page.locator('#dash a:has-text("Crime")');
  await expect(cybercrimeLink).toBeVisible();
  await cybercrimeLink.click();

  await expect(page).toHaveTitle(/Datos de Ciberdelincuencia/);
});

test('create and delete cybercrime entry', async ({ page }) => {
  const testCommunity = 'Andalucía';
  const testYear = '2026';
  const testTotal = '9123';
  const testCyber = '2311';
  const testInvestigated = '572';

  await page.goto('http://localhost:16078');

  await page.waitForLoadState('domcontentloaded');

  const dashboardButton = page.locator('text=Dashboards');
  await expect(dashboardButton).toBeVisible();
  await dashboardButton.click();

  const cybercrimeLink = page.locator('#dash a:has-text("Crime")');
  await expect(cybercrimeLink).toBeVisible();
  await cybercrimeLink.click();

  // Crear nuevo registro
  await page.getByRole('button', { name: 'Nuevo registro' }).click();

  await page.getByPlaceholder('Comunidad Autónoma').fill(testCommunity);
  await page.getByPlaceholder('Año').fill(testYear);
  await page.getByPlaceholder('Delitos Informáticos').fill(testTotal);
  await page.getByPlaceholder('Delitos contra la Ciberseguridad').fill(testCyber);
  await page.getByPlaceholder('Detenidos / Investigados').fill(testInvestigated);

  await page.getByRole('button', { name: 'Crear' }).click();

  const row = page.locator('tr', {
    has: page.locator('td', { hasText: testCommunity })
  }).filter({
    has: page.locator('td', { hasText: testYear })
  });

  await expect(row).toContainText(testCyber);

  const deleteButton = row.locator('button[title="Eliminar Registro"]');
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  await expect(row).toHaveCount(0, { timeout: 5000 });
});
