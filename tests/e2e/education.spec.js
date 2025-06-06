// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:16078/');

  await expect(page).toHaveTitle(/SOS2425-14/);
});

test('get education link', async ({ page }) => {
  await page.goto('http://localhost:16078');
  await page.waitForLoadState('domcontentloaded');

  const dashboardButton = page.locator('text=Dashboards');
  await expect(dashboardButton).toBeVisible();
  await dashboardButton.click();

  const educationLink = page.locator('#dash a:has-text("Education")');
  await expect(educationLink).toBeVisible();
  await educationLink.click();

  await expect(page).toHaveTitle(/Datos de Educación/);
});

test('create and delete education entry', async ({ page }) => {
  const testCommunity = 'Asturias';
  const testYear = '2026';
  const testBasic = '22.5';
  const testIntermediate = '31.0';
  const testHigher = '46.5';

  await page.goto('http://localhost:16078');

  await page.waitForLoadState('domcontentloaded');

  const dashboardButton = page.locator('text=Dashboards');
  await expect(dashboardButton).toBeVisible();
  await dashboardButton.click();

  const educationLink = page.locator('#dash a:has-text("Education")');
  await expect(educationLink).toBeVisible();
  await educationLink.click();

  // Crear nuevo registro
  await page.getByRole('button', { name: 'Crear' }).click();

  await page.locator('select[name="ccaa"]').click(); 
  await page.waitForTimeout(500); // Esperar a que se abra el dropdown
  await page.selectOption('select[name="ccaa"]', { label: testCommunity });

  await page.getByPlaceholder('Año').fill(testYear);

  await page.getByPlaceholder('Formación Profesional Básica').fill(testBasic);
  await page.getByPlaceholder('Grado Medio').fill(testIntermediate);
  await page.getByPlaceholder('Grado Superior').fill(testHigher);

  await page.getByRole('button', { name: 'Añadir' }).click();

  const row = page.locator('tr').filter({
    has: page.locator('td').nth(0).filter({ hasText: testCommunity })
  }).filter({
    has: page.locator('td').nth(1).filter({ hasText: testYear })
  });

  await expect(row).toContainText(testHigher);

  // Eliminar el registro
  const deleteButton = row.locator('button[title="Eliminar Registro"]');
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  await expect(row).toHaveCount(0, { timeout: 5000 });
});
