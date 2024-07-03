import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs'

const app = express();

app.get('/scrape', async (req: any, res: any) => {

})

async function start () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

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
            let sibling: any = header.nextElementSibling;
            while (sibling && sibling.tagName.toLowerCase() !== 'h2') {
                if (sibling.tagName.toLowerCase() === 'p') {
                text += sibling.innerText + '\n';
                }
                sibling = sibling.nextElementSibling;
            }

            return { title, text: text.trim() };
        });

        return recommendationsList;
    });

    console.log(recommendations);
    await browser.close();
}

start()

app.listen(4000);