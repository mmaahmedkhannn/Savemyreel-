import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "Facebook Video Downloader – Download FB Videos & Reels Free",
    description: "Download Facebook videos and Reels for free in HD quality. Save FB videos to your phone or computer instantly. No login, no software needed. Works with public Facebook pages and profiles.",
    keywords: [
        "facebook video downloader", "download facebook videos", "save facebook videos",
        "facebook reel downloader", "download fb videos", "fb video saver",
        "facebook video download online", "download facebook reels", "facebook video to mp4",
        "free facebook video downloader", "save fb videos to phone",
        "how to download facebook videos", "facebook HD video download",
        "facebook downloader", "fb downloader", "facebook video download",
        "save fb reels", "download facebook video online free", "fb video downloader online",
    ],
    alternates: { canonical: `${SITE_URL}/facebook-downloader` },
    openGraph: {
        title: "Facebook Video Downloader – Save FB Videos & Reels Free | SaveMyReel",
        description: "Download Facebook videos and Reels in HD quality. Free, no login required.",
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Facebook Videos",
    "description": "Save Facebook videos to your device using SaveMyReel free online downloader",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Copy the Facebook video URL", "text": "Open Facebook, find the video you want, click the three dots (...) and select 'Copy Link'." },
        { "@type": "HowToStep", "position": 2, "name": "Paste into SaveMyReel", "text": "Go to savemyreel.online, select Facebook, and paste the copied URL into the input field." },
        { "@type": "HowToStep", "position": 3, "name": "Download the video", "text": "Click Download. Your Facebook video will be saved in HD quality to your device." }
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I download videos from private Facebook groups?",
            "acceptedAnswer": { "@type": "Answer", "text": "No, SaveMyReel can only download videos from public Facebook pages, profiles, and groups. Content from private groups is not accessible." }
        },
        {
            "@type": "Question",
            "name": "Why can't I download some Facebook videos?",
            "acceptedAnswer": { "@type": "Answer", "text": "Some videos may be protected or restricted by the uploader. If a video is from a private account or has download restrictions, it cannot be saved." }
        }
    ]
};

export default function FacebookDownloader() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Facebook Video Downloader</h1>
                <p className={styles.pageSubtitle}>Download Facebook videos and Reels in HD quality — 100% free</p>

                <div className={styles.pageContent}>
                    <section className={styles.section} style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #1877F2, #42A5F5)", color: "white", borderRadius: "12px", fontWeight: "bold", fontSize: "1.125rem", textDecoration: "none" }}>
                            📘 Download Facebook Videos Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download Facebook Videos</h2>
                        <p>SaveMyReel makes it simple to download any public Facebook video or Reel. Follow these steps:</p>
                        <StepGuide platform="facebook" />
                    </section>

                    <section className={styles.section}>
                        <h2>What Can You Download from Facebook?</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎬 Facebook Videos</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download regular video posts from public pages and profiles in HD.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎞️ Facebook Reels</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save Facebook Reels — the short-form video format — to your device.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>📺 Live Replays</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download recorded Facebook Live sessions after the broadcast ends.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>📎 Shared Videos</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save videos shared from other pages, groups, and profiles.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Use SaveMyReel for Facebook Downloads?</h2>
                        <ul>
                            <li><strong>HD quality:</strong> Download Facebook videos in the highest available resolution</li>
                            <li><strong>All video types:</strong> Works with regular posts, Reels, live replays, and shared content</li>
                            <li><strong>MP4 format:</strong> Videos saved as MP4 files — compatible with all devices</li>
                            <li><strong>No Facebook login:</strong> You don&apos;t need to log into Facebook to download</li>
                            <li><strong>Mobile friendly:</strong> Works perfectly on iPhone, Android, and desktop browsers</li>
                            <li><strong>Free forever:</strong> Unlimited downloads with no hidden fees</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Facebook Video Downloader FAQ</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <h3>Can I download videos from private Facebook groups?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>No, SaveMyReel can only download videos from public Facebook pages, profiles, and groups. Content from private groups is not accessible.</p>
                            </div>
                            <div>
                                <h3>Why can&apos;t I download some Facebook videos?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Some videos may be protected or restricted by the uploader. If a video is from a private account or has download restrictions, it cannot be saved.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Save Facebook Videos to Your Device</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Free, fast, no registration. Start downloading Facebook videos now.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download Facebook Videos Now →
                        </Link>
                        <p style={{ marginTop: "1.5rem", color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>
                            Also try: <Link href="/instagram-downloader" style={{ color: "var(--primary)" }}>Instagram Downloader</Link> · <Link href="/tiktok-downloader" style={{ color: "var(--primary)" }}>TikTok Downloader</Link> · <Link href="/twitter-downloader" style={{ color: "var(--primary)" }}>Twitter Downloader</Link> · <Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader</Link>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
