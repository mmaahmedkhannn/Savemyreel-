const fs = require('fs');
try {
    const txt = fs.readFileSync('script___PWS_ROUTES__.json', 'utf8');
    const jsonStr = txt.replace(/<script[^>]*>/, '').replace(/<\/script>/, '').trim();
    const data = JSON.parse(jsonStr);

    let found = [];
    function findKey(obj, keyToMatch, path = '') {
        if (!obj || typeof obj !== 'object') return;
        Object.keys(obj).forEach(k => {
            const currentPath = path ? `${path}.${k}` : k;
            if (k === keyToMatch) {
                found.push(currentPath);
            }
            if (typeof obj[k] === 'string' && obj[k].includes(keyToMatch)) {
                found.push(`${currentPath} (Value Match)`);
            }
            findKey(obj[k], keyToMatch, currentPath);
        });
    }

    findKey(data, '922401498611');
    findKey(data, 'V_720P');
    findKey(data, 'video_list');
    findKey(data, 'story_pin_data');

    console.log('Matches:', found);
} catch (e) {
    console.error(e);
}
