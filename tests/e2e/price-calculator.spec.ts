import { expect, test, type Page } from "@playwright/test";

async function calculate(page: Page, price: string, taxRate?: string) {
  await page.goto("/");
  await page.getByLabel("税抜価格").fill(price);
  if (taxRate !== undefined) {
    await page.getByLabel("税率").fill(taxRate);
  }
  await page.getByRole("button", { name: "計算" }).click();
}

test.describe("税込価格計算", () => {
  test("税率10%で税込価格1100が表示される", async ({ page }) => {
    await calculate(page, "1000", "0.10");
    await expect(page.getByRole("status")).toHaveText("税込価格: 1100");
  });

  test("税率0%で税込価格1000が表示される", async ({ page }) => {
    await calculate(page, "1000", "0");
    await expect(page.getByRole("status")).toHaveText("税込価格: 1000");
  });

  test("端数は四捨五入される", async ({ page }) => {
    await calculate(page, "105", "0.10");
    await expect(page.getByRole("status")).toHaveText("税込価格: 116");
  });

  test("負数の税抜価格は入力エラーになる", async ({ page }) => {
    await calculate(page, "-100", "0.10");
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test("税抜価格が未入力の場合は入力エラーになる", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "計算" }).click();
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });
});
