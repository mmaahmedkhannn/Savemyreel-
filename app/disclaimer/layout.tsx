import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer – SaveMyReel",
    description:
        "Read SaveMyReel's disclaimer. SaveMyReel is not affiliated with Instagram, TikTok, Facebook, or X. We do not host media content on our servers.",
    keywords: [
        "SaveMyReel disclaimer", "legal disclaimer",
        "video downloader disclaimer", "not affiliated",
    ],
    alternates: { canonical: "https://savemyreel.online/disclaimer" },
    openGraph: {
        title: "Disclaimer – SaveMyReel",
        description: "Legal disclaimer for using the SaveMyReel video downloader.",
    },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
    return children;
}
