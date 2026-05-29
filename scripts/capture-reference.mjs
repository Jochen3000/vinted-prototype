// Capture reference screenshots + DOM notes from live Vinted pages.
// Usage: node scripts/capture-reference.mjs
// Output goes to scripts/reference/ (gitignored).
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "scripts", "reference");
fs.mkdirSync(OUT, { recursive: true });

const targets = [
  { name: "catalogue", url: "https://www.vinted.co.uk/catalog?search_text=nike" },
  { name: "home", url: "https://www.vinted.co.uk/" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  locale: "en-GB",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
});
const page = await ctx.newPage();

async function dismissConsent() {
  // 1. Cookie / privacy banner
  for (const label of ["Accept all", "Accept", "I agree", "Got it"]) {
    const btn = page.getByRole("button", { name: label });
    if (await btn.count()) {
      await btn
        .first()
        .click()
        .catch(() => {});
      await page.waitForTimeout(800);
      break;
    }
  }
  const ot = page.locator("#onetrust-accept-btn-handler");
  if (await ot.count()) await ot.click().catch(() => {});
  await page.waitForTimeout(500);

  // 2. "Where do you live?" country modal — close via the X / dialog close
  for (const close of [
    page.getByRole("dialog").getByRole("button").first(),
    page.locator('[data-testid*="close"]'),
    page.locator('button[aria-label*="lose"]'),
  ]) {
    if (await close.count()) {
      await close
        .first()
        .click()
        .catch(() => {});
      await page.waitForTimeout(800);
      break;
    }
  }
  // Fallback: press Escape
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(500);
}

const notes = {};

for (const t of targets) {
  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);
    await dismissConsent();
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(OUT, `${t.name}.png`),
      fullPage: false,
    });
    await page.screenshot({
      path: path.join(OUT, `${t.name}-full.png`),
      fullPage: true,
    });

    // Grab the first item card link from catalogue to visit a real item page.
    if (t.name === "catalogue") {
      const href = await page
        .locator('a[href*="/items/"]')
        .first()
        .getAttribute("href")
        .catch(() => null);
      if (href) {
        const itemUrl = href.startsWith("http")
          ? href
          : "https://www.vinted.co.uk" + href;
        await page.goto(itemUrl, {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        await page.waitForTimeout(2500);
        await dismissConsent();
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: path.join(OUT, "item.png"),
          fullPage: false,
        });
        await page.screenshot({
          path: path.join(OUT, "item-full.png"),
          fullPage: true,
        });
        notes.itemUrl = itemUrl;
        notes.itemTitle = await page.title();
      }
    }

    notes[t.name] = {
      title: await page.title(),
      url: page.url(),
    };
    console.log(`captured ${t.name}`);
  } catch (e) {
    console.log(`FAILED ${t.name}: ${e.message}`);
    notes[t.name] = { error: e.message };
  }
}

fs.writeFileSync(path.join(OUT, "notes.json"), JSON.stringify(notes, null, 2));
await browser.close();
console.log("done ->", OUT);
