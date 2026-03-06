const https = require('https');

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

            // Look for the initial Redux state or Relay state
            const stateMatch = data.match(/<script id="__PWS_DATA__" type="application\/json">([^<]+)<\/script>/);
            if (stateMatch) {
                try {
                    const pwsData = JSON.parse(stateMatch[1]);
                    console.log("Found __PWS_DATA__");

                    // Simple search for Video URLs in the json text just to see if it's there
                    const strData = stateMatch[1];
                    const vids = strData.match(/"url":"(https:\/\/[^"]+\.mp4)"/g);
                    const imgs = strData.match(/"url":"(https:\/\/[^"]+\.jpg)"/g);

                    console.log("Found videos:", vids ? vids.length : 0);
                    if (vids) console.log(vids[0]);

                } catch (e) { console.error(e); }
            } else {

                const relayMatch = data.match(/<script id="__INITIAL_DATA__" type="application\/json">([^<]+)<\/script>/);
                if (relayMatch) {
                    console.log("Found __INITIAL_DATA__");
                } else {
                    console.log("No data script found");
                }
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

scrapePinterest("https://www.pinterest.com/ideas/franz-kafka-funny/922401498611/");
