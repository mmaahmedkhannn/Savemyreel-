const fs = require('fs');

const str = fs.readFileSync('formatted.json', 'utf8');

console.log("Length:", str.length);
console.log("Preview:");
console.log(str.substring(0, 1000));
