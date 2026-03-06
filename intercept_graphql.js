const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Starting puppeteer to read live DOM...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    console.log('Navigating to Idea Pin...');
    await page.goto('https://www.pinterest.com/pin/922401498611/', { waitUntil: 'networkidle2' });

    // Evaluate the live DOM
    const media = await page.evaluate(() => {
        const videos = Array.from(document.querySelectorAll('video')).map(v => v.src || v.querySelector('source')?.src);
        const images = Array.from(document.querySelectorAll('img[src*="pinimg"]')).map(i => i.src);
        return { videos, images };
    });

    console.log('Live Videos:', media.videos);
    console.log(`Live Images count: ${media.images.length}`);
    if (media.images.length > 0) {
        console.log('First 3 images:', media.images.slice(0, 3));
    }

    fs.writeFileSync('dom_media.json', JSON.stringify(media, null, 2));

    console.log('Done.');
    await browser.close();
})();
