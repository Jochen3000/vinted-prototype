import { chromium } from "@playwright/test";
import path from "node:path";

const OUT = "/Users/jochenade/Code/vinted-prototype/scripts/reference";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  locale: "en-GB",
});
const page = await ctx.newPage();

async function dismiss() {
  for (const l of ["Accept all", "Accept"]) {
    const b = page.getByRole("button", { name: l });
    if (await b.count()) {
      await b.first().click().catch(() => {});
      break;
    }
  }
  await page.waitForTimeout(600);
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(400);
}

// Item sidebar zoom
await page.goto("https://www.vinted.co.uk/items/9031513232-nike-air-force-ones", {
  waitUntil: "domcontentloaded",
  timeout: 45000,
});
await page.waitForTimeout(2500);
await dismiss();
await page.waitForTimeout(1000);
// clip the right sidebar region
await page.screenshot({
  path: path.join(OUT, "item-sidebar.png"),
  clip: { x: 760, y: 120, width: 520, height: 700 },
});

// Catalogue grid cards
await page.goto("https://www.vinted.co.uk/catalog?search_text=nike", {
  waitUntil: "domcontentloaded",
  timeout: 45000,
});
await page.waitForTimeout(2500);
await dismiss();
await page.mouse.wheel(0, 900);
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(OUT, "catalogue-grid.png") });

await browser.close();
console.log("done");
