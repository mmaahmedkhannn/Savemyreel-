import fetch from 'cross-fetch';
import * as fs from 'fs';

async function testPinResource() {
    try {
        const cookies = fs.readFileSync('cookies.txt', 'utf8');
        const pinId = '922401498611';

        // Pinterest's internal API route for Pin Data
        const dataObj = {
            options: {
                id: pinId,
                field_set_key: "detailed"
            },
            context: {}
        };

        const url = `https://www.pinterest.com/resource/PinResource/get/?source_url=/pin/${pinId}/&data=${encodeURIComponent(JSON.stringify(dataObj))}`;

        console.log(`Fetching: ${url}`);

        // Parse cookies.txt (Netscape format) into a valid Cookie header string
        const cookieHeader = cookies.split('\n')
            .filter(line => !line.startsWith('#') && line.trim() !== '')
            .map(line => {
                const parts = line.split('\t');
                if (parts.length >= 7) {
                    return `${parts[5]}=${parts[6]}`;
                }
                return '';
            })
            .filter(Boolean)
            .join('; ');

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/javascript, */*, q=0.01',
                'Accept-Language': 'en-US,en;q=0.9',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Pinterest-AppState': 'active',
                'Cookie': cookieHeader
            }
        });

        console.log(`Status: ${res.status}`);
        const text = await res.text();
        fs.writeFileSync('test_pin_resource.json', text);
        console.log('Saved to test_pin_resource.json, length: ' + text.length);

        if (text.length > 500) {
            console.log('Preview:', text.substring(0, 500));
        } else {
            console.log('Preview:', text);
        }
    } catch (err) {
        console.error(err);
    }
}

testPinResource();
