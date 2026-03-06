import { DownloaderService } from "@/types";
import { facebookService } from "./facebook";
import { tiktokService } from "./tiktok";
import { twitterService } from "./twitter";
import { youtubeService } from "./youtube";
import { pinterestService } from "./pinterest";

/**
 * Server-side service registry for the /api/download route.
 * 
 * Instagram is NOT included here because it uses a separate
 * client-side flow via instagramService → /api/instagram/fetch.
 */
const services: DownloaderService[] = [
    facebookService,
    twitterService,
    tiktokService,
    youtubeService,
    pinterestService,
];

export function getServiceForUrl(url: string): DownloaderService | null {
    return services.find((service) => service.canHandle(url)) || null;
}
