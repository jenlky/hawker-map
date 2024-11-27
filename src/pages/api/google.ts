import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'
import * as cheerio from 'cheerio';
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query, method } = req;
  switch (method) {
    case "GET":
        // Fetch results for page 1 and page 2
        const page1Results = await scrapeGoogle(req.query.query, 0);  // Page 1 (start = 0)
        const page2Results = await scrapeGoogle(req.query.query, 10); // Page 2 (start = 10)

        // Combine results from both pages
        const combinedResults = [...page1Results, ...page2Results];

        console.log(combinedResults);
        return res.status(200).json(combinedResults);
  }
}

async function scrapeGoogle(query: any, start = 0) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&start=${start}`;
  const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
  
  try {
      const googleResults = await fetch(url, {
          headers: {
              "User-Agent": ua,
          },
      })
          .then(res => res.text())
          .then(html => {
              const $ = cheerio.load(html);
              const searchResults = [...$(".LC20lb")].map((e: any) => {
                  return {
                      title: $(e).text().trim(),
                      link: e.parentNode.attribs.href,
                  }
              });
              return searchResults
          });
      console.log('googleResults', googleResults)

      const filtered = googleResults.filter(result => result.link.includes('sethlui') || result.link.includes('eatbook'))
      console.log('filtered', filtered);

      const results = await Promise.all(filtered.map(async result => {
          if (result.link.includes('sethlui')) {
              return await scrapeSethLuiPuppeteer(result.link)
          } else if (result.link.includes('eatbook')) {
              return await scrapeEatbook(result.link)
          }
          return
      }))
      console.log('results', results);
      return results
    } catch (error: any) {
        console.log(error)
        console.error(`Error fetching Google search results: ${error.message}`);
        return [];
    }
}

async function scrapeSethLui(url: string) {
  const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

  try {
    // Fetch the HTML of the webpage
    const { data: html } = await axios.get(url, {
        headers: {
            "User-Agent": ua,
        },
    });
      console.log('html', html)

      // Load the HTML into Cheerio
      const $ = cheerio.load(html);
      console.log('$', $)

      // Array to store the recommendations
      const recommendations: any = [];

      // Extract the date
      const date = $('time.entry-date').attr('datetime');
      recommendations.push({ date, website: "Seth Lui" });

      // Extract each recommendation
      $('h2').each((i: any, element: any) => {
          const header = $(element).text().trim();
          let text = '';
          let image: any = '';

          // Get the text of the paragraphs following the header
          let sibling = $(element).next();
          while (sibling.length && sibling.prop('tagName') !== 'H2') {
              if (sibling.prop('tagName') === 'P') {
                  text += sibling.text().trim() + '\n';
              }
              if (sibling.prop('tagName') === 'FIGURE') {
                  const img = sibling.find('img');
                  if (img.length) {
                  image = img.attr('src');
                  }
              }
              sibling = sibling.next();
          }

          recommendations.push({ header, text: text.trim(), image });
      });

      return recommendations;
  } catch (error: any) {
    console.log('error', error)
      console.error(`Error fetching the webpage: ${error.message}`);
      return [];
  }
}

async function scrapeSethLuiPuppeteer(url: string) {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
  
    try {
        const browser = await puppeteer.launch({
            executablePath: '${pwd}/.puppeteer-cache/chrome', // Path to Chrome
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for Netlify
        });
        const page = await browser.newPage();
    
        await page.setUserAgent(ua);
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
    
        const content = await page.content();
        const $ = cheerio.load(content);
    
        const recommendations = [];
        const date = $('time.entry-date').attr('datetime');
        recommendations.push({ date, website: 'Seth Lui' });
    
        $('h2').each((i, element) => {
            const header = $(element).text().trim();
            let text = '';
            let image: string | undefined = '';
    
            let sibling = $(element).next();
            while (sibling.length && sibling.prop('tagName') !== 'H2') {
                if (sibling.prop('tagName') === 'P') {
                    text += sibling.text().trim() + '\n';
                }
                if (sibling.prop('tagName') === 'FIGURE') {
                    const img = sibling.find('img');
                    if (img.length) {
                        image = img.attr('src');
                    }
                }
                sibling = sibling.next();
            }
    
            recommendations.push({ header, text: text.trim(), image });
        });
    
        await browser.close();
        return recommendations;
    } catch (error: any) {
      console.log('error', error)
        console.error(`Error fetching the webpage: ${error.message}`);
        return [];
    }
  }

async function scrapeEatbook(url: string) {
  try {
      // Fetch the HTML of the webpage
      const { data: html } = await axios.get(url);
  
      // Load the HTML into Cheerio
      const $ = cheerio.load(html);
  
      // Array to store the recommendations
      const recommendations: any = [];
  
      // Extract the date
      const date = $('meta[property="article:published_time"]').attr('content');
      recommendations.push({ date, website: "Eatbook" })

      // Extract each recommendation
      $('h3').each((i: any, element: any) => {
          const header = $(element).text().trim();
          let text = '';
          let image: any = '';
  
          // Get the text of the paragraphs following the header
          let sibling = $(element).next();
          while (sibling.length && sibling.prop('tagName') !== 'H2') {
          if (sibling.prop('tagName') === 'P') {
              text += sibling.text().trim() + '\n';
          }
          if (sibling.prop('tagName') === 'FIGURE') {
              const img = sibling.find('img');
              if (img.length) {
                  image = img.attr('data-src') || img.attr('src'); // get the src or data-src attribute
              }
          }
          sibling = sibling.next();
          }
  
          recommendations.push({ header, text: text.trim(), image });
      });

      return recommendations;
  } catch (error: any) {
      console.error(`Error fetching the webpage: ${error.message}`);
      return [];
  }
}