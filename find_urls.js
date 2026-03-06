const fs = require('fs');
try {
    const txt = fs.readFileSync('test_curl2.html', 'utf8');

    // Split the massive HTML by quotes to isolate URLs
    const parts = txt.split(/[\"\']/);
    const media = parts.filter(u => u.startsWith('https://') && u.includes('pinimg.com') &&
        (u.includes('.jpg') || u.includes('.png') || u.includes('.mp4') || u.includes('/originals/')));

    // De-duplicate
    const uniqueMedia = [...new Set(media)];

    console.log(`Found ${uniqueMedia.length} unique media URLs in the raw HTML payload`);

    if (uniqueMedia.length > 0) {
        console.log('Top 10:');
        uniqueMedia.slice(0, 10).forEach(u => console.log(u));
    }
} catch (e) {
    console.error(e);
}
