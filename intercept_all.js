const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Starting puppeteer to intercept ALL requests...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    let logs = [];

    page.on('response', async response => {
        const url = response.url();
        const type = response.request().resourceType();

        if (type === 'xhr' || type === 'fetch' || url.includes('/resource/')) {
            try {
                const text = await response.text();
                // We're looking for the image hash: b2620061ca887c12a7fc152d92c48b41
                if (text.includes('b262006') || text.includes('.mp4') || text.includes('V_720P')) {
                    console.log(`\n\n=== FOUND MEDIA HASH IN ===\n${url}\n=================\n`);
                    logs.push({ url, method: response.request().method(), body: text.substring(0, 1000) });
                    fs.writeFileSync('media_payload.json', text);
                }
            } catch (e) { }
        }
    });

    console.log('Navigating to Idea Pin...');
    await page.goto('https://www.pinterest.com/pin/922401498611/', { waitUntil: 'networkidle2' });

    console.log('Done.');
    if (logs.length > 0) {
        console.log('Found payloads!');
        fs.writeFileSync('media_intercept_logs.json', JSON.stringify(logs, null, 2));
    } else {
        console.log('Hash not found in any XHR/Fetch request. It must be generated or we missed the request type.');
    }
    await browser.close();
})();
