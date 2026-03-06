const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const binDir = path.join(__dirname, 'bin');
if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
}

const url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
const dest = path.join(binDir, 'yt-dlp.exe');

console.log('Downloading yt-dlp.exe...');

const req = https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (redirectRes) => {
            const file = fs.createWriteStream(dest);
            redirectRes.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Download complete. Size:', fs.statSync(dest).size);

                // Test the new binary
                try {
                    console.log('Testing...');
                    const output = execSync(`"${dest}" --version`).toString();
                    console.log('Version:', output.trim());
                } catch (e) {
                    console.error('Test failed:', e.message);
                }
            });
        });
    } else {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Download complete. Size:', fs.statSync(dest).size);
        });
    }
});

req.on('error', (err) => {
    console.error('Download error:', err.message);
});
