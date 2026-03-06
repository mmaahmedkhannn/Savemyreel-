const fs = require('fs');
try {
    const txt = fs.readFileSync('graphql_intercept.json', 'utf8');
    const data = JSON.parse(txt);

    console.log('--- GraphQL Response Structure ---');
    console.log('Root keys:', Object.keys(data));

    if (data.resource_response) {
        console.log('Resource keys:', Object.keys(data.resource_response));
        const resData = data.resource_response.data;
        if (resData) {
            console.log('Data keys:', Object.keys(resData));
            if (resData.v3_get_pin) {
                console.log('Found v3_get_pin! This is the GraphQL query name.');
            }
            if (resData.story_pin_data || resData.videos) {
                console.log('Direct media found! Videos:', !!resData.videos, 'Story:', !!resData.story_pin_data);
            }
        }
    } else {
        console.log('No resource_response. This might be a different format.');
    }
} catch (e) {
    console.error(e);
}
