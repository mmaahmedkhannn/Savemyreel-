const fs = require('fs');
['test_curl2.html', 'test_curl_googlebot.html'].forEach(file => {
    try {
        const txt = fs.readFileSync(file, 'utf8');
        const idx = txt.indexOf('application/ld+json');
        console.log(`\n--- ${file} ---`);
        console.log('Index:', idx);

        if (idx !== -1) {
            const endIdx = txt.indexOf('</script>', idx);
            let snippet = txt.substring(idx - 20, endIdx > -1 ? Math.min(endIdx + 9, idx + 1000) : idx + 200);
            console.log('Snippet length:', snippet.length);

            // If the snippet has video URLs
            console.log('Contains MP4?', snippet.includes('.mp4'));
            console.log('Contains contentUrl?', snippet.includes('contentUrl'));

            // save it just in case
            fs.writeFileSync(`ld_${file}.json`, snippet);
        }
    } catch (e) {
        console.log(`File not found: ${file}`);
    }
});
