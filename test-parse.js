async function test() {
    const url = "https://www.pinterest.com/ideas/franz-kafka-funny/922401498611/";
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        }
    });

    const html = await response.text();
    console.log("With UA Length:", html.length);
    const m1 = html.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/originals\/[A-Za-z0-9.\/_%-]+\.jpg/g);
    console.log("Matches:", m1 ? m1.length : 0);

    const r2 = await fetch(url); // No headers
    const html2 = await r2.text();
    console.log("No headers Length:", html2.length);
    const m2 = html2.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/originals\/[A-Za-z0-9.\/_%-]+\.jpg/g);
    console.log("Matches:", m2 ? m2.length : 0);
}
test();
