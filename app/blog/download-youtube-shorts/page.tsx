import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "How to Download YouTube Shorts as MP4 in 2026 – Free Guide",
    description: "Download YouTube Shorts as MP4 videos for free. Save Shorts to your phone or computer in HD quality. Works on iPhone, Android & PC — no app required.",
    keywords: [
        "download youtube shorts", "youtube shorts download", "save youtube shorts",
        "youtube shorts to mp4", "download youtube shorts mp4", "youtube shorts downloader",
        "how to download youtube shorts", "save youtube shorts to phone",
        "youtube shorts download online free", "download shorts video",
        "youtube shorts saver", "convert youtube shorts to mp4",
        "download youtube shorts without watermark", "youtube shorts download 2026",
        "youtube shorts to gallery", "save shorts to camera roll",
    ],
    alternates: { canonical: `${SITE_URL}/blog/download-youtube-shorts` },
    openGraph: {
        title: "How to Download YouTube Shorts as MP4 – Free 2026 Guide",
        description: "Save YouTube Shorts to your device as MP4. Free, no app needed. Works on all devices.",
        type: "article",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Download YouTube Shorts as MP4 in 2026",
    "description": "Step-by-step guide to downloading YouTube Shorts as MP4 videos for free",
    "author": { "@type": "Organization", "name": "SaveMyReel" },
    "publisher": { "@type": "Organization", "name": "SaveMyReel", "url": SITE_URL },
    "datePublished": "2026-03-06",
    "dateModified": "2026-03-06",
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download YouTube Shorts Using SaveMyReel",
    "description": "Step-by-step guide to download YouTube Shorts as MP4",
    "totalTime": "PT1M",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Copy the Shorts URL", "text": "Open YouTube and navigate to the Short you want to download. Tap the Share button and select 'Copy link'. The URL should look like youtube.com/shorts/VIDEO_ID." },
        { "@type": "HowToStep", "position": 2, "name": "Open SaveMyReel", "text": "Go to savemyreel.online in your browser and select the YouTube tab." },
        { "@type": "HowToStep", "position": 3, "name": "Paste and download", "text": "Paste the copied Shorts URL into the input field and click the Download button. The Short will be saved as an MP4 file to your device." },
    ]
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I download YouTube Shorts on iPhone?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! Open Safari on your iPhone, go to savemyreel.online, paste the Shorts link, and download. The video will save to your Files app or Camera Roll. No app installation needed." }
        },
        {
            "@type": "Question",
            "name": "Are YouTube Shorts downloaded with a watermark?",
            "acceptedAnswer": { "@type": "Answer", "text": "No. YouTube Shorts do not have watermarks like TikTok videos do. When you download through SaveMyReel, you get the clean, original video without any overlay." }
        },
        {
            "@type": "Question",
            "name": "What format are YouTube Shorts saved in?",
            "acceptedAnswer": { "@type": "Answer", "text": "YouTube Shorts are saved as MP4 files, which is universally compatible with all devices, video players, and social media platforms." }
        },
        {
            "@type": "Question",
            "name": "Can I download Shorts that are longer than 60 seconds?",
            "acceptedAnswer": { "@type": "Answer", "text": "YouTube Shorts are limited to 60 seconds by YouTube. Some creators upload longer vertical videos that appear in the Shorts feed. SaveMyReel can download both standard Shorts and longer vertical YouTube videos." }
        },
    ]
};

