import fetch from 'cross-fetch';
import * as fs from 'fs';

async function go() {
    const res = await fetch('https://www.pinterest.com/pin/922401498611/', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        }
    });

    const text = await res.text();
    fs.writeFileSync('test_mobile.html', text);

    console.log(text.includes('__PWS_DATA__') ? 'Has PWS' : 'No PWS');
    console.log(text.includes('__PWS_INITIAL_PROPS__') ? 'Has INITIAL_PROPS' : 'No INITIAL_PROPS');
    console.log(text.includes('og:image') ? 'Has og:image' : 'No og:image');
    console.log(text.includes('video_list') ? 'Has video_list' : 'No video_list');
    console.log(text.includes('V_720P') ? 'Has V_720P' : 'No V_720P');
    console.log(text.length);
}
go();
