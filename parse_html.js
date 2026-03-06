const fs = require('fs');
const html = fs.readFileSync('test_curl2.html', 'utf8');

console.log('og:image idx:', html.indexOf('og:image'));
console.log('og:video idx:', html.indexOf('og:video'));
console.log('__PWS_DATA__ idx:', html.indexOf('__PWS_DATA__'));

const pwsMatch = html.match(/<script id=\"__PWS_DATA__\"[^>]*>([^<]+)<\/script>/);
if (pwsMatch) {
    console.log('Found __PWS_DATA__ script block!');
    const data = JSON.parse(pwsMatch[1]);
    fs.writeFileSync('test_pws_data.json', JSON.stringify(data, null, 2));
    console.log('Saved to test_pws_data.json');
} else {
    // try to find just the raw PWS DATA string
    const idx = html.indexOf('__PWS_DATA__');
    if (idx !== -1) {
        console.log('Substring around PWS DATA:', html.substring(idx - 50, idx + 200));
    }
}
