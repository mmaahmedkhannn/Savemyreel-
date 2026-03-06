const fetch = require('node-fetch'); // Use native fetch if available, or just fetch in modern node

async function getPinterestData(pinId) {
    const url = `https://www.pinterest.com/resource/PinResource/get/?data={"options":{"id":"${pinId}","field_set_key":"detailed"}}`;
    try {
        const res = await fetch(url);
        const json = await res.json();

        const pinData = json.resource_response.data;
        const result = {
            title: pinData.title || pinData.grid_title,
            thumbnail: pinData.images?.orig?.url,
            videos: pinData.story_pin_data?.pages?.map(p => p.blocks?.[0]?.video?.video_list?.V_720P?.url).filter(Boolean),
            images: pinData.story_pin_data?.pages?.map(p => p.blocks?.[0]?.image?.images?.orig?.url).filter(Boolean)
        };
        console.log(JSON.stringify(result, null, 2));
    } catch (e) {
        console.error(e);
    }
}

getPinterestData("922401498611");
