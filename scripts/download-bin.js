const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const { execSync } = require('child_process');

const binDir = path.join(process.cwd(), 'bin');
if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
}

const isWindows = os.platform() === 'win32';
const filename = isWindows ? 'yt-dlp.exe' : 'yt-dlp';
const url = `https://github.com/yt-dlp/yt-dlp/releases/latest/download/${filename}`;
const dest = path.join(binDir, filename);

console.log(`Downloading ${filename} for ${os.platform()}...`);

const file = fs.createWriteStream(dest);
https.get(url, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        https.get(response.headers.location, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                if (!isWindows) {
                    execSync(`chmod +x "${dest}"`);
                }
                console.log('Download completed successfully!');
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            console.error('Error downloading redirected file:', err.message);
        });
        return;
    }

    response.pipe(file);
    file.on('finish', () => {
        file.close();
        if (!isWindows) {
            execSync(`chmod +x "${dest}"`);
        }
        console.log('Download completed successfully!');
    });
}).on('error', (err) => {
    fs.unlink(dest, () => { });
    console.error('Error downloading file:', err.message);
});
