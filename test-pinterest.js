const { execFile } = require('child_process');
const path = require('path');

const url = "https://www.pinterest.com/ideas/franz-kafka-funny/922268612745/";

const ytdlpPath = path.join(__dirname, "bin", "yt-dlp.exe");

execFile(ytdlpPath, ["--dump-json", url, "--no-warnings"], { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
    if (err) {
        console.error("ERROR:");
        console.error(stderr);
    } else {
        const data = JSON.parse(stdout);
        console.log("SUCCESS:");
        console.log(data.title, data.url || data.thumbnail);
    }
});
