import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy – SaveMyReel",
    description:
        "Read SaveMyReel's privacy policy. We value your privacy and are transparent about how we collect, use, and protect your data when using our free video downloader.",
    keywords: [
        "SaveMyReel privacy policy", "video downloader privacy",
        "data protection", "user privacy",
    ],
    alternates: { canonical: "https://savemyreel.online/privacy-policy" },
    openGraph: {
        title: "Privacy Policy – SaveMyReel",
        description: "How SaveMyReel collects, uses, and protects your data.",
    },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
