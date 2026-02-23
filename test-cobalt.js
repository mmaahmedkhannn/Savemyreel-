async function test() {
    try {
        console.log("Fetching cobalt api...");
        const res = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            body: JSON.stringify({
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            })
        });
        const json = await res.json();
        console.log("Success:", json);
    } catch (e) {
        console.error("Error:", e.message);
    }
}
test();
