import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "How to Download Instagram Photos in Full Quality (2026)",
    description: "Download Instagram photos in full HD resolution. Save profile pictures, carousel posts, and feed photos in original quality. Free, no app needed.",
    keywords: [
        "download instagram photos", "save instagram photos", "instagram photo download",
        "download instagram pictures", "instagram photo downloader", "save instagram pictures",
        "download instagram photos full quality", "download instagram photos HD",
        "instagram image download", "instagram pic download", "download ig photos",
        "save instagram images", "instagram photo saver", "download instagram profile picture",
        "download instagram carousel photos", "instagram photo download full size",
    ],
    alternates: { canonical: `${SITE_URL}/blog/download-instagram-photos-full-quality` },
    openGraph: {
        title: "How to Download Instagram Photos in Full Quality (2026)",
        description: "Save Instagram photos in original HD resolution. Free, no app needed.",
        type: "article",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Download Instagram Photos in Full Quality",
    "description": "Download Instagram photos in full HD resolution for free",
    "author": { "@type": "Organization", "name": "SaveMyReel" },
    "publisher": { "@type": "Organization", "name": "SaveMyReel", "url": SITE_URL },
    "datePublished": "2026-03-06",
    "dateModified": "2026-03-06",
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Instagram Photos Using SaveMyReel",
    "description": "Download Instagram photos in full quality",
    "totalTime": "PT1M",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Copy the post URL", "text": "Open Instagram and find the photo. Tap the three dots and select Copy Link." },
        { "@type": "HowToStep", "position": 2, "name": "Open SaveMyReel", "text": "Go to savemyreel.online and select the Instagram tab." },
        { "@type": "HowToStep", "position": 3, "name": "Download", "text": "Paste the URL and click Download. Save the full-quality photo." },
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why are Instagram photos low quality when I screenshot them?",
            "acceptedAnswer": { "@type": "Answer", "text": "Instagram compresses images for display. Screenshots capture this compressed version at your screen's resolution. Downloading through SaveMyReel extracts the original uploaded file, which is significantly higher quality." }
        },
        {
            "@type": "Question",
            "name": "Can I download all photos from a carousel post?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! When you paste a carousel post URL into SaveMyReel, all images and videos from the carousel are displayed, and you can download each one individually." }
        },
        {
            "@type": "Question",
            "name": "Can I download someone's Instagram profile picture?",
            "acceptedAnswer": { "@type": "Answer", "text": "SaveMyReel primarily supports downloading posts, Reels, and Stories. For profile pictures, you may need to use the profile URL directly." }
        },
    ]
};

export default function DownloadInstagramPhotos() {
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
                    <h1 className={styles.pageTitle} style={{ textAlign: "left" }}>How to Download Instagram Photos in Full Quality</h1>
                    <p style={{ color: "var(--secondary-foreground)", marginBottom: "2rem" }}>Save Instagram photos, carousel posts, and profile pictures in original HD resolution</p>

                    <section className={styles.section}>
                        <p>Ever tried to save an Instagram photo only to end up with a blurry, compressed mess? That&apos;s because Instagram heavily compresses images for display. <strong>Screenshots capture this compressed version</strong> — not the original upload.</p>
                        <p>In this guide, we&apos;ll show you how to download Instagram photos in their <strong>original, full-quality resolution</strong> using SaveMyReel.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Are Instagram Screenshots Low Quality?</h2>
                        <p>When you screenshot an Instagram photo, you&apos;re capturing:</p>
                        <ul>
                            <li>Instagram&apos;s <strong>compressed version</strong> of the image (not the original)</li>
                            <li>Your phone&apos;s <strong>screen resolution</strong> (which may be lower than the photo)</li>
                            <li>Extra elements: <strong>like buttons, captions, profile info, status bar</strong></li>
                        </ul>
                        <p>Downloading the original file gives you a <strong>clean, high-resolution image</strong> without any of these problems.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download Instagram Photos with SaveMyReel</h2>
                        <h3>Step 1: Copy the Instagram Post URL</h3>
                        <p>Open Instagram and navigate to the photo you want to download. Tap the <strong>three dots (...)</strong> and select <strong>&quot;Copy Link&quot;</strong>.</p>

                        <h3>Step 2: Paste into SaveMyReel</h3>
                        <p>Open your browser and go to <Link href="/" style={{ color: "var(--primary)" }}>savemyreel.online</Link>. Select the <strong>Instagram</strong> tab and paste the copied URL.</p>

                        <h3>Step 3: Download in Full Quality</h3>
                        <p>Click <strong>Download</strong>. SaveMyReel extracts the original photo file and lets you save it to your device in full resolution.</p>

                        <div style={{ padding: "1.25rem", background: "rgba(139, 92, 246, 0.1)", borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.3)", marginTop: "1.5rem" }}>
                            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>💡 Carousel Posts:</p>
                            <p style={{ color: "var(--secondary-foreground)" }}>If you paste a carousel post (one with multiple photos), SaveMyReel will display ALL images from the carousel. You can download each one individually.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Screenshot vs Download — Quality Comparison</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Feature</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Screenshot</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>SaveMyReel Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Resolution</td><td style={{ padding: "0.75rem" }}>Screen resolution</td><td style={{ padding: "0.75rem" }}>Original upload quality ✅</td></tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>UI elements</td><td style={{ padding: "0.75rem" }}>Included ❌</td><td style={{ padding: "0.75rem" }}>Clean photo ✅</td></tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Compression</td><td style={{ padding: "0.75rem" }}>Double compressed ❌</td><td style={{ padding: "0.75rem" }}>Original file ✅</td></tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Carousel support</td><td style={{ padding: "0.75rem" }}>One at a time</td><td style={{ padding: "0.75rem" }}>All photos ✅</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Types of Instagram Photos You Can Download</h2>
                        <ul>
                            <li><strong>Single feed photos:</strong> Regular photo posts in original resolution</li>
                            <li><strong>Carousel posts:</strong> Download all images from multi-photo posts individually</li>
                            <li><strong>Story photos:</strong> Save photo stories before they expire in 24 hours</li>
                            <li><strong>IGTV thumbnails:</strong> Save cover photos from IGTV videos</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>FAQ — Downloading Instagram Photos</h2>
                        <h3>Why are my Instagram screenshots blurry?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Instagram compresses images during display. Screenshots capture this compressed version. Downloading through SaveMyReel gets the original, higher-quality file.</p>

                        <h3>Can I download all photos from a carousel?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Yes! Paste the carousel post URL and SaveMyReel will show all images. Download each one individually in full quality.</p>

                        <h3>Can I download photos from private accounts?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>No. SaveMyReel only accesses content from public accounts. Private account content is protected.</p>

                        <h3>Does the photo owner get notified?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>No. Instagram does not notify users when someone downloads their photos using external tools.</p>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Download Instagram Photos in Full Quality</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Stop taking blurry screenshots. Get the original HD photo with SaveMyReel.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download Instagram Photos Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h3>Related Guides</h3>
                        <ul>
                            <li><Link href="/blog/how-to-download-instagram-reels" style={{ color: "var(--primary)" }}>How to Download Instagram Reels</Link></li>
                            <li><Link href="/blog/save-instagram-stories" style={{ color: "var(--primary)" }}>How to Save Instagram Stories</Link></li>
                            <li><Link href="/blog/best-instagram-video-downloaders" style={{ color: "var(--primary)" }}>Best Instagram Video Downloaders</Link></li>
                            <li><Link href="/instagram-downloader" style={{ color: "var(--primary)" }}>Instagram Downloader Tool</Link></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
