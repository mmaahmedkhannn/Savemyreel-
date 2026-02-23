import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us – SaveMyReel Support & Help",
    description:
        "Have questions or need help? Contact the SaveMyReel team for support, legal inquiries, or partnership requests. We're here to help.",
    keywords: [
        "contact SaveMyReel", "video downloader support", "SaveMyReel help",
        "SaveMyReel customer service", "contact us",
    ],
    alternates: { canonical: "https://savemyreel.online/contact" },
    openGraph: {
        title: "Contact Us – SaveMyReel Support",
        description: "Reach out to the SaveMyReel team for support, legal inquiries, or partnerships.",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
