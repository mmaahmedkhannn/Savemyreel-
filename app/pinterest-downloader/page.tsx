import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "Pinterest Video & Image Downloader – Save Pins Free HD",
    description: "Download Pinterest videos, images, Idea Pins, and GIFs for free in HD quality. Save Pinterest content to your phone or computer instantly. No login, no app needed.",
    keywords: [
        "pinterest downloader", "download pinterest videos", "save pinterest images",
        "pinterest video downloader", "pinterest image downloader", "download pinterest pins",
        "pinterest video download online", "free pinterest downloader",
        "pinterest gif downloader", "download pinterest idea pins", "pinterest saver",
        "save pins from pinterest", "pinterest video to mp4", "pinterest downloader free",
        "download pinterest photos", "pinterest pin download", "pinterest content saver",
    ],
    alternates: { canonical: `${SITE_URL}/pinterest-downloader` },
    openGraph: {
        title: "Pinterest Video & Image Downloader – Save Pins Free | SaveMyReel",
        description: "Download Pinterest videos, images, and Idea Pins in HD quality. Free, no login required.",
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Pinterest Videos & Images",
    "description": "Save Pinterest content to your device using SaveMyReel free online downloader",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Copy the Pinterest pin URL", "text": "Open Pinterest, find the pin you want to download, click the three dots or share button and select 'Copy Link'." },
        { "@type": "HowToStep", "position": 2, "name": "Paste into SaveMyReel", "text": "Go to savemyreel.online, select Pinterest, and paste the copied URL into the input field." },
        { "@type": "HowToStep", "position": 3, "name": "Download the content", "text": "Click Download. Your Pinterest video or image will be saved in HD quality to your device." }
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I download Pinterest videos and images?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! SaveMyReel supports downloading both Pinterest videos and images. Just paste the pin URL and the tool will detect the content type and provide the appropriate download." }
        },
        {
            "@type": "Question",
            "name": "Can I download Pinterest Idea Pins?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, Idea Pins (Pinterest's story-like multi-page content) that contain videos or images can be downloaded through SaveMyReel." }
        },
        {
            "@type": "Question",
            "name": "Do I need a Pinterest account to download?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. SaveMyReel works with any public Pinterest URL. You don't need to log in or create an account." }
        }
    ]
};

const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SaveMyReel Pinterest Downloader",
    "operatingSystem": "Any",
    "applicationCategory": "MultimediaApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const combinedJsonLd = [howToJsonLd, faqJsonLd, softwareJsonLd];

export default function PinterestDownloader() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Pinterest Video &amp; Image Downloader</h1>
                <p className={styles.pageSubtitle}>Download Pinterest videos, images, Idea Pins &amp; GIFs in HD — 100% free</p>

                <div className={styles.pageContent}>
                    <section className={styles.section} style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #E60023, #ff3b4e)", color: "white", borderRadius: "12px", fontWeight: "bold", fontSize: "1.125rem", textDecoration: "none" }}>
                            📌 Download Pinterest Content Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download Pinterest Videos &amp; Images</h2>
                        <p>SaveMyReel makes it simple to download any public Pinterest pin. Follow these steps:</p>
                        <StepGuide platform="pinterest" />
                    </section>

                    <section className={styles.section}>
                        <h2>What Can You Download from Pinterest?</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎬 Video Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download video pins in MP4 format — recipe tutorials, DIY projects, workout clips and more.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🖼️ Image Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save high-resolution images from Pinterest in their original quality.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>📖 Idea Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download Pinterest&apos;s multi-page story format including videos and images.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>✨ GIF Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save animated GIF pins as video files for sharing anywhere.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Use SaveMyReel for Pinterest Downloads?</h2>
                        <ul>
                            <li><strong>HD quality:</strong> Download Pinterest content in the highest available resolution</li>
                            <li><strong>Videos &amp; images:</strong> Works with both video pins and image pins</li>
                            <li><strong>All pin types:</strong> Regular pins, Idea Pins, GIF pins, and product pins</li>
                            <li><strong>No Pinterest login:</strong> You don&apos;t need to log into Pinterest to download</li>
                            <li><strong>Mobile friendly:</strong> Works perfectly on iPhone, Android, and desktop browsers</li>
                            <li><strong>Free forever:</strong> Unlimited downloads with no hidden fees</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Pinterest Downloader FAQ</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div>
                                <h3>Can I download both Pinterest videos and images?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! SaveMyReel automatically detects whether the pin contains a video or image and provides the appropriate download option.</p>
                            </div>
                            <div>
                                <h3>Can I download Pinterest Idea Pins?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes. Idea Pins that contain videos or images can be downloaded by copying the Idea Pin URL and pasting it into SaveMyReel.</p>
                            </div>
                            <div>
                                <h3>Do I need a Pinterest account?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>No. SaveMyReel works with any public Pinterest URL. You don&apos;t need to log in or have a Pinterest account.</p>
                            </div>
                            <div>
                                <h3>What format are Pinterest downloads saved in?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Videos are saved as MP4 files and images are saved as JPG or PNG — both compatible with all devices and platforms.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Save Pinterest Content to Your Device</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Free, fast, no registration. Start downloading Pinterest pins now.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download Pinterest Content Now →
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
