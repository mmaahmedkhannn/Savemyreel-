import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "How to Download YouTube Videos in 2026 – Free HD & MP4 Guide",
    description: "Learn how to download YouTube videos for free in HD, 1080p, or 4K quality. Save YouTube to MP4 or extract audio. Step-by-step guide for iPhone, Android & PC. No app needed.",
    keywords: [
        "how to download youtube videos", "download youtube video", "youtube to mp4",
        "save youtube video", "youtube video download", "download youtube videos free",
        "youtube downloader online", "how to save youtube videos to phone",
        "download youtube video HD", "youtube to mp4 converter free",
        "youtube download no app", "download youtube shorts", "save youtube video to phone",
        "youtube video download 2026", "best youtube downloader free",
    ],
    alternates: { canonical: `${SITE_URL}/blog/download-youtube-videos` },
    openGraph: {
        title: "How to Download YouTube Videos in 2026 – Complete Free Guide",
        description: "Free step-by-step guide to downloading YouTube videos in HD. Works on iPhone, Android & PC.",
        type: "article",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Download YouTube Videos in 2026 – Free HD Guide",
    "description": "Learn how to download YouTube videos for free in HD quality",
    "author": { "@type": "Organization", "name": "SaveMyReel" },
    "publisher": { "@type": "Organization", "name": "SaveMyReel", "url": SITE_URL },
    "datePublished": "2026-02-23",
    "dateModified": "2026-02-23",
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download YouTube Videos Using SaveMyReel",
    "description": "Step-by-step guide to download YouTube videos for free",
    "totalTime": "PT1M",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Find the YouTube video", "text": "Open YouTube and navigate to the video you want to download. Copy the URL from the address bar or tap the Share button and select 'Copy link'." },
        { "@type": "HowToStep", "position": 2, "name": "Open SaveMyReel", "text": "Go to savemyreel.online in your browser and select the YouTube tab." },
        { "@type": "HowToStep", "position": 3, "name": "Paste and download", "text": "Paste the copied YouTube URL into the input field and click the Download button. Choose your preferred quality (360p, 720p, 1080p, or 4K) and save to your device." },
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Is it legal to download YouTube videos?",
            "acceptedAnswer": { "@type": "Answer", "text": "Downloading YouTube videos for personal, offline viewing is generally acceptable for content that is publicly available. However, redistributing or using downloaded content commercially without permission violates copyright law. Always respect creators' rights." }
        },
        {
            "@type": "Question",
            "name": "Can I download YouTube videos on iPhone without an app?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! SaveMyReel works directly in Safari or any iPhone browser. No app installation needed. Just copy the YouTube link, paste it at savemyreel.online, and download." }
        },
        {
            "@type": "Question",
            "name": "What video quality options are available?",
            "acceptedAnswer": { "@type": "Answer", "text": "SaveMyReel offers multiple quality options: 360p, 480p, 720p HD, 1080p Full HD, and 4K (when the original video was uploaded in 4K). You can also extract audio-only." }
        },
        {
            "@type": "Question",
            "name": "Can I download YouTube Shorts?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! YouTube Shorts are fully supported. Just copy the Shorts URL and paste it into SaveMyReel — it works exactly like downloading a regular YouTube video." }
        },
    ]
};

