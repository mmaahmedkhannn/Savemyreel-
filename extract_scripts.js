const fs = require('fs');
try {
    const txt = fs.readFileSync('test_curl2.html', 'utf8');
    const scripts = txt.match(/<script id=\"([^\"]+)\"[^>]*>([^<]+)<\/script>/g) || [];

    console.log(`Found ${scripts.length} script blocks with IDs and content.`);

    scripts.forEach(s => {
        const idMatch = s.match(/id=\"([^\"]+)\"/);
        if (idMatch) {
            console.log(`- Script ID: ${idMatch[1]} (length: ${s.length})`);
            if (s.includes('initialReduxState') || s.includes('video_list') || s.includes('V_720P') || s.includes('922401498611')) {
                console.log(`  -> This script contains pin data/video URLs!`);
                fs.writeFileSync(`script_${idMatch[1]}.json`, s);
            }
        }
    });

} catch (e) {
    console.error(e);
}
