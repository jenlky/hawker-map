import puppeteer from 'puppeteer';
import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import cors from 'cors'

const app = express();
app.use(cors())

app.get('/scrape', async (req: Request, res: Response) => {
    console.log('req', req.query.name)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // https://sethlui.com/bukit-timah-market-food-centre-last-hurrah-singapore/
    await page.goto('https://sethlui.com/toa-payoh-lorong-8-market-food-centre-guide-singapore/');
    await page.setViewport({width: 1080, height: 1024});
    await page.waitForSelector('h2');

    // Extract the food recommendations
    const recommendations: any = await page.evaluate(() => {
        // Get all the h2 headers and the following paragraphs
        const headers = Array.from(document.querySelectorAll('h2'));
        const recommendationsList = headers.map(header => {
            // Get the header text
            const title = header.innerText;

            // Get the text of the paragraph following the header
            let text = '';
            let image = '';
            let sibling: any = header.nextElementSibling;
            while (sibling && sibling.tagName.toLowerCase() !== 'h2') {
                if (sibling.tagName.toLowerCase() === 'p') {
                text += sibling.innerText + '\n';
                }
                if (sibling.tagName.toLowerCase() === 'figure') {
                    const img = sibling.querySelector('img');
                    if (img) {
                      image = img.src;
                    }
                }
                sibling = sibling.nextElementSibling;
            }

            return { title, text: text.trim(), image };
        });

        return recommendationsList;
    });

    console.log(recommendations);
    await browser.close();
    return res.status(200).json(recommendations)
})

async function read () {
    const file = await fs.readFile(process.cwd() + '/sample.txt', 'utf8');
    // console.log(file)
    const stringified = JSON.stringify(file)
    const data = JSON.parse(stringified);
    // console.log(data)
}

app.listen(4000);