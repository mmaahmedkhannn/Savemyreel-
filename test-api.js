const https = require('https');

async function getPinterestData(pinId) {
    const dataObj = { "options": { "id": pinId, "field_set_key": "detailed" } };
    const encodedData = encodeURIComponent(JSON.stringify(dataObj));
    const url = `https://www.pinterest.com/resource/PinResource/get/?source_url=/pin/${pinId}/&data=${encodedData}`;

    const options = {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    };

    https.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                const pinData = json.resource_response?.data;
                if (!pinData) {
                    console.log("No data found in response:", json);
                    return;
                }
                const result = {
                    title: pinData.title || pinData.grid_title,
                    thumbnail: pinData.images?.orig?.url,
                    videos: pinData.story_pin_data?.pages?.map(p => p.blocks?.[0]?.video?.video_list?.V_720P?.url).filter(Boolean),
                    images: pinData.story_pin_data?.pages?.map(p => p.blocks?.[0]?.image?.images?.orig?.url).filter(Boolean)
                };
                console.log(JSON.stringify(result, null, 2));
            } catch (e) {
                console.error("Parse Error:", e);
                console.log("Raw Response:", data);
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

getPinterestData("922401498611");
