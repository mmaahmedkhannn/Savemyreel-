import type { MetadataRoute } from "next";

const BASE_URL = "https://savemyreel.online";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        // Core pages
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/features`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },

        // Platform downloader landing pages (high priority)
        {
            url: `${BASE_URL}/instagram-downloader`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/tiktok-downloader`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/facebook-downloader`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/twitter-downloader`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/youtube-downloader`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/pinterest-downloader`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },

        // Blog articles
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/how-to-download-instagram-reels`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-tiktok-without-watermark`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/save-facebook-videos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-youtube-videos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-twitter-videos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/save-instagram-stories`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-youtube-shorts`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/youtube-to-mp3-converter`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-facebook-videos-iphone-android`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/best-instagram-video-downloaders`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/instagram-reel-download-vs-screen-recording`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/is-it-legal-to-download-youtube-videos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-pinterest-videos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-youtube-playlists`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/download-instagram-photos-full-quality`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },

        // Legal pages
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/cookie-policy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/dmca`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/disclaimer`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/accessibility`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
