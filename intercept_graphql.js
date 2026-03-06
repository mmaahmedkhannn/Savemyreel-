const puppeteer = require('puppeteer');

(async () => {
    console.log('Starting puppeteer to intercept GraphQL calls...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('request', request => {
        const url = request.url();
        if (url.includes('/resource/')) {
            console.log(`[REQUEST] ${url}`);
            if (request.method() === 'POST' || request.method() === 'GET') {
                console.log(`Payload: ${request.postData() || Object.fromEntries(new URL(request.url()).searchParams)}`);
            }
        }
    });

    page.on('response', async response => {
        const url = response.url();
        if (url.includes('/resource/') && response.status() === 200) {
            try {
                const text = await response.text();
                if (text.includes('video_list') || text.includes('V_720P')) {
                    console.log(`\n\n=== FOUND VIDEO DATA IN ===\n${url}\n=================\n`);
                    require('fs').writeFileSync('graphql_intercept.json', text);
                }
            } catch (e) { }
        }
    });

    console.log('Navigating to Idea Pin...');
    await page.goto('https://www.pinterest.com/pin/922401498611/', { waitUntil: 'networkidle2' });

    console.log('Done.');
    await browser.close();
})();
