const fs = require('fs');
const html = fs.readFileSync('fail.html', 'utf8');

// The JSON in the HTML is often escaped like: "https:\/\/i.pinimg.com\/originals\/..."
const urls = html.match(/https:\\\/\\\/[A-Za-z0-9.-]+\.pinimg\.com\\\/[A-Za-z0-9.\\\/_%-]+\.jpg/g) || [];
const uniqueUrls = Array.from(new Set(urls));
console.log("Escaped JPGs found:", uniqueUrls.length);

const unescaped = uniqueUrls.map(u => u.replace(/\\\//g, '/'));
console.log(unescaped.slice(0, 10));
