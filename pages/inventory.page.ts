import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async addProduct(name: string): Promise<void> {
    const card = this.page.locator('.inventory_item').filter({ hasText: name });
    await card.getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(String(count));
  }
}