export default function DownloadYouTubeVideos() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <div className={styles.pageContent} style={{ maxWidth: "800px" }}>
                    <p style={{ marginBottom: "0.5rem" }}>
                        <Link href="/blog" style={{ color: "var(--primary)", textDecoration: "none" }}>← Back to Blog</Link>
                    </p>
                    <h1 className={styles.pageTitle} style={{ textAlign: "left" }}>How to Download YouTube Videos in 2026</h1>
                    <p style={{ color: "var(--secondary-foreground)", marginBottom: "2rem" }}>Complete guide to saving YouTube videos in HD, 1080p, and 4K — Free, no app needed</p>

                    <section className={styles.section}>
                        <p>
                            YouTube is the world&apos;s largest video platform with billions of videos. Whether you need to save a tutorial for offline study,
                            keep a music video for your collection, or archive important content, downloading YouTube videos is simple with the right tool.
                        </p>
                        <p>
                            In this guide, we&apos;ll show you how to <strong>download YouTube videos for free</strong> using SaveMyReel — the fastest
                            and safest online YouTube downloader that works on any device.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Method 1: Using SaveMyReel (Recommended)</h2>
                        <p>The easiest way to download YouTube videos is with <Link href="/" style={{ color: "var(--primary)" }}>SaveMyReel</Link>. It&apos;s free, requires no app, and works on iPhone, Android, and desktop.</p>

                        <h3>Step 1: Copy the YouTube Video URL</h3>
                        <p>Open YouTube and find the video you want to download. Copy the URL from your browser&apos;s address bar, or tap the <strong>Share</strong> button and select <strong>&quot;Copy link&quot;</strong>.</p>

                        <h3>Step 2: Paste into SaveMyReel</h3>
                        <p>Open your browser and go to <Link href="/" style={{ color: "var(--primary)" }}>savemyreel.online</Link>. Select the <strong>YouTube</strong> tab and paste the copied URL into the input field.</p>

                        <h3>Step 3: Choose Quality & Download</h3>
                        <p>Click the <strong>Download</strong> button. SaveMyReel will process the video and offer you quality options — from 360p to 4K. Select your preferred quality and save the video to your device.</p>

                        <div style={{ padding: "1.25rem", background: "rgba(139, 92, 246, 0.1)", borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.3)", marginTop: "1.5rem" }}>
                            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>💡 Pro Tip:</p>
                            <p style={{ color: "var(--secondary-foreground)" }}>SaveMyReel also supports YouTube Shorts! Just copy the Shorts URL and paste it like any regular YouTube link. Works identically.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>What Types of YouTube Content Can You Download?</h2>
                        <ul>
                            <li><strong>Regular videos:</strong> Any public YouTube video in HD, 1080p, or 4K quality</li>
                            <li><strong>YouTube Shorts:</strong> Short-form vertical videos — download just like regular videos</li>
                            <li><strong>Music videos:</strong> Save music videos or extract audio for offline listening</li>
                            <li><strong>Tutorials & educational content:</strong> Perfect for offline study and reference</li>
                            <li><strong>Vlogs & entertainment:</strong> Keep your favorite content for offline viewing</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Method 2: YouTube Premium (Paid)</h2>
                        <p>YouTube offers an official download feature through <strong>YouTube Premium</strong> ($13.99/month). This lets you download videos within the YouTube app for offline viewing.</p>
                        <p>However, downloads are restricted to the YouTube app and expire after 30 days. You can&apos;t save them as MP4 files or transfer them to other devices. <strong>SaveMyReel gives you permanent MP4 downloads for free.</strong></p>
                    </section>

                    <section className={styles.section}>
                        <h2>FAQ — Downloading YouTube Videos</h2>

                        <h3>Is it legal to download YouTube videos?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Downloading YouTube videos for personal, offline viewing is generally acceptable for publicly available content. However, redistributing or using downloaded content commercially without permission violates copyright law. Always respect creators&apos; rights.</p>

                        <h3>Can I download YouTube videos on iPhone without an app?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Yes! SaveMyReel works directly in Safari or any iPhone browser. No app installation needed. Just copy the YouTube link, paste it, and download.</p>

                        <h3>What quality options are available?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>We offer 360p, 480p, 720p HD, 1080p Full HD, and 4K (when the original video supports it). You can also extract audio only.</p>

                        <h3>Can I download YouTube Shorts?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Yes! YouTube Shorts are fully supported. Copy the Shorts URL and paste it into SaveMyReel — it works exactly like a regular YouTube video.</p>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Ready to Download YouTube Videos?</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Try SaveMyReel now — it&apos;s free, fast, and requires no registration.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download YouTube Videos Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h3>Related Guides</h3>
                        <ul>
                            <li><Link href="/blog/how-to-download-instagram-reels" style={{ color: "var(--primary)" }}>How to Download Instagram Reels</Link></li>
                            <li><Link href="/blog/download-tiktok-without-watermark" style={{ color: "var(--primary)" }}>How to Download TikTok Videos Without Watermark</Link></li>
                            <li><Link href="/blog/save-facebook-videos" style={{ color: "var(--primary)" }}>How to Save Facebook Videos</Link></li>
                            <li><Link href="/blog/download-twitter-videos" style={{ color: "var(--primary)" }}>How to Download Twitter/X Videos</Link></li>
                            <li><Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader Tool</Link></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
