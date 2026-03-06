const fs = require('fs');
const html = fs.readFileSync('fail.html', 'utf8');
const urls = html.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com\/[A-Za-z0-9.\/_%-]+\.jpg/g) || [];
const uniqueUrls = Array.from(new Set(urls));
console.log("JPGs found:", uniqueUrls.length);
console.log(uniqueUrls.slice(0, 20));
