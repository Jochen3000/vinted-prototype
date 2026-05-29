// Drive the prototype with Playwright: walk the full flow, screenshot each
// page, and surface any console/page errors.
import { chromium } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

const BASE = "http://127.0.0.1:5173";
const OUT = "/Users/jochenade/Code/vinted-prototype/scripts/verify";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

const shot = (name) =>
  page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });

// 1. Catalogue
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await shot("1-catalogue");
console.log("catalogue title:", await page.title());

// search
await page.fill('input[placeholder="Search for items"]', "nike");
await page.keyboard.press("Enter");
await page.waitForTimeout(600);
await shot("2-catalogue-search");

// 2. Item detail — click the first card
await page.goto(BASE + "/items/9031513232", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await shot("3-item-detail");
const itemH1 = await page.locator("h1").first().textContent();
console.log("item h1:", itemH1);

// 3. Checkout via Buy now
await page.getByRole("button", { name: "Buy now" }).click();
await page.waitForTimeout(600);
await shot("4-checkout");
console.log("checkout url:", page.url());

// 4. Order via Pay
await page.getByRole("button", { name: /^Pay / }).click();
await page.waitForTimeout(600);
await shot("5-order");
console.log("order url:", page.url());
const orderH1 = await page.locator("h1").first().textContent();
console.log("order h1:", orderH1);

await browser.close();

if (errors.length) {
  console.log("\n=== ERRORS ===");
  errors.forEach((e) => console.log(e));
  process.exit(1);
} else {
  console.log("\nNo console/page errors. Screenshots ->", OUT);
}
