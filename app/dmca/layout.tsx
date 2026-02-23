import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DMCA Policy – SaveMyReel",
    description:
        "SaveMyReel respects intellectual property rights. Read our DMCA policy and learn how to submit a takedown notice if your content is being infringed.",
    keywords: [
        "SaveMyReel DMCA", "DMCA takedown", "copyright notice",
        "intellectual property", "content removal",
    ],
    alternates: { canonical: "https://savemyreel.online/dmca" },
    openGraph: {
        title: "DMCA Policy – SaveMyReel",
        description: "How to file a DMCA takedown notice with SaveMyReel.",
    },
};

export default function DmcaLayout({ children }: { children: React.ReactNode }) {
    return children;
}
