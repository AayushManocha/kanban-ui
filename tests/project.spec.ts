import { expect, test } from "@playwright/test";

test("user can view a single project", async ({ page }) => {
  // await fetch("http://localhost:3000/setup", { method: "POST" });

  await page.goto("http://localhost:5173/project/1");
  await expect(page.getByRole("heading", { name: "Project 1" })).toBeVisible();

  // await fetch("http://localhost:3000/teardown", { method: "POST" });
});

test("test project page displays columsn", async ({ page }) => {
  await page.goto("http://localhost:5173/project/1");
  await expect(page.getByRole("heading", { name: "Column 1" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Column 2" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Column 3" })).toBeVisible();
});

test("can view tasks", async ({ page }) => {
  await page.goto("http://localhost:5173/project/1");

  await page
    .locator("div")
    .filter({ hasText: /^Task 2$/ })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Task 3$/ })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Task C2$/ })
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Task C2$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Task C3$/ })
    .first()
    .click();
});

test("user can add new column to project", async ({ page }) => {
  await page.goto("http://localhost:5173/project/1");

  await page.getByRole("button", { name: "Add Column" }).click();
  await page.getByPlaceholder("Column Name").click();
  await page.getByPlaceholder("Column Name").fill("column 5");
  await page.getByRole("button", { name: "Add", exact: true }).click();

  await expect(page.getByRole("heading", { name: "column 5" })).toBeVisible();
});
