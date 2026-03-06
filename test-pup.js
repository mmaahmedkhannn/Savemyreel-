async function testPup() {
    const puppeteer = require('puppeteer-core');
    let chromium;
    try {
        chromium = require('@sparticuz/chromium');
    } catch (e) {
        console.error("Sparticuz Chromium missing, falling back to local chrome path if exists", e);
    }

    let browser;
    try {
        const executablePath = chromium ? await chromium.executablePath() : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
        console.log("Using path:", executablePath);

        browser = await puppeteer.launch({
            args: chromium ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: chromium ? chromium.defaultViewport : { width: 1280, height: 720 },
            executablePath: executablePath,
            headless: chromium ? chromium.headless : true,
        });

        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

        await page.goto("https://www.pinterest.com/ideas/franz-kafka-funny/922401498611/", { waitUntil: 'domcontentloaded', timeout: 30000 });
        const html = await page.content();
        console.log("Got HTML Length:", html.length);
        const origUrlsMatch = html.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/originals\/[A-Za-z0-9.\/_%-]+\.jpg/g);
        console.log("Matches:", origUrlsMatch ? origUrlsMatch.length : 0);
    } catch (e) {
        console.error("Error launching browser:", e);
    } finally {
        if (browser) await browser.close();
    }
}
testPup();
