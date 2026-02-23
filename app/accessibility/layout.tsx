import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accessibility Statement – SaveMyReel",
    description:
        "SaveMyReel is committed to digital accessibility. Learn about our efforts to make our free video downloader accessible to all users, including those with disabilities.",
    keywords: [
        "SaveMyReel accessibility", "accessibility statement",
        "WCAG compliance", "accessible video downloader",
    ],
    alternates: { canonical: "https://savemyreel.online/accessibility" },
    openGraph: {
        title: "Accessibility Statement – SaveMyReel",
        description: "Our commitment to making SaveMyReel accessible to all users.",
    },
};

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
    return children;
}
