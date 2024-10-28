// tests/scraper.test.ts

import { scrapeShopifyProduct } from '../src/scraper';

async function testScraper() {
  const url = 'https://growgrows.com/en-us/products/plentiful-planets-sleepsuit';
  const result = await scrapeShopifyProduct(url);
  console.log(JSON.stringify(result, null, 2));
}

testScraper();
