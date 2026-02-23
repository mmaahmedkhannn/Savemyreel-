export interface MediaItem {
    url: string;
    thumbnail?: string;
    type: 'video' | 'image';
    filename?: string;
    width?: number;
    height?: number;
}

export interface DownloadResult {
    url: string;
    thumbnail?: string;
    title?: string;
    filename?: string;
    platform: 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'youtube' | 'unknown';
    type: 'video' | 'image';
    metadata?: Record<string, any>;
    carouselItems?: MediaItem[];
    sourceUrl?: string; // Original platform URL for server-side download
}

/**
 * Service Interface
 * All services MUST implement canHandle and extract
 */
export interface DownloaderService {
    canHandle(url: string): boolean;
    extract(url: string): Promise<MediaItem[] | DownloadResult>;
}
