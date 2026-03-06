const https = require('https');
const fs = require('fs');

async function scrapePinterest(url) {
    const options = {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5"
        }
    };

    https.get(url, options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log("Redirecting to", res.headers.location);
            return scrapePinterest(res.headers.location);
        }

        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`Fetched ${data.length} bytes`);
            fs.writeFileSync("test.html", data);
            console.log("Dumped HTML to test.html");
        });
    });
}

scrapePinterest("https://www.pinterest.com/ideas/franz-kafka-funny/922401498611/");
