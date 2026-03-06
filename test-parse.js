const fs = require('fs');

const data = JSON.parse(fs.readFileSync('formatted.json'));
let foundImages = [];

function searchObj(obj) {
    if (!obj) return;
    if (typeof obj === 'string') {
        if (obj.includes('.jpg') && obj.includes('orig')) foundImages.push(obj);
        return;
    }
    if (typeof obj === 'object') {
        for (let key in obj) {
            if (typeof obj[key] === 'string' && obj[key].includes('.jpg') && obj[key].includes('/orig/')) {
                foundImages.push(obj[key]);
            }
            searchObj(obj[key]);
        }
    }
}

searchObj(data);

console.log("Images:", Array.from(new Set(foundImages)).slice(0, 5));
