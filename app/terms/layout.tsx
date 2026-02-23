import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service – SaveMyReel",
    description:
        "Review SaveMyReel's terms of service. Understand the rules and guidelines for using our free online video downloader for Instagram, TikTok, Facebook & X.",
    keywords: [
        "SaveMyReel terms of service", "terms and conditions",
        "video downloader terms", "usage policy",
    ],
    alternates: { canonical: "https://savemyreel.online/terms" },
    openGraph: {
        title: "Terms of Service – SaveMyReel",
        description: "Terms and conditions for using SaveMyReel's free video downloader.",
    },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
