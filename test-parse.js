const fs = require('fs');
const data = JSON.parse(fs.readFileSync('formatted.json'));

let urls = new Set();
function findURLs(obj) {
    if (!obj) return;
    if (typeof obj === 'string' && obj.startsWith('http')) {
        urls.add(obj);
    } else if (typeof obj === 'object') {
        for (let key in obj) {
            findURLs(obj[key]);
        }
    }
}
findURLs(data);

const urlArr = Array.from(urls);
console.log('Total URLs found:', urlArr.length);

const mediaUrls = urlArr.filter(u => !u.includes('/avatars/') && !u.includes('/tracking/') && (u.includes('.jpg') || u.includes('.mp4') || u.includes('.m3u8') || u.includes('.png') || u.includes('.webp')));
console.log('Media URLs:');
mediaUrls.slice(0, 10).forEach(u => console.log(u));
