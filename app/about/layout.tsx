import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About SaveMyReel – Free Social Media Video Downloader",
    description:
        "Learn about SaveMyReel – a 100% free online tool to download videos, reels, and photos from Instagram, TikTok, Facebook & X. No app, no watermark, no login needed.",
    keywords: [
        "about SaveMyReel", "free video downloader", "social media video downloader",
        "online video saver", "download reels free", "about us",
    ],
    alternates: { canonical: "https://savemyreel.online/about" },
    openGraph: {
        title: "About SaveMyReel – Free Social Media Video Downloader",
        description: "Learn about SaveMyReel – a 100% free tool to download videos from Instagram, TikTok, Facebook & Twitter.",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
