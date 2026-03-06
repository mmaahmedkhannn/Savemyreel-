const fs = require('fs');
try {
    const dataStr = fs.readFileSync('test_pws_data.json', 'utf8');
    const data = JSON.parse(dataStr);

    console.log('Root keys:', Object.keys(data));
    if (data.props) console.log('Props keys:', Object.keys(data.props));

    // Sometimes it's in props.initialReduxState.pins, sometimes it's props.pageProps.initialReduxState
    const reduxState = data.props?.initialReduxState || data.props?.pageProps?.initialReduxState;
    if (reduxState) {
        console.log('Redux State Pins:', Object.keys(reduxState.pins || {}));
    } else {
        console.log('No Redux State found.');
        // Dump first level of pageProps to see what we have
        if (data.props?.pageProps) {
            console.log('pageProps keys:', Object.keys(data.props.pageProps));
            if (data.props.pageProps.serverState) {
                console.log('serverState keys:', Object.keys(data.props.pageProps.serverState));
            }
        }
    }
} catch (e) {
    console.error(e);
}
