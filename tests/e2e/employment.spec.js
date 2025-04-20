// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:16078/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2425-14/);
});

test('get employment link', async ({ page }) => {
  await page.goto('http://localhost:16078');
  await page.waitForLoadState('domcontentloaded');

  const dashboardButton = page.locator('text=Dashboards');
  await expect(dashboardButton).toBeVisible();
  await dashboardButton.click();

  const employmentLink = page.locator('#dash a:has-text("Employment")');
  await expect(employmentLink).toBeVisible();
  await employmentLink.click();

  await expect(page).toHaveTitle(/Datos de Empleo/);
});

test('create and delete employment entry', async ({ page }) => {
  const testCommunity = 'Madrid';
  const testYear = '2025';
  const testLevel = 'SUP';
  const testActivity = '90.01';
  const testEmployment = '85.55';
  const testUnemployment = '4.46';

  await page.goto('http://localhost:16078');

  await page.waitForLoadState('domcontentloaded');

  const dashboardButton = page.locator('text=Dashboards');
  await expect(dashboardButton).toBeVisible();
  await dashboardButton.click();

  const employmentLink = page.locator('#dash a:has-text("Employment")');
  await expect(employmentLink).toBeVisible();
  await employmentLink.click();

  // Crear nuevo registro
  await page.getByRole('button', { name: 'Nuevo registro' }).click();

  await page.getByPlaceholder('Comunidad Autónoma').fill(testCommunity);
  await page.getByPlaceholder('Año').fill(testYear);
  await page.locator('select').click();
  await page.waitForTimeout(500); // Wait 500ms for dropdown to fully open
  await page.selectOption('select', { label: 'Educación superior (SUP)' });

  await page.getByPlaceholder('Tasa actividad').fill(testActivity);
  await page.getByPlaceholder('Tasa empleo').fill(testEmployment);
  await page.getByPlaceholder('Tasa paro').fill(testUnemployment);

  await page.getByRole('button', { name: 'Crear' }).click();

  const row = page.locator('tr', {
    has: page.locator('td', { hasText: testCommunity })
  }).filter({
    has: page.locator('td', { hasText: testYear })
  }).filter({
    has: page.locator('td', { hasText: testLevel })
  });
  
  await expect(row).toContainText(testEmployment);
  
  // Eliminar el registro
  const deleteButton = row.locator('button[title="Eliminar Registro"]');
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
  
  // Verificar que la fila ha desaparecido
  await expect(row).toHaveCount(0, { timeout: 5000 });
});