export default function DownloadYouTubeShorts() {
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
                    <h1 className={styles.pageTitle} style={{ textAlign: "left" }}>How to Download YouTube Shorts as MP4 in 2026</h1>
                    <p style={{ color: "var(--secondary-foreground)", marginBottom: "2rem" }}>Save any YouTube Short to your phone or computer as an MP4 file — free, no app needed</p>

                    <section className={styles.section}>
                        <p>
                            YouTube Shorts have exploded in popularity, with over <strong>70 billion daily views</strong> worldwide. Whether you&apos;ve found a hilarious clip, a quick cooking tutorial, or an inspiring motivational video, you might want to save it for offline viewing or to share on other platforms.
                        </p>
                        <p>
                            The problem? YouTube doesn&apos;t offer a built-in download button for Shorts (unless you have YouTube Premium). In this guide, we&apos;ll show you how to <strong>download any YouTube Short as an MP4 file for free</strong> using SaveMyReel.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>What Are YouTube Shorts?</h2>
                        <p>YouTube Shorts are vertical, short-form videos up to <strong>60 seconds</strong> long. Think of them like TikTok videos or Instagram Reels, but on YouTube. Key characteristics:</p>
                        <ul>
                            <li><strong>Vertical format:</strong> 9:16 aspect ratio (portrait mode), designed for phones</li>
                            <li><strong>Up to 60 seconds:</strong> Quick, engaging content that&apos;s easy to consume</li>
                            <li><strong>Dedicated feed:</strong> YouTube has a separate Shorts feed for endless scrolling</li>
                            <li><strong>No watermark:</strong> Unlike TikTok, YouTube Shorts don&apos;t add a watermark to the video</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download YouTube Shorts with SaveMyReel</h2>
                        <p>Downloading YouTube Shorts with <Link href="/" style={{ color: "var(--primary)" }}>SaveMyReel</Link> takes less than 30 seconds. Here&apos;s how:</p>

                        <h3>Step 1: Copy the YouTube Shorts URL</h3>
                        <p>Open the YouTube app or website and find the Short you want to download. Tap the <strong>Share</strong> button (the arrow icon) and select <strong>&quot;Copy link&quot;</strong>.</p>
                        <p>The URL will look like one of these formats:</p>
                        <ul>
                            <li><code>https://youtube.com/shorts/VIDEO_ID</code></li>
                            <li><code>https://youtu.be/VIDEO_ID</code></li>
                        </ul>

                        <h3>Step 2: Paste into SaveMyReel</h3>
                        <p>Open your browser and navigate to <Link href="/" style={{ color: "var(--primary)" }}>savemyreel.online</Link>. Select the <strong>YouTube</strong> tab, then paste the copied Shorts URL into the input field.</p>

                        <h3>Step 3: Download as MP4</h3>
                        <p>Click the <strong>Download</strong> button. SaveMyReel will process the Short and give you download options. Click to save the video as an <strong>MP4 file</strong> directly to your device.</p>

                        <div style={{ padding: "1.25rem", background: "rgba(139, 92, 246, 0.1)", borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.3)", marginTop: "1.5rem" }}>
                            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>💡 Pro Tip:</p>
                            <p style={{ color: "var(--secondary-foreground)" }}>YouTube Shorts use the same URL structure as regular YouTube videos. If you want to download multiple Shorts from the same creator, simply copy each Shorts link and download them one at a time through SaveMyReel.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Download YouTube Shorts?</h2>
                        <ul>
                            <li><strong>Offline access:</strong> Watch your favorite Shorts without an internet connection — perfect for flights, commutes, or areas with poor signal</li>
                            <li><strong>Share on other platforms:</strong> Repost funny or useful Shorts on WhatsApp, Telegram, or Discord</li>
                            <li><strong>Content creation:</strong> Use Shorts in video compilations (always credit the original creator)</li>
                            <li><strong>Back up content:</strong> Creators often delete videos — save the ones you love before they&apos;re gone</li>
                            <li><strong>Study and reference:</strong> Save educational Shorts for later review and learning</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>YouTube Shorts vs YouTube Premium Download</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Feature</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>SaveMyReel</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>YouTube Premium</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <td style={{ padding: "0.75rem" }}>Price</td>
                                        <td style={{ padding: "0.75rem" }}>Free ✅</td>
                                        <td style={{ padding: "0.75rem" }}>$13.99/month</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <td style={{ padding: "0.75rem" }}>Format</td>
                                        <td style={{ padding: "0.75rem" }}>MP4 file ✅</td>
                                        <td style={{ padding: "0.75rem" }}>In-app only</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <td style={{ padding: "0.75rem" }}>Shareable?</td>
                                        <td style={{ padding: "0.75rem" }}>Yes — send anywhere ✅</td>
                                        <td style={{ padding: "0.75rem" }}>No</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <td style={{ padding: "0.75rem" }}>Expires?</td>
                                        <td style={{ padding: "0.75rem" }}>Never ✅</td>
                                        <td style={{ padding: "0.75rem" }}>After 30 days</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <td style={{ padding: "0.75rem" }}>Requires app?</td>
                                        <td style={{ padding: "0.75rem" }}>No ✅</td>
                                        <td style={{ padding: "0.75rem" }}>Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download YouTube Shorts on Specific Devices</h2>

                        <h3>On iPhone (iOS)</h3>
                        <ol>
                            <li>Open the YouTube app and find the Short</li>
                            <li>Tap <strong>Share → Copy link</strong></li>
                            <li>Open Safari and go to <Link href="/" style={{ color: "var(--primary)" }}>savemyreel.online</Link></li>
                            <li>Paste the URL and tap Download</li>
                            <li>The video will save to your <strong>Files app</strong>. To move it to Camera Roll, open Files, find the video, and tap <strong>Share → Save Video</strong></li>
                        </ol>

                        <h3>On Android</h3>
                        <ol>
                            <li>Open the YouTube app and find the Short</li>
                            <li>Tap <strong>Share → Copy link</strong></li>
                            <li>Open Chrome and go to <Link href="/" style={{ color: "var(--primary)" }}>savemyreel.online</Link></li>
                            <li>Paste the URL and tap Download</li>
                            <li>The MP4 file will save directly to your <strong>Downloads</strong> folder</li>
                        </ol>

                        <h3>On PC/Mac</h3>
                        <ol>
                            <li>Open YouTube in your browser and find the Short</li>
                            <li>Copy the URL from the address bar</li>
                            <li>Open a new tab and go to <Link href="/" style={{ color: "var(--primary)" }}>savemyreel.online</Link></li>
                            <li>Paste the URL and click Download</li>
                            <li>The MP4 file will download to your default downloads folder</li>
                        </ol>
                    </section>

                    <section className={styles.section}>
                        <h2>FAQ — Downloading YouTube Shorts</h2>

                        <h3>Can I download YouTube Shorts on iPhone?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Yes! Open Safari, go to savemyreel.online, paste the Shorts link, and download. The video saves to your Files app — you can then save it to your Camera Roll.</p>

                        <h3>Do YouTube Shorts have watermarks?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>No. Unlike TikTok, YouTube does not add watermarks to Shorts. Your downloaded MP4 will be the clean, original video.</p>

                        <h3>What format are Shorts saved in?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>All Shorts are saved as <strong>MP4</strong> files — the most universal video format, compatible with virtually every device and video player.</p>

                        <h3>Can I download Shorts longer than 60 seconds?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>YouTube Shorts are capped at 60 seconds. Some longer vertical videos may appear in the Shorts feed — SaveMyReel can download both Shorts and regular YouTube videos regardless of length.</p>

                        <h3>Is it legal to download YouTube Shorts?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Downloading publicly available content for personal, offline viewing is generally acceptable. However, redistributing or using downloaded content commercially without permission may violate copyright law. Always respect creators&apos; rights.</p>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Ready to Download YouTube Shorts?</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Try SaveMyReel now — it&apos;s free, fast, and requires no app installation.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download YouTube Shorts Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h3>Related Guides</h3>
                        <ul>
                            <li><Link href="/blog/download-youtube-videos" style={{ color: "var(--primary)" }}>How to Download YouTube Videos in HD</Link></li>
                            <li><Link href="/blog/youtube-to-mp3-converter" style={{ color: "var(--primary)" }}>YouTube to MP3 Converter — Free & Safe</Link></li>
                            <li><Link href="/blog/is-it-legal-to-download-youtube-videos" style={{ color: "var(--primary)" }}>Is It Legal to Download YouTube Videos?</Link></li>
                            <li><Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader Tool</Link></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
