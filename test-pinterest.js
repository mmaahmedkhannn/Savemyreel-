const { execFile } = require('child_process');
const path = require('path');

const url1 = "https://www.pinterest.com/ideas/franz-kafka-funny/922268612745/";
const url2 = "https://www.pinterest.com/pin/922268612745/";

const ytdlpPath = path.join(__dirname, "bin", "yt-dlp.exe");

execFile(ytdlpPath, ["--dump-json", url1, "--no-warnings"], { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
    console.log("=== URL 1 (/ideas/) ===");
    if (err) console.log("ERROR:", stderr || err.message);
    else console.log("SUCCESS");
});

execFile(ytdlpPath, ["--dump-json", url2, "--no-warnings"], { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
    console.log("=== URL 2 (/pin/) ===");
    if (err) console.log("ERROR:", stderr || err.message);
    else console.log("SUCCESS");
});
