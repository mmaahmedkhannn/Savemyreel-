async function fetchPinterest(url) {
    const fetch = require('cross-fetch');
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
        },
        redirect: 'follow'
    });

    const html = await response.text();
    console.log("HTML length:", html.length);
    console.log("Cookies:", response.headers.get('set-cookie'));
    const origUrlsMatch = html.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/originals\/[A-Za-z0-9.\/_%-]+\.jpg/g);
    console.log("Matches:", origUrlsMatch ? origUrlsMatch.length : 0);
}
fetchPinterest("https://www.pinterest.com/ideas/franz-kafka-funny/922401498611/");
