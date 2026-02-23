import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "Twitter/X Video Downloader – Download Tweets, Videos & GIFs Free",
    description: "Download Twitter (X) videos and GIFs for free in HD quality. Save video tweets to your phone or computer instantly. No login, no app required. Works with twitter.com and x.com links.",
    keywords: [
        "twitter video downloader", "download twitter videos", "save twitter videos",
        "twitter gif downloader", "download x videos", "x video downloader",
        "twitter video to mp4", "save tweets video", "download twitter gif",
        "free twitter video downloader", "twitter HD video download",
        "how to download twitter videos", "x.com video downloader", "download tweet video",
        "twitter video saver", "twitter media downloader", "save x video",
        "download x.com video online", "twitter video download online free",
    ],
    alternates: { canonical: `${SITE_URL}/twitter-downloader` },
    openGraph: {
        title: "Twitter/X Video Downloader – Save Videos & GIFs Free | SaveMyReel",
        description: "Download Twitter and X videos and GIFs in HD. Free, no login required.",
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Twitter/X Videos",
    "description": "Save Twitter and X videos to your device using SaveMyReel free online downloader",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Copy the tweet URL", "text": "Open Twitter/X, find the tweet with the video, tap Share and select 'Copy link'." },
        { "@type": "HowToStep", "position": 2, "name": "Paste into SaveMyReel", "text": "Go to savemyreel.online, select X (Twitter), and paste the copied URL." },
        { "@type": "HowToStep", "position": 3, "name": "Download the video", "text": "Click Download. Your Twitter video or GIF will be saved in HD quality." }
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do x.com links work?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! SaveMyReel supports both the old twitter.com URLs and the new x.com URLs. Both work identically." }
        },
        {
            "@type": "Question",
            "name": "Can I download Twitter Spaces or audio?",
            "acceptedAnswer": { "@type": "Answer", "text": "Currently, SaveMyReel focuses on video and GIF downloads from tweets. Twitter Spaces audio is not supported at this time." }
        },
        {
            "@type": "Question",
            "name": "Why is the GIF saved as an MP4 file?",
            "acceptedAnswer": { "@type": "Answer", "text": "Twitter internally converts all GIFs to MP4 video format. We download the original MP4 file, which maintains full quality and plays on all devices." }
        }
    ]
};

export default function TwitterDownloader() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Twitter / X Video Downloader</h1>
                <p className={styles.pageSubtitle}>Download videos and GIFs from Twitter (X) in HD quality — 100% free</p>

                <div className={styles.pageContent}>
                    <section className={styles.section} style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #1DA1F2, #0d8bd9)", color: "white", borderRadius: "12px", fontWeight: "bold", fontSize: "1.125rem", textDecoration: "none" }}>
                            𝕏 Download Twitter Videos Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download Twitter/X Videos</h2>
                        <p>SaveMyReel lets you download any public video or GIF from Twitter (now X) in seconds. Follow these steps:</p>
                        <StepGuide platform="twitter" />
                    </section>

                    <section className={styles.section}>
                        <h2>What Can You Download from Twitter/X?</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎬 Tweet Videos</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download video tweets from public accounts in HD quality (MP4).</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎭 GIFs</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save Twitter GIFs as MP4 video files — maintaining full quality and animation.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>📱 X.com Videos</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Works with both twitter.com and x.com URLs — the rebranded platform.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🔄 Retweet Videos</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download videos from retweets and quoted tweets with embedded media.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Use SaveMyReel for Twitter/X Downloads?</h2>
                        <ul>
                            <li><strong>Both URLs supported:</strong> Works with twitter.com and x.com links</li>
                            <li><strong>HD quality:</strong> Download Twitter videos in their original resolution</li>
                            <li><strong>GIF support:</strong> Save Twitter GIFs as high-quality MP4 files</li>
                            <li><strong>No login needed:</strong> No Twitter/X account or registration required</li>
                            <li><strong>Mobile friendly:</strong> Works on iPhone, Android, and desktop browsers</li>
                            <li><strong>Instant downloads:</strong> Videos processed and ready in seconds</li>
                            <li><strong>100% free:</strong> No limits, no fees, no subscriptions</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Twitter Video Downloader FAQ</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <h3>Do x.com links work?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! SaveMyReel supports both the old twitter.com URLs and the new x.com URLs. Both work identically.</p>
                            </div>
                            <div>
                                <h3>Can I download Twitter Spaces or audio?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Currently, SaveMyReel focuses on video and GIF downloads from tweets. Twitter Spaces audio is not supported at this time.</p>
                            </div>
                            <div>
                                <h3>Why is the GIF saved as an MP4 file?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Twitter internally converts all GIFs to MP4 video format. We download the original MP4 file, which maintains full quality and plays on all devices.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Save Twitter Videos Instantly</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Free, fast, no registration. Download video tweets and GIFs today.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download Twitter Videos Now →
                        </Link>
                        <p style={{ marginTop: "1.5rem", color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>
                            Also try: <Link href="/instagram-downloader" style={{ color: "var(--primary)" }}>Instagram Downloader</Link> · <Link href="/tiktok-downloader" style={{ color: "var(--primary)" }}>TikTok Downloader</Link> · <Link href="/facebook-downloader" style={{ color: "var(--primary)" }}>Facebook Downloader</Link> · <Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader</Link>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
