// src/scraper.ts

import axios from 'axios';
import cheerio from 'cheerio';
import { Font, ButtonStyle, ScrapeResult } from './types';

export async function scrapeShopifyProduct(url: string): Promise<ScrapeResult | null> {
  try {
    // Fetch HTML from the URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract font styles (dummy data as placeholder)
    const fonts: Font[] = [{
      family: 'Helvetica',
      variants: '400',
      letterSpacing: '0.01em',
      fontWeight: '400',
      url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
    }];

    // Extract button styles using the provided selector
    const buttonElement = $('form[action*="/cart/add"] button');
    const primaryButton: ButtonStyle = {
      fontFamily: buttonElement.css('font-family') || 'default',
      fontSize: buttonElement.css('font-size') || 'default',
      lineHeight: buttonElement.css('line-height') || 'default',
      letterSpacing: buttonElement.css('letter-spacing') || 'default',
      textTransform: buttonElement.css('text-transform') || 'none',
      textDecoration: buttonElement.css('text-decoration') || 'none',
      textAlign: buttonElement.css('text-align') || 'left',
      color: buttonElement.css('color') || '#000',
      backgroundColor: buttonElement.css('background-color') || '#fff',
      borderColor: buttonElement.css('border-color') || '#000',
      borderWidth: buttonElement.css('border-width') || '1px',
      borderRadius: buttonElement.css('border-radius') || '4px',
    };

    return { fonts, primaryButton };
  } catch (error) {
    console.error('Error scraping Shopify product:', error);
    return null;
  }
}
