import express, { Request, Response } from 'express';
import cheerio from "cheerio";
import cors from 'cors'
import axios from 'axios'
import 'dotenv/config'

const app = express();
app.use(cors())

const router = express.Router()
router.get('/google', async (req: Request, res: Response) => {
    // Fetch results for page 1 and page 2
    const page1Results = await scrapeGoogle(req.query.query, 0);  // Page 1 (start = 0)
    const page2Results = await scrapeGoogle(req.query.query, 10); // Page 2 (start = 10)

    // Combine results from both pages
    const combinedResults = [...page1Results, ...page2Results];

    console.log(combinedResults);
    return res.status(200).json(combinedResults);
})

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
                console.log('searchResults', searchResults);
                return searchResults
            });
        console.log('googleResults', googleResults)

        const filtered = googleResults.filter(result => result.link.includes('sethlui') || result.link.includes('eatbook'))
        console.log('filtered', filtered);

        const results = await Promise.all(filtered.map(async result => {
            if (result.link.includes('sethlui')) {
                return await scrapeSethLui(result.link)
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
        const proxy = {
            protocol: 'http',
            host: '97.74.87.226',
            port: 80,
        };

        // Fetch the HTML of the webpage
        const { data: html } = await axios.get(url, {
            headers: {
                "User-Agent": ua,
            },
            proxy
        });
  
        // Load the HTML into Cheerio
        const $ = cheerio.load(html);
  
        // Array to store the recommendations
        const recommendations: any = [];
  
        // Extract the date
        const date = $('time.entry-date').attr('datetime');
        recommendations.push({ date, website: "Seth Lui" });
  
        // Extract each recommendation
        $('h2').each((i, element) => {
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
        $('h3').each((i, element) => {
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

// app.get('/scrape', async (req: Request, res: Response) => {
//     console.log('req', req.query.name)

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // https://sethlui.com/bukit-timah-market-food-centre-last-hurrah-singapore/
//     await page.goto('https://sethlui.com/toa-payoh-lorong-8-market-food-centre-guide-singapore/');
//     await page.setViewport({width: 1080, height: 1024});
//     await page.waitForSelector('h2');

//     // Extract the food recommendations
//     const recommendations: any = await page.evaluate(() => {
//         // Get all the h2 headers and the following paragraphs
//         const headers = Array.from(document.querySelectorAll('h2'));
//         const recommendationsList = headers.map(header => {
//             // Get the header text
//             const title = header.innerText;

//             // Get the text of the paragraph following the header
//             let text = '';
//             let image = '';
//             let sibling: any = header.nextElementSibling;
//             while (sibling && sibling.tagName.toLowerCase() !== 'h2') {
//                 if (sibling.tagName.toLowerCase() === 'p') {
//                 text += sibling.innerText + '\n';
//                 }
//                 if (sibling.tagName.toLowerCase() === 'figure') {
//                     const img = sibling.querySelector('img');
//                     if (img) {
//                       image = img.src;
//                     }
//                 }
//                 sibling = sibling.nextElementSibling;
//             }

//             return { title, text: text.trim(), image };
//         });

//         return recommendationsList;
//     });

//     console.log(recommendations);
//     await browser.close();
//     return res.status(200).json(recommendations)
// })

app.use('/api', router)

const url = process.env.NEXT_PUBLIC_ENV === 'PROD' ? `https://singaporehawker.netlify.app/api` : 4000
app.listen(url);