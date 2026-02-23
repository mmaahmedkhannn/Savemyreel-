import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy – SaveMyReel",
    description:
        "Learn how SaveMyReel uses cookies to improve your experience on our free video downloader. Manage your cookie preferences here.",
    keywords: [
        "SaveMyReel cookie policy", "cookies", "cookie settings",
        "website cookies", "cookie preferences",
    ],
    alternates: { canonical: "https://savemyreel.online/cookie-policy" },
    openGraph: {
        title: "Cookie Policy – SaveMyReel",
        description: "How SaveMyReel uses cookies on our video downloader platform.",
    },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
