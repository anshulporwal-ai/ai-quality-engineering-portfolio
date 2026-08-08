import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

test.describe('Critical shopping journey', () => {
  test('authenticated user can add a product to the cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await test.step('Authenticate with public demo credentials', async () => {
      await login.open();
      await login.signIn('standard_user', 'secret_sauce');
      await inventory.expectLoaded();
    });

    await test.step('Add a product and validate cart state', async () => {
      await inventory.addProduct('Sauce Labs Backpack');
      await inventory.expectCartCount(1);
    });
  });
});
