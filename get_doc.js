const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Starting puppeteer to capture exact HTML document...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    let initialHtml = '';

    page.on('response', async res => {
        if (res.url() === 'https://www.pinterest.com/pin/922401498611/') {
            initialHtml = await res.text();
            fs.writeFileSync('puppeteer_full.html', initialHtml);
            console.log('Saved page HTML to puppeteer_full.html. Length:', initialHtml.length);

            const idx = initialHtml.indexOf('b2620');
            console.log('Image hash index in document:', idx);
            if (idx > -1) {
                console.log(initialHtml.substring(idx - 100, idx + 100));
            }
        }
    });

    await page.goto('https://www.pinterest.com/pin/922401498611/', { waitUntil: 'networkidle2' });

    await browser.close();
})();
