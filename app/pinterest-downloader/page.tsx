import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepGuide from "@/components/StepGuide";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "Pinterest Video & Image Downloader – Save Pins Free HD | 2026",
    description: "Download Pinterest videos, images, Idea Pins, and GIFs for free in HD quality. Save Pinterest pins to your phone or computer instantly. No login, no app needed. Works on iPhone, Android & PC.",
    keywords: [
        "pinterest downloader", "download pinterest videos", "save pinterest images",
        "pinterest video downloader", "pinterest image downloader", "download pinterest pins",
        "pinterest downloader online", "free pinterest downloader",
        "pinterest gif downloader", "download pinterest idea pins", "pinterest saver",
        "save pins from pinterest", "pinterest video to mp4", "pinterest downloader free",
        "download pinterest photos", "pinterest pin download", "pinterest content saver",
        "pinterest downloader iphone", "pinterest downloader android", "download pinterest to phone",
        "save pinterest to camera roll", "pinterest download mobile",
        "how to download pinterest videos", "how to save pinterest images",
        "download pinterest videos without app", "pinterest video downloader online free",
        "save pinterest video pins", "download pinterest idea pin", "pinterest hd download",
        "pinterest image download full size", "best pinterest downloader 2026",
        "download pinterest videos to phone", "pinterest pin saver online",
    ],
    alternates: { canonical: `${SITE_URL}/pinterest-downloader` },
    openGraph: {
        title: "Pinterest Video & Image Downloader – Save Pins Free HD | SaveMyReel",
        description: "Download Pinterest videos, images, Idea Pins, and GIFs in HD quality. Free, no login required. Works on all devices.",
        images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pinterest Downloader – Save Videos & Images Free HD",
        description: "Download Pinterest pins in HD quality. Free, no app needed.",
    },
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Pinterest Videos & Images",
    "description": "Save Pinterest content to your device using SaveMyReel free online downloader",
    "totalTime": "PT1M",
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
        { "@type": "Question", "name": "Can I download Pinterest videos and images?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! SaveMyReel supports downloading both Pinterest videos and images. Just paste the pin URL and the tool will detect the content type and provide the appropriate download." } },
        { "@type": "Question", "name": "Can I download Pinterest Idea Pins?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Idea Pins (Pinterest's story-like multi-page content) that contain videos or images can be downloaded through SaveMyReel." } },
        { "@type": "Question", "name": "Do I need a Pinterest account to download?", "acceptedAnswer": { "@type": "Answer", "text": "No. SaveMyReel works with any public Pinterest URL. You don't need to log in or create an account." } },
        { "@type": "Question", "name": "Can I download Pinterest on iPhone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Open Safari, go to savemyreel.online, paste the Pinterest pin URL, and download. No app needed." } },
        { "@type": "Question", "name": "What format are Pinterest downloads?", "acceptedAnswer": { "@type": "Answer", "text": "Videos are saved as MP4 files and images are saved as JPG or PNG in their original quality." } },
        { "@type": "Question", "name": "Is SaveMyReel Pinterest downloader free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with unlimited downloads. No hidden fees, subscriptions, or account needed." } },
        { "@type": "Question", "name": "Can I download Pinterest GIFs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! GIF pins are downloaded as video files so you can share them anywhere." } },
        { "@type": "Question", "name": "Does it work with pin.it short links?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, both full pinterest.com URLs and pin.it short links are supported." } },
    ]
};

const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SaveMyReel Pinterest Downloader",
    "operatingSystem": "Any",
    "applicationCategory": "MultimediaApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2450", "bestRating": "5" }
};

const combinedJsonLd = [howToJsonLd, faqJsonLd, softwareJsonLd];

