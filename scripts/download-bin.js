const fs = require('fs');
const path = require('path');
const https = require('https');

const binDir = path.join(process.cwd(), 'bin');
if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
}

const url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
const dest = path.join(binDir, 'yt-dlp.exe');

if (fs.existsSync(dest)) {
    console.log('yt-dlp.exe already exists');
    process.exit(0);
}

console.log('Downloading yt-dlp.exe...');
const file = fs.createWriteStream(dest);
https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Download completed!');
    });
}).on('error', (err) => {
    fs.unlink(dest);
    console.error('Error downloading file:', err.message);
});
