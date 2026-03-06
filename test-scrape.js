const https = require('https');

async function testPinterestScraper() {
    const url = "https://www.pinterest.com/ideas/franz-kafka-funny/922401498611/";

    try {
        const html = await new Promise((resolve, reject) => {
            const req = https.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml",
                    "Accept-Language": "en-US,en;q=0.5"
                }
            }, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    console.log("Redirected to:", res.headers.location);
                    // Just follow 1 redirect if needed
                    https.get(res.headers.location, {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml",
                        }
                    }, (res2) => {
                        let data = '';
                        res2.on('data', c => data += c);
                        res2.on('end', () => resolve(data));
                    });
                    return;
                }

                let data = '';
                res.on('data', c => data += c);
                res.on('end', () => resolve(data));
            });
            req.on('error', reject);
        });

        console.log("HTML length:", html.length);

        // Extract all high-res original images from the React/Redux JSON blob embedded in the HTML
        const origUrlsMatch = html.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/originals\/[A-Za-z0-9.\/_%-]+\.jpg/g);

        if (!origUrlsMatch || origUrlsMatch.length === 0) {
            console.error("No media found on this Pinterest page.");
            return;
        }

        const uniqueUrls = Array.from(new Set(origUrlsMatch));
        console.log("Found matches:", uniqueUrls.length);
        console.log(uniqueUrls.slice(0, 5));

    } catch (e) {
        console.error("Error:", e);
    }
}

testPinterestScraper();
