import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "Instagram Video Downloader – Download HD Reels & Stories Free",
    description: "Download Instagram Reels, videos, photos, and carousel posts for free in HD quality. No watermark, no login, no app needed. Save Instagram content instantly.",
    keywords: [
        // Primary targets
        "instagram video downloader", "download instagram reels", "instagram downloader",
        "save instagram videos", "download insta videos hd", "download instagram reels without watermark",
        // Supporting targets
        "instagram reel downloader", "instagram photo downloader", "instagram carousel downloader",
        "instagram story downloader", "instagram video download online", "save instagram reels to phone",
        "how to download instagram reels", "free instagram downloader", "instagram HD download",
        "download IG reels", "instagram reels to mp4", "instagram reels saver", "download reels instagram",
        "save instagram reels", "instagram video saver", "insta reel download",
        "instagram content downloader", "save IG stories", "instagram downloader online free",
    ],
    alternates: { canonical: `${SITE_URL}/instagram-downloader` },
    openGraph: {
        title: "Instagram Downloader – Save Reels, Videos & Photos Free | SaveMyReel",
        description: "Free online Instagram downloader. Download Reels, posts, carousels, and stories in HD. No watermark, no login required.",
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Instagram Videos and Reels",
    "description": "Download any Instagram video, reel, or photo for free using SaveMyReel",
    "step": [
        {
            "@type": "HowToStep",
            "position": 1,
            "name": "Copy the Instagram URL",
            "text": "Open Instagram, find the reel or post you want to download, tap the three dots (...) and select 'Copy Link'."
        },
        {
            "@type": "HowToStep",
            "position": 2,
            "name": "Paste into SaveMyReel",
            "text": "Go to savemyreel.online, select Instagram, and paste the copied URL into the input field."
        },
        {
            "@type": "HowToStep",
            "position": 3,
            "name": "Download your content",
            "text": "Click the Download button. Your video or photo will be processed and download options will appear. Click to save to your device."
        }
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I download private Instagram posts?",
            "acceptedAnswer": { "@type": "Answer", "text": "No, SaveMyReel can only download content from public Instagram accounts. Private posts require authentication which we do not support for privacy and security reasons." }
        },
        {
            "@type": "Question",
            "name": "Is it legal to download Instagram content?",
            "acceptedAnswer": { "@type": "Answer", "text": "Downloading publicly available content for personal use is generally acceptable. Always credit original creators and never redistribute downloaded content for commercial purposes without permission." }
        },
        {
            "@type": "Question",
            "name": "Can I download Instagram Stories?",
            "acceptedAnswer": { "@type": "Answer", "text": "Instagram Stories from public accounts can sometimes be downloaded if they haven't expired (stories disappear after 24 hours). Results may vary based on availability." }
        }
    ]
};

export default function InstagramDownloader() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }}
            />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Instagram Video Downloader</h1>
                <p className={styles.pageSubtitle}>
                    Download Instagram Reels, videos, photos, and carousel posts for free in HD quality
                </p>

                <div className={styles.pageContent}>
                    <section className={styles.section} style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Link
                            href="/"
                            style={{
                                display: "inline-block",
                                padding: "1rem 2.5rem",
                                background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                                color: "white",
                                borderRadius: "12px",
                                fontWeight: "bold",
                                fontSize: "1.125rem",
                                textDecoration: "none",
                                transition: "all 0.3s ease"
                            }}
                        >
                            📸 Start Downloading Instagram Content →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download Instagram Reels and Videos</h2>
                        <p>
                            SaveMyReel makes it incredibly easy to download Instagram content. Whether you want to save an Instagram Reel,
                            download a video from a post, or save all images from a carousel — our free Instagram downloader handles it all.
                        </p>
                        <StepGuide platform="instagram" />
                    </section>

                    <section className={styles.section}>
                        <h2>What Can You Download from Instagram?</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎬 Instagram Reels</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download any public Instagram Reel in full HD quality without watermarks.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>📷 Photos & Posts</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save single images from posts in their original resolution and quality.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎠 Carousel Posts</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download all images and videos from carousel posts — individually or all at once.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>📹 IGTV Videos</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save longer-form IGTV content directly to your device for offline viewing.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Use SaveMyReel for Instagram Downloads?</h2>
                        <ul>
                            <li><strong>No watermark:</strong> Download Instagram Reels and videos without any watermark overlay</li>
                            <li><strong>HD quality:</strong> We always fetch the highest available quality — up to 1080p</li>
                            <li><strong>Carousel support:</strong> Full support for multi-image and multi-video carousel posts</li>
                            <li><strong>No login required:</strong> You don&apos;t need to log in to Instagram or create any account</li>
                            <li><strong>Works on all devices:</strong> iPhone, Android, iPad, Windows, Mac — any browser works</li>
                            <li><strong>100% free:</strong> No hidden fees, premium plans, or subscription requirements</li>
                            <li><strong>Private &amp; secure:</strong> We never store your data, URLs, or downloaded content</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Frequently Asked Questions — Instagram Downloader</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <h3>Can I download private Instagram posts?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>No, SaveMyReel can only download content from public Instagram accounts. Private posts require authentication which we do not support for privacy and security reasons.</p>
                            </div>
                            <div>
                                <h3>Is it legal to download Instagram content?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Downloading publicly available content for personal use is generally acceptable. Always credit original creators and never redistribute downloaded content for commercial purposes without permission.</p>
                            </div>
                            <div>
                                <h3>Can I download Instagram Stories?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Instagram Stories from public accounts can sometimes be downloaded if they haven&apos;t expired (stories disappear after 24 hours). Results may vary based on availability.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Ready to Download Instagram Reels?</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Free, fast, and no registration needed. Start saving your favorite Instagram content now.</p>
                        <Link
                            href="/"
                            style={{
                                display: "inline-block",
                                padding: "1rem 2rem",
                                background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)",
                                color: "white",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            Download Instagram Videos Now →
                        </Link>
                        <p style={{ marginTop: "1.5rem", color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>
                            Also try: <Link href="/tiktok-downloader" style={{ color: "var(--primary)" }}>TikTok Downloader</Link> · <Link href="/facebook-downloader" style={{ color: "var(--primary)" }}>Facebook Downloader</Link> · <Link href="/twitter-downloader" style={{ color: "var(--primary)" }}>Twitter Downloader</Link> · <Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader</Link>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
