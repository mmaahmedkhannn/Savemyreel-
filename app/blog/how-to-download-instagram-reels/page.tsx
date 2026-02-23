import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "How to Download Instagram Reels in 2026 – Free Step-by-Step Guide",
    description: "Learn how to download Instagram Reels to your phone or computer for free in 2026. 3 easy methods with step-by-step instructions. No app needed, works on iPhone & Android.",
    keywords: [
        "how to download instagram reels", "download instagram reels", "save instagram reels",
        "instagram reel download", "download reels to phone", "save reels from instagram",
        "download instagram reels 2026", "instagram reels saver", "how to save reels on iphone",
        "instagram reel downloader free", "download reels without watermark",
    ],
    alternates: { canonical: `${SITE_URL}/blog/how-to-download-instagram-reels` },
    openGraph: {
        title: "How to Download Instagram Reels in 2026 – Complete Guide",
        description: "Free step-by-step guide to downloading Instagram Reels. Works on iPhone, Android & PC.",
        type: "article",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Download Instagram Reels in 2026 – Complete Guide",
    "description": "Learn how to download Instagram Reels to your phone or computer for free",
    "author": { "@type": "Organization", "name": "SaveMyReel" },
    "publisher": { "@type": "Organization", "name": "SaveMyReel", "url": SITE_URL },
    "datePublished": "2026-01-15",
    "dateModified": "2026-02-15",
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Instagram Reels Using SaveMyReel",
    "description": "Step-by-step guide to download Instagram Reels for free",
    "totalTime": "PT1M",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Find the Instagram Reel", "text": "Open the Instagram app or website and navigate to the Reel you want to download." },
        { "@type": "HowToStep", "position": 2, "name": "Copy the Reel URL", "text": "Tap the three dots (...) menu on the Reel and select 'Copy Link' to copy the URL to your clipboard." },
        { "@type": "HowToStep", "position": 3, "name": "Open SaveMyReel", "text": "Go to savemyreel.online in your browser. Select the Instagram tab." },
        { "@type": "HowToStep", "position": 4, "name": "Paste and Download", "text": "Paste the copied URL into the input field and click the Download button. Your Reel will be saved in HD quality." },
    ]
};

export default function HowToDownloadInstagramReels() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <div className={styles.pageContent} style={{ maxWidth: "800px" }}>
                    <p style={{ marginBottom: "0.5rem" }}>
                        <Link href="/blog" style={{ color: "var(--primary)", textDecoration: "none" }}>← Back to Blog</Link>
                    </p>
                    <h1 className={styles.pageTitle} style={{ textAlign: "left" }}>How to Download Instagram Reels in 2026</h1>
                    <p style={{ color: "var(--secondary-foreground)", marginBottom: "2rem" }}>Complete guide to saving Instagram Reels on iPhone, Android, and PC — Free, no app needed</p>

                    <section className={styles.section}>
                        <p>
                            Instagram Reels have become one of the most popular forms of short-form video content. Whether you want to save a funny Reel,
                            keep an educational video for offline viewing, or archive inspirational content, downloading Instagram Reels is easier than you think.
                        </p>
                        <p>
                            In this guide, we&apos;ll show you how to <strong>download Instagram Reels for free</strong> using SaveMyReel — the fastest
                            and safest online Instagram Reel downloader.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Method 1: Using SaveMyReel (Recommended)</h2>
                        <p>The easiest way to download Instagram Reels is with <Link href="/" style={{ color: "var(--primary)" }}>SaveMyReel</Link>. It&apos;s free, requires no app installation, and works on any device.</p>

                        <h3>Step 1: Copy the Instagram Reel URL</h3>
                        <p>Open Instagram and navigate to the Reel you want to download. Tap the <strong>three dots (...)</strong> menu and select <strong>&quot;Copy Link&quot;</strong>. This copies the Reel&apos;s URL to your clipboard.</p>

                        <h3>Step 2: Paste into SaveMyReel</h3>
                        <p>Open your browser and go to <Link href="/" style={{ color: "var(--primary)" }}>savemyreel.online</Link>. Make sure the <strong>Instagram</strong> tab is selected. Paste the copied URL into the input field.</p>

                        <h3>Step 3: Download</h3>
                        <p>Click the <strong>Download</strong> button. SaveMyReel will process the Reel and show you a preview with download options. Click to save the video to your device in <strong>HD quality</strong>.</p>

                        <div style={{ padding: "1.25rem", background: "rgba(139, 92, 246, 0.1)", borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.3)", marginTop: "1.5rem" }}>
                            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>💡 Pro Tip:</p>
                            <p style={{ color: "var(--secondary-foreground)" }}>SaveMyReel also supports Instagram carousel posts (multiple photos/videos). When you paste a carousel URL, all items will be shown and you can download them individually or all at once.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Method 2: Save Within the Instagram App</h2>
                        <p>Instagram allows you to save Reels within the app, but this only saves them to your Instagram &quot;Saved&quot; collection — not to your device&apos;s gallery. To access truly offline downloads, use SaveMyReel.</p>

                        <h3>How to Save Reels in the App:</h3>
                        <ol>
                            <li>Open the Reel in Instagram</li>
                            <li>Tap the <strong>bookmark icon</strong> at the bottom right</li>
                            <li>The Reel is saved to your &quot;Saved&quot; collection</li>
                        </ol>
                        <p style={{ color: "var(--secondary-foreground)", marginTop: "0.5rem" }}>
                            <em>Note: This method requires internet access to view saved Reels and won&apos;t work if the original creator deletes the content.</em>
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Method 3: Screen Recording (Low Quality)</h2>
                        <p>You can use your phone&apos;s built-in screen recorder, but this results in lower quality and may include on-screen buttons and notifications. <strong>SaveMyReel provides a much better experience</strong> with original HD quality downloads.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>FAQ – Downloading Instagram Reels</h2>

                        <h3>Can I download Instagram Reels on iPhone?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Yes! Open Safari (or any browser) on your iPhone, go to savemyreel.online, paste the Reel link, and download. The video will be saved to your Files app or Camera Roll.</p>

                        <h3>Can I download Reels without a watermark?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Instagram Reels typically don&apos;t have watermarks like TikTok videos do, so downloads through SaveMyReel are clean and watermark-free.</p>

                        <h3>Is it safe to download Instagram Reels?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Yes, using SaveMyReel is completely safe. We don&apos;t require any logins, installatinos, or personal data. Your downloads are processed securely.</p>

                        <h3>Can I download Reels from private accounts?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>No. SaveMyReel can only download Reels from public Instagram accounts. Content from private accounts is not accessible.</p>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Ready to Download Instagram Reels?</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Try SaveMyReel now — it&apos;s free, fast, and requires no registration.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download Instagram Reels Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h3>Related Guides</h3>
                        <ul>
                            <li><Link href="/blog/download-tiktok-without-watermark" style={{ color: "var(--primary)" }}>How to Download TikTok Videos Without Watermark</Link></li>
                            <li><Link href="/blog/save-facebook-videos" style={{ color: "var(--primary)" }}>How to Save Facebook Videos</Link></li>
                            <li><Link href="/instagram-downloader" style={{ color: "var(--primary)" }}>Instagram Downloader Tool</Link></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
