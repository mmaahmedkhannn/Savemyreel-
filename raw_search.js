const fs = require('fs');
try {
    const txt = fs.readFileSync('test_curl2.html', 'utf8');

    ['922401498611', 'V_720P', 'video_list', 'story_pin_data'].forEach(term => {
        const idx = txt.indexOf(term);
        console.log(`\n--- Term: ${term} ---`);
        console.log(`Index: ${idx}`);
        if (idx !== -1) {
            console.log('Snippet:');
            console.log(txt.substring(idx - 150, idx + 250));
        }
    });

} catch (e) {
    console.error(e);
}
