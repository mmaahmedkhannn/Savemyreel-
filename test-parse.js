async function test() {
    const formattedUrl = "https://www.pinterest.com/pin/922401498611/";
    const response = await fetch(formattedUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "en-US,en;q=0.5"
        }
    });

    console.log("Status:", response.status);
    const html = await response.text();
    console.log("HTML length:", html.length);
    const origUrlsMatch = html.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/originals\/[A-Za-z0-9.\/_%-]+\.jpg/g);
    console.log("Matches:", origUrlsMatch ? origUrlsMatch.length : 0);

    if (origUrlsMatch) {
        console.log(Array.from(new Set(origUrlsMatch)));
    } else {
        require('fs').writeFileSync('fail.html', html);
    }
}
test();
