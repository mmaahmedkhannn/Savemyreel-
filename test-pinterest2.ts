import { pinterestService } from "./lib/services/pinterest";

async function main() {
    const originalUrl = "https://www.pinterest.com/ideas/franz-kafka-funny/922268612745/";
    console.log("Testing original URL:", originalUrl);
    try {
        const result = await pinterestService.extract(originalUrl);
        console.log("SUCCESS!", result);
    } catch (err: any) {
        console.error("FAILED original:", err.message);
    }

    const normalizedUrl = "https://www.pinterest.com/pin/922268612745/";
    console.log("\nTesting normalized URL:", normalizedUrl);
    try {
        const result = await pinterestService.extract(normalizedUrl);
        console.log("SUCCESS!", result);
    } catch (err: any) {
        console.error("FAILED normalized:", err.message);
    }
}

main();
