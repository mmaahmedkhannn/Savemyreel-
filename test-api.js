const https = require('https');

async function getPinterestData(pinId) {
    const url = `https://www.pinterest.com/resource/PinResource/get/?data={"options":{"id":"${pinId}","field_set_key":"detailed"}}`;

    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                const pinData = json.resource_response.data;
                const result = {
                    title: pinData.title || pinData.grid_title,
                    thumbnail: pinData.images?.orig?.url,
                    videos: pinData.story_pin_data?.pages?.map(p => p.blocks?.[0]?.video?.video_list?.V_720P?.url).filter(Boolean),
                    images: pinData.story_pin_data?.pages?.map(p => p.blocks?.[0]?.image?.images?.orig?.url).filter(Boolean)
                };
                console.log(JSON.stringify(result, null, 2));
            } catch (e) {
                console.error("Parse Error:", e);
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

getPinterestData("922401498611");
