import fetch from 'cross-fetch';

async function testPin(url: string) {
    try {
        console.log(`\nFetching: ${url}`);
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                'Accept': 'text/html'
            }
        });

        const html = await res.text();
        console.log(`Status: ${res.status}`);
        console.log(`Length: ${html.length}`);

        const hasOgImage = html.includes('og:image');
        const hasOgVideo = html.includes('og:video');
        console.log(`og:image present: ${hasOgImage}`);
        console.log(`og:video present: ${hasOgVideo}`);

        if (hasOgImage) {
            const ogImageMatch = html.match(/<meta[^>]+property=\"og:image\"[^>]+content=\"([^\"]+)\"/i);
            if (ogImageMatch) console.log('og:image ->', ogImageMatch[1]);
        }

    } catch (e) {
        console.error(e);
    }
}

testPin('https://www.pinterest.com/pin/922401498611/'); // Idea Pin
testPin('https://www.pinterest.com/pin/513691901267499882/'); // Regular image pin
