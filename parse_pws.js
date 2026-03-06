const fs = require('fs');
try {
    const dataStr = fs.readFileSync('test_pws_data.json', 'utf8');
    const data = JSON.parse(dataStr);

    // Pinterest Redux State is usually at .props.initialReduxState.pins
    const pins = data?.props?.initialReduxState?.pins || {};
    const pinIds = Object.keys(pins);

    console.log('Found Pin IDs:', pinIds);

    const pinId = '922401498611';
    const pin = pins[pinId] || Object.values(pins)[0];

    if (pin) {
        console.log('Pin Title:', pin.title || pin.grid_title);
        console.log('Images:', pin.images ? Object.keys(pin.images) : 'None');

        if (pin.story_pin_data && pin.story_pin_data.pages) {
            console.log('Idea Pin Pages:', pin.story_pin_data.pages.length);
            // Print the first page's image/video blocks
            const blocks = pin.story_pin_data.pages[0].blocks;
            console.log('Page 1 Media Blocks:', blocks.length);
            blocks.forEach((block, idx) => {
                if (block.type === 'story_pin_video_block' || block.type === 'video') {
                    console.log(` Block ${idx}: Video -> ${block.video?.video_list?.V_720P?.url}`);
                } else if (block.type === 'story_pin_image_block' || block.type === 'image') {
                    console.log(` Block ${idx}: Image -> ${block.image?.images?.originals?.url || 'No URL'}`);
                }
            });
        } else if (pin.videos) {
            console.log('Standard Video URL:', pin.videos.video_list?.V_720P?.url);
        } else {
            console.log('Image Only URL:', pin.images?.originals?.url);
        }
    } else {
        console.log('No pin data found in Redux state. Inspecting root keys...');
        console.log(Object.keys(data.props.initialReduxState || {}));
    }
} catch (e) {
    console.error(e);
}
