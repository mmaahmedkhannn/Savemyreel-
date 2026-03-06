const fs = require('fs');
['test_curl2.html', 'test_mobile.html'].forEach(file => {
    try {
        const txt = fs.readFileSync(file, 'utf8');
        const searchTerms = ['b2620061ca887c12a7fc152d92c48b41', 'video_list'];

        searchTerms.forEach(term => {
            const idx = txt.indexOf(term);
            if (idx > -1) {
                console.log(`\nFound ${term} in ${file} at ${idx}`);
                console.log(txt.substring(idx - 100, idx + 100));
            } else {
                console.log(`\nNot found: ${term} in ${file}`);
            }
        });
    } catch (e) { }
});
