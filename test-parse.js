const fs = require('fs');

const data = JSON.parse(fs.readFileSync('formatted.json'));

let foundImages = [];
let foundVideos = [];

function searchObj(obj) {
    if (!obj) return;
    if (typeof obj === 'string') {
        if (obj.includes('.mp4')) foundVideos.push(obj);
        if (obj.includes('.m3u8')) foundVideos.push(obj);
        if (obj.includes('.jpg') && obj.includes('orig')) foundImages.push(obj);
        return;
    }
    if (typeof obj === 'object') {
        for (let key in obj) {
            if (key === 'url' && typeof obj[key] === 'string') {
                if (obj[key].includes('.mp4')) foundVideos.push(obj[key]);
                if (obj[key].includes('.jpg') && obj[key].includes('orig')) foundImages.push(obj[key]);
            }
            searchObj(obj[key]);
        }
    }
}

searchObj(data);

console.log("Videos:", Array.from(new Set(foundVideos)));
console.log("Images:", Array.from(new Set(foundImages)).slice(0, 10));
