import express, { Application, Request, Response } from 'express';
import { scrapeShopifyProduct } from './scraper';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Separate async route handler function
const scrapeHandler = async (req: Request, res: Response): Promise<void> => {
  const url = req.query.url as string;

  if (!url) {
    res.status(400).json({ error: 'URL is required' });
    return;
  }

  const urlPattern = /^(https?:\/\/)?(www\.)?shopify\.\S+$/;
  if (!urlPattern.test(url)) {
    res.status(400).json({ error: 'Invalid URL format or domain' });
    return;
  }

  try {
    const result = await scrapeShopifyProduct(url);
    if (result) {
      res.json(result);
    } else {
      res.status(500).json({ error: 'Failed to scrape the page' });
    }
  } catch (error) {
    console.error(`Error scraping URL: ${url}`, error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

// Attach route handler to the /scrape endpoint
app.get('/scrape', scrapeHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
