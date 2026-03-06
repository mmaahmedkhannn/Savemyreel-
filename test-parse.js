const fs = require('fs');
const str = fs.readFileSync('test.html', 'utf8');

const jpgs = str.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com[A-Za-z0-9.\/_%-]+\.jpg/g) || [];
const escapedJpgs = str.match(/https:\\\/\\\/[A-Za-z0-9.-]+\.pinimg\.com[A-Za-z0-9.\\\/_%-]+\.jpg/g) || [];

console.log("Normal JPGs:", Array.from(new Set(jpgs)).slice(0, 10));

const unescaped = escapedJpgs.map(s => s.replace(/\\\//g, '/'));
console.log("Escaped JPGs:", Array.from(new Set(unescaped)).slice(0, 5));

const mp4s = str.match(/https:\/\/[A-Za-z0-9.-]+\.pinimg\.com[A-Za-z0-9.\/_%-]+\.mp4/g) || [];
const escapedMp4s = str.match(/https:\\\/\\\/[A-Za-z0-9.-]+\.pinimg\.com[A-Za-z0-9.\\\/_%-]+\.mp4/g) || [];

console.log("Normal MP4s:", Array.from(new Set(mp4s)).slice(0, 5));

const unescapedMp4 = escapedMp4s.map(s => s.replace(/\\\//g, '/'));
console.log("Escaped MP4s:", Array.from(new Set(unescapedMp4)).slice(0, 5));
