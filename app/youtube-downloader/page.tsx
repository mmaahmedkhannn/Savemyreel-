import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "YouTube Video Downloader – Free HD MP4 Download Online",
    description: "Download YouTube videos for free in HD, 1080p, 4K quality. Convert YouTube to MP4 or MP3 instantly. No app needed, no login required. Works on all devices.",
    keywords: [
        // Primary targets
        "youtube downloader", "free youtube video downloader online", "download youtube video",
        "youtube video download online", "youtube 1080p download", "youtube to mp4 hd",
        // Supporting targets
        "youtube to mp4", "youtube to mp3", "youtube mp4 download",
        "free youtube downloader", "download youtube videos free", "youtube HD download",
        "save youtube video", "youtube 4K download", "youtube converter",
        "youtube downloader online", "youtube video saver", "download youtube mp4 free",
        "youtube audio download", "youtube music download", "youtube to mp3 converter",
        "download youtube video HD", "youtube download no app",
    ],
    alternates: { canonical: `${SITE_URL}/youtube-downloader` },
    openGraph: {
        title: "YouTube Downloader – Free HD MP4 & MP3 | SaveMyReel",
        description: "Download YouTube videos in HD, 1080p, 4K. Convert to MP4 or MP3. Free, fast, no login.",
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download YouTube Videos",
    "description": "Save YouTube videos using SaveMyReel free online downloader",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Copy the YouTube link", "text": "Open YouTube, find the video you want to download, and copy its URL from the address bar or Share button." },
        { "@type": "HowToStep", "position": 2, "name": "Paste into SaveMyReel", "text": "Go to savemyreel.online, select YouTube, and paste the copied URL." },
        { "@type": "HowToStep", "position": 3, "name": "Choose quality & download", "text": "Select your preferred quality (360p, 720p, 1080p, 4K) or audio-only, then click Download." }
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I download YouTube videos on iPhone?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! SaveMyReel works on iPhone through Safari or any other browser. Just copy the YouTube link, paste it on our site, choose your quality, and download." }
        },
        {
            "@type": "Question",
            "name": "Is it free to download YouTube videos?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. SaveMyReel is 100% free — no premium plans, no hidden fees. Download unlimited YouTube videos at no cost." }
        },
        {
            "@type": "Question",
            "name": "Can I download YouTube Shorts?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! YouTube Shorts are fully supported. Just paste the Shorts URL and download it like any other video." }
        },
        {
            "@type": "Question",
            "name": "What qualities are available?",
            "acceptedAnswer": { "@type": "Answer", "text": "We offer 360p, 480p, 720p HD, 1080p Full HD, and 4K (when available). You can also extract audio only." }
        },
        {
            "@type": "Question",
            "name": "Can I download private YouTube videos?",
            "acceptedAnswer": { "@type": "Answer", "text": "No, our YouTube downloader only works with publicly available YouTube content. Private or unlisted videos cannot be accessed." }
        }
    ]
};

export default function YouTubeDownloader() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>YouTube Video Downloader</h1>
                <p className={styles.pageSubtitle}>Download YouTube videos in HD, 1080p, or 4K — or save audio as MP3</p>

                <div className={styles.pageContent}>
                    <section className={styles.section} style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #FF0000, #CC0000, #282828)", color: "white", borderRadius: "12px", fontWeight: "bold", fontSize: "1.125rem", textDecoration: "none" }}>
                            ▶️ Download YouTube Videos Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download YouTube Videos</h2>
                        <p>SaveMyReel is the easiest way to download YouTube videos online. Follow these simple steps:</p>
                        <StepGuide platform="youtube" />
                    </section>

                    <section className={styles.section}>
                        <h2>Why Use SaveMyReel YouTube Downloader?</h2>
                        <ul>
                            <li><strong>Multiple quality options:</strong> Download in 360p, 480p, 720p, 1080p, or 4K — choose the quality that fits your needs</li>
                            <li><strong>Audio download:</strong> Extract audio from YouTube videos and save as high-quality audio files</li>
                            <li><strong>MP4 format:</strong> Videos are saved as MP4 files compatible with all devices and players</li>
                            <li><strong>No app needed:</strong> Works directly in your browser on iPhone, Android, and desktop</li>
                            <li><strong>No login required:</strong> No YouTube account or SaveMyReel registration needed</li>
                            <li><strong>Unlimited downloads:</strong> Download as many YouTube videos as you want, completely free</li>
                            <li><strong>Fast processing:</strong> Videos are processed and ready to download in seconds</li>
                            <li><strong>All devices:</strong> Works on Windows, Mac, iPhone, Android, and any modern browser</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Supported YouTube Content</h2>
                        <ul>
                            <li><strong>Regular videos:</strong> Download any public YouTube video in HD quality</li>
                            <li><strong>YouTube Shorts:</strong> Save YouTube Shorts just like regular videos</li>
                            <li><strong>Music videos:</strong> Download music videos or extract audio only</li>
                            <li><strong>Tutorials &amp; vlogs:</strong> Save educational content for offline viewing</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>YouTube Downloader FAQ</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <h3>Can I download YouTube videos on iPhone?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! SaveMyReel works on iPhone through Safari or any other browser. Just copy the YouTube link, paste it on our site, choose your quality, and download.</p>
                            </div>
                            <div>
                                <h3>Is it free to download YouTube videos?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Absolutely. SaveMyReel is 100% free — no premium plans, no hidden fees. Download unlimited YouTube videos at no cost.</p>
                            </div>
                            <div>
                                <h3>Can I download YouTube Shorts?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! YouTube Shorts are fully supported. Just paste the Shorts URL and download it like any other video.</p>
                            </div>
                            <div>
                                <h3>What qualities are available?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>We offer 360p, 480p, 720p HD, 1080p Full HD, and 4K (when available). You can also extract audio only.</p>
                            </div>
                            <div>
                                <h3>Can I download private YouTube videos?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>No, our YouTube downloader only works with publicly available YouTube content. Private or unlisted videos cannot be accessed.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Download YouTube Videos for Free</h2>
                        <p style={{ marginBottom: "1.5rem" }}>No registration, no app, multiple quality options. Just paste and download.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Start Downloading YouTube Videos →
                        </Link>
                        <p style={{ marginTop: "1.5rem", color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>
                            Also try: <Link href="/instagram-downloader" style={{ color: "var(--primary)" }}>Instagram Downloader</Link> · <Link href="/tiktok-downloader" style={{ color: "var(--primary)" }}>TikTok Downloader</Link> · <Link href="/facebook-downloader" style={{ color: "var(--primary)" }}>Facebook Downloader</Link> · <Link href="/twitter-downloader" style={{ color: "var(--primary)" }}>Twitter Downloader</Link>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
