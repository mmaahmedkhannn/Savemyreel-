const ig = require('instagram-url-direct');

async function test() {
    try {
        const result = await ig('https://www.instagram.com/reel/DVBWap8koBy/');
        console.log("Success:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Error:", e.message);
    }
}

test();
