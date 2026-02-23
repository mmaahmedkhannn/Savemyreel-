import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "TikTok Video Download Without Watermark – Free HD & Fast",
    description: "Download TikTok videos without watermark online for free. Save HD TikToks, MP4s, and Slideshows to Android, iPhone or PC easily. No app or registration required.",
    keywords: [
        // Primary targets
        "tiktok video download without watermark", "tiktok downloader", "fastest tiktok downloader",
        "download tiktok videos without watermark", "tiktok video download HD no watermark",
        // Supporting targets
        "tiktok saver", "tiktok MP4 HD", "tiktok watermark remover", "tiktok to mp4 free",
        "save tiktok to phone", "free tiktok downloader no watermark", "tiktok slideshow download",
        "how to download tiktok without watermark", "download tiktok MP4 without watermark"
    ],
    alternates: { canonical: `${SITE_URL}/tiktok-downloader` },
    openGraph: {
        title: "TikTok Video Download Without Watermark – Free HD | SaveMyReel",
        description: "Download TikTok videos without watermark in HD. Free, fast, no login required.",
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download TikTok Videos Without Watermark",
    "description": "Save TikTok videos without watermark using SaveMyReel free online downloader",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Copy the TikTok link", "text": "Open TikTok, tap Share on the video you want, then tap 'Copy Link'." },
        { "@type": "HowToStep", "position": 2, "name": "Paste into SaveMyReel", "text": "Go to savemyreel.online, select TikTok, and paste the copied URL." },
        { "@type": "HowToStep", "position": 3, "name": "Download without watermark", "text": "Click Download. Your TikTok video will be saved without watermark in HD quality." }
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I download TikTok videos on iPhone?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! SaveMyReel works on iPhone through Safari or any other browser. Just copy the TikTok link, paste it on our site, and download." }
        },
        {
            "@type": "Question",
            "name": "Is it safe to download TikTok videos?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. SaveMyReel is 100% safe — no malware, no tracking, no data storage. We process downloads securely in real-time." }
        },
        {
            "@type": "Question",
            "name": "Can I download private TikTok videos?",
            "acceptedAnswer": { "@type": "Answer", "text": "No, our TikTok downloader only works with publicly available TikTok content. Private videos cannot be accessed." }
        }
    ]
};

const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SaveMyReel TikTok Downloader",
    "operatingSystem": "Any",
    "applicationCategory": "MultimediaApplication",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

const combinedJsonLd = [howToJsonLd, faqJsonLd, softwareJsonLd];

export default function TikTokDownloader() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>TikTok Video Downloader</h1>
                <p className={styles.pageSubtitle}>Download TikTok videos without watermark in HD quality — 100% free</p>

                <div className={styles.pageContent}>
                    <section className={styles.section} style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #25F4EE, #FE2C55, #000)", color: "white", borderRadius: "12px", fontWeight: "bold", fontSize: "1.125rem", textDecoration: "none" }}>
                            🎵 Download TikTok Videos Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download TikTok Videos Without Watermark</h2>
                        <p>SaveMyReel is the easiest way to download TikTok videos without the watermark. Follow these simple steps:</p>
                        <StepGuide platform="tiktok" />
                    </section>

                    <section className={styles.section}>
                        <h2>Why Use SaveMyReel TikTok Downloader?</h2>
                        <ul>
                            <li><strong>No watermark:</strong> Our TikTok downloader removes the TikTok watermark from videos automatically</li>
                            <li><strong>HD quality:</strong> Download TikTok videos in their original resolution — up to 1080p</li>
                            <li><strong>MP4 format:</strong> Videos are saved as MP4 files compatible with all devices and players</li>
                            <li><strong>No app needed:</strong> Works directly in your browser on iPhone, Android, and desktop</li>
                            <li><strong>No login required:</strong> No TikTok account or SaveMyReel registration needed</li>
                            <li><strong>Unlimited downloads:</strong> Download as many TikTok videos as you want, completely free</li>
                            <li><strong>Fast processing:</strong> Videos are downloaded in seconds, not minutes</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>TikTok Downloader FAQ</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <h3>Can I download TikTok videos on iPhone?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! SaveMyReel works on iPhone through Safari or any other browser. Just copy the TikTok link, paste it on our site, and download.</p>
                            </div>
                            <div>
                                <h3>Is it safe to download TikTok videos?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Absolutely. SaveMyReel is 100% safe — no malware, no tracking, no data storage. We process downloads securely in real-time.</p>
                            </div>
                            <div>
                                <h3>Can I download private TikTok videos?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>No, our TikTok downloader only works with publicly available TikTok content. Private videos cannot be accessed.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Save TikTok Videos Without Watermark Today</h2>
                        <p style={{ marginBottom: "1.5rem" }}>No registration, no app, no watermark. Just paste and download.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Start Downloading TikTok Videos →
                        </Link>
                        <p style={{ marginTop: "1.5rem", color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>
                            Also try: <Link href="/instagram-downloader" style={{ color: "var(--primary)" }}>Instagram Downloader</Link> · <Link href="/facebook-downloader" style={{ color: "var(--primary)" }}>Facebook Downloader</Link> · <Link href="/twitter-downloader" style={{ color: "var(--primary)" }}>Twitter Downloader</Link> · <Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader</Link>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
