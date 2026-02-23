import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQContent from "./FAQContent";
import { Metadata } from "next";

const SITE_URL = "https://savemyreel.online";

const faqData = [
    {
        category: "Getting Started",
        question: "How do I download a video from Instagram, TikTok, Facebook, or X?",
        answer: "Simply copy the URL of the post, reel, or video you want to download, paste it into the SaveMyReel input field on our homepage, and click the Download button. Your video will be processed and download options will appear instantly."
    },
    {
        category: "Getting Started",
        question: "Is SaveMyReel free to use?",
        answer: "Yes! SaveMyReel is completely free to use with no hidden fees. We sustain our service through non-intrusive advertisements. There are no premium subscriptions required."
    },
    {
        category: "Getting Started",
        question: "Do I need to create an account or install an app?",
        answer: "No account or app installation is needed. SaveMyReel works directly in your web browser on any device — iPhone, Android, iPad, Windows, or Mac. Just paste your link and download."
    },
    {
        category: "Features",
        question: "What platforms does SaveMyReel support?",
        answer: "We support Instagram (posts, reels, carousel images, stories, IGTV), Facebook (videos, reels), TikTok (videos without watermark), and X/Twitter (videos, GIFs). We are constantly working to add more platforms."
    },
    {
        category: "Features",
        question: "Can I download videos in HD quality?",
        answer: "Yes! SaveMyReel fetches the highest quality version available from the source platform — up to 1080p and 4K. The quality depends on the original upload, but we always deliver the best available resolution."
    },
    {
        category: "Features",
        question: "Can I download TikTok videos without the watermark?",
        answer: "Yes, our TikTok downloader removes the watermark from videos whenever possible, giving you clean, watermark-free downloads in HD quality."
    },
    {
        category: "Features",
        question: "Can I download Instagram carousel posts (multiple photos)?",
        answer: "Yes! SaveMyReel fully supports Instagram carousel posts. When you paste a carousel URL, all images and videos from the post will be shown and you can download them individually or all at once."
    },
    {
        category: "Features",
        question: "Can I download private videos or stories?",
        answer: "No, SaveMyReel can only download publicly available content. Private accounts, restricted content, and expired stories cannot be downloaded."
    },
    {
        category: "Legal & Safety",
        question: "Is it legal to download videos from social media?",
        answer: "Downloading publicly available content for personal use is generally acceptable. However, you should respect copyright laws and content creators' rights. Do not redistribute or sell downloaded content without permission from the original creator."
    },
    {
        category: "Legal & Safety",
        question: "Is SaveMyReel safe to use?",
        answer: "Absolutely! SaveMyReel is 100% safe. We don't require any software downloads, browser extensions, or installations. We don't store your personal data, URLs, or downloaded content. All processing happens securely in real-time."
    },
    {
        category: "Legal & Safety",
        question: "Do you store my downloaded videos?",
        answer: "No, we never store videos or media on our servers. Content is fetched directly from the source platform and streamed to your device. Once you close the page, there's no trace of your activity."
    },
    {
        category: "Troubleshooting",
        question: "Why am I getting an error when trying to download?",
        answer: "Common reasons include: incorrect URL, private or deleted content, temporary platform restrictions, or unsupported content type. Try copying the URL again from the original post and ensure it's from a public account."
    },
    {
        category: "Troubleshooting",
        question: "The download is slow. What can I do?",
        answer: "Download speed depends on your internet connection and the source platform's servers. Try downloading during off-peak hours or check your internet connection. If the issue persists, try again in a few minutes."
    },
    {
        category: "Troubleshooting",
        question: "The video has no sound after downloading.",
        answer: "Some platforms serve video and audio separately. Try using a media player like VLC to play the file. If the issue persists, try downloading again or verify the original video has audio."
    },
    {
        category: "Troubleshooting",
        question: "Why can't I download Instagram stories?",
        answer: "Instagram stories can only be downloaded if they're from a public account and haven't expired (stories disappear after 24 hours). SaveMyReel cannot access stories from private accounts."
    }
];

// JSON-LD FAQ Schema for Google Rich Snippets
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
        }
    }))
};

export const metadata: Metadata = {
    title: "FAQ – Frequently Asked Questions About SaveMyReel Video Downloader",
    description: "Find answers to common questions about SaveMyReel. Learn how to download Instagram Reels, TikTok videos, Facebook clips, and X(Twitter) media for free in HD quality.",
    alternates: {
        canonical: `${SITE_URL}/faq`,
    },
    openGraph: {
        title: "FAQ – SaveMyReel Video Downloader Help & Support",
        description: "Get answers about downloading videos from Instagram, TikTok, Facebook and X. Troubleshooting, features, and safety information.",
    },
};

export default function FAQ() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Navbar />
            <FAQContent faqData={faqData} />
            <Footer />
        </main>
    );
}
