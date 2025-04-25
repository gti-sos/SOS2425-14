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
  const testLevel = 'Educación superior (SUP)';
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

  await page.locator('select[name="autonomous_community"]').click(); 
  await page.waitForTimeout(500); // Esperar a que se abra el dropdown
  await page.selectOption('select[name="autonomous_community"]', { label: testCommunity });

  await page.getByPlaceholder('Año').fill(testYear);

  await page.locator('select[name="education_level"]').click(); 
  await page.waitForTimeout(500);
  await page.selectOption('select[name="education_level"]', { label: testLevel });

  await page.getByPlaceholder('Tasa actividad').fill(testActivity);
  await page.getByPlaceholder('Tasa empleo').fill(testEmployment);
  await page.getByPlaceholder('Tasa paro').fill(testUnemployment);

  await page.getByRole('button', { name: 'Crear' }).click();

  const row = page.locator('tr').filter({
      has: page.locator('td').nth(0).filter({ hasText: testCommunity })
    }).filter({
      has: page.locator('td').nth(1).filter({ hasText: testYear })
    }).filter({
      has: page.locator('td').nth(2).filter({ hasText: 'SUP' })
    });  

  await expect(row).toContainText(testEmployment);

  // Eliminar el registro
  const deleteButton = row.locator('button[title="Eliminar Registro"]');
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
  
  // Verificar que la fila ha desaparecido
  await expect(row).toHaveCount(0, { timeout: 5000 });
});