export default function PinterestDownloader() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Pinterest Video &amp; Image Downloader</h1>
                <p className={styles.pageSubtitle}>Download Pinterest videos, images, Idea Pins &amp; GIFs in HD — 100% free, no app needed</p>

                <div className={styles.pageContent}>
                    <section className={styles.section} style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2.5rem", background: "linear-gradient(135deg, #E60023, #ff3b4e)", color: "white", borderRadius: "12px", fontWeight: "bold", fontSize: "1.125rem", textDecoration: "none" }}>
                            📌 Download Pinterest Content Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download Pinterest Videos &amp; Images</h2>
                        <p>
                            SaveMyReel makes it incredibly simple to download any public Pinterest pin. Whether you want to save a
                            video pin, download an image in full HD, or save an Idea Pin — our free Pinterest downloader handles it all.
                        </p>
                        <StepGuide platform="pinterest" />
                    </section>

                    <section className={styles.section}>
                        <h2>What Can You Download from Pinterest?</h2>
                        <p>SaveMyReel supports every type of Pinterest content:</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                            <div style={{ padding: "1.25rem", background: "rgba(230,0,35,0.05)", borderRadius: "12px", border: "1px solid rgba(230,0,35,0.15)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🎬 Video Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download video pins in MP4 format — recipe tutorials, DIY projects, workout clips, fashion videos, and more.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(230,0,35,0.05)", borderRadius: "12px", border: "1px solid rgba(230,0,35,0.15)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>🖼️ Image Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save high-resolution images from Pinterest in their original quality — no compression, no blurry thumbnails.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(230,0,35,0.05)", borderRadius: "12px", border: "1px solid rgba(230,0,35,0.15)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>📖 Idea Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Download Pinterest&apos;s multi-page story format including videos, images, and rich media content.</p>
                            </div>
                            <div style={{ padding: "1.25rem", background: "rgba(230,0,35,0.05)", borderRadius: "12px", border: "1px solid rgba(230,0,35,0.15)" }}>
                                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>✨ GIF Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>Save animated GIF pins as video files — perfect for sharing on any platform or messaging app.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Download Pinterest on iPhone &amp; Android</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
                            <div style={{ padding: "1.5rem", background: "rgba(0, 122, 255, 0.05)", borderRadius: "12px", border: "1px solid rgba(0, 122, 255, 0.15)" }}>
                                <h3 style={{ marginBottom: "0.75rem" }}>📱 iPhone (iOS)</h3>
                                <ol style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
                                    <li>Open Pinterest app → tap <strong>⋯</strong> on pin → <strong>Copy link</strong></li>
                                    <li>Open <strong>Safari</strong> → go to <strong>savemyreel.online</strong></li>
                                    <li>Select <strong>Pinterest</strong> tab → paste URL → <strong>Download</strong></li>
                                    <li>File saves to <strong>Files</strong> → tap <strong>Share → Save Video/Image</strong></li>
                                </ol>
                            </div>
                            <div style={{ padding: "1.5rem", background: "rgba(52, 168, 83, 0.05)", borderRadius: "12px", border: "1px solid rgba(52, 168, 83, 0.15)" }}>
                                <h3 style={{ marginBottom: "0.75rem" }}>🤖 Android</h3>
                                <ol style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
                                    <li>Open Pinterest app → tap <strong>Share</strong> → <strong>Copy link</strong></li>
                                    <li>Open <strong>Chrome</strong> → go to <strong>savemyreel.online</strong></li>
                                    <li>Select <strong>Pinterest</strong> tab → paste URL → <strong>Download</strong></li>
                                    <li>File saves directly to <strong>Downloads</strong> and <strong>Gallery</strong></li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Use SaveMyReel for Pinterest Downloads?</h2>
                        <ul>
                            <li><strong>HD quality:</strong> Download Pinterest content in the highest available resolution — original full-size images, not compressed thumbnails</li>
                            <li><strong>Videos &amp; images:</strong> Works with both video pins and image pins, unlike many tools that only support one type</li>
                            <li><strong>All pin types:</strong> Regular pins, Idea Pins, GIF pins, product pins, and even infographic pins</li>
                            <li><strong>No Pinterest login:</strong> You don&apos;t need to log into Pinterest or create an account on SaveMyReel</li>
                            <li><strong>pin.it short links:</strong> Both full <code>pinterest.com</code> URLs and <code>pin.it</code> short links work</li>
                            <li><strong>Mobile friendly:</strong> Works perfectly on iPhone, Android, iPad, and desktop browsers</li>
                            <li><strong>No app required:</strong> Works directly in your browser — no downloads, no storage used, no permissions needed</li>
                            <li><strong>Free forever:</strong> Unlimited downloads with no hidden fees, subscriptions, or premium tiers</li>
                            <li><strong>Fast &amp; secure:</strong> Instant downloads with HTTPS encryption — we don&apos;t store your URLs or data</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Pinterest Downloader FAQ</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div>
                                <h3>Can I download both Pinterest videos and images?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! SaveMyReel automatically detects whether the pin contains a video or image and provides the appropriate download option. Videos download as MP4, images as JPG/PNG.</p>
                            </div>
                            <div>
                                <h3>Can I download Pinterest Idea Pins?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes. Idea Pins (Pinterest&apos;s multi-page story format) that contain videos or images can be downloaded by copying the Idea Pin URL and pasting it into SaveMyReel.</p>
                            </div>
                            <div>
                                <h3>Do I need a Pinterest account?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>No. SaveMyReel works with any public Pinterest URL. You don&apos;t need to log in or have a Pinterest account.</p>
                            </div>
                            <div>
                                <h3>What format are Pinterest downloads saved in?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Videos are saved as MP4 files and images are saved as JPG or PNG — both compatible with all devices and platforms.</p>
                            </div>
                            <div>
                                <h3>Can I download Pinterest on my iPhone?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! Use Safari to visit savemyreel.online, paste the pin link, and download. Save to Camera Roll via the Share button.</p>
                            </div>
                            <div>
                                <h3>Do pin.it short links work?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Yes! Both full <code>pinterest.com/pin/123...</code> URLs and <code>pin.it/abc...</code> short links are fully supported.</p>
                            </div>
                            <div>
                                <h3>Why is right-click &quot;Save Image&quot; blurry on Pinterest?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>Pinterest loads compressed thumbnails (236px–564px) for speed. SaveMyReel extracts the original full-resolution image uploaded by the creator.</p>
                            </div>
                            <div>
                                <h3>Is it safe and free?</h3>
                                <p style={{ color: "var(--secondary-foreground)" }}>100% safe and 100% free. We use HTTPS encryption, don&apos;t store your data, and there are no hidden fees or premium tiers.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Pinterest Download Guides</h2>
                        <p>Read our detailed guides for specific Pinterest download scenarios:</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                            <Link href="/blog/download-pinterest-videos" style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)", textDecoration: "none", color: "inherit" }}>
                                <h3 style={{ fontSize: "1rem", color: "#E60023", marginBottom: "0.25rem" }}>🎬 Download Pinterest Videos</h3>
                                <p style={{ color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>Save video pins as MP4 files</p>
                            </Link>
                            <Link href="/blog/download-pinterest-images-hd" style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)", textDecoration: "none", color: "inherit" }}>
                                <h3 style={{ fontSize: "1rem", color: "#E60023", marginBottom: "0.25rem" }}>🖼️ Download Pinterest Images HD</h3>
                                <p style={{ color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>Save images in full resolution</p>
                            </Link>
                            <Link href="/blog/download-pinterest-idea-pins" style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)", textDecoration: "none", color: "inherit" }}>
                                <h3 style={{ fontSize: "1rem", color: "#E60023", marginBottom: "0.25rem" }}>📖 Download Idea Pins</h3>
                                <p style={{ color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>Save multi-page Pinterest stories</p>
                            </Link>
                            <Link href="/blog/pinterest-downloader-iphone-android" style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)", textDecoration: "none", color: "inherit" }}>
                                <h3 style={{ fontSize: "1rem", color: "#E60023", marginBottom: "0.25rem" }}>📱 Pinterest Downloader for Phone</h3>
                                <p style={{ color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>iPhone &amp; Android step-by-step guide</p>
                            </Link>
                            <Link href="/blog/best-pinterest-downloaders" style={{ padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)", textDecoration: "none", color: "inherit" }}>
                                <h3 style={{ fontSize: "1rem", color: "#E60023", marginBottom: "0.25rem" }}>⭐ Best Pinterest Downloaders</h3>
                                <p style={{ color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>Top 5 tools compared &amp; ranked</p>
                            </Link>
                        </div>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Save Pinterest Content to Your Device</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Free, fast, no registration. Download Pinterest videos, images, and pins in HD quality.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, #E60023 0%, #ff3b4e 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download Pinterest Content Now →
                        </Link>
                        <p style={{ marginTop: "1.5rem", color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>
                            Also try: <Link href="/instagram-downloader" style={{ color: "var(--primary)" }}>Instagram Downloader</Link> · <Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader</Link> · <Link href="/facebook-downloader" style={{ color: "var(--primary)" }}>Facebook Downloader</Link> · <Link href="/twitter-downloader" style={{ color: "var(--primary)" }}>Twitter Downloader</Link>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
