import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../../page-styles.module.css";

const SITE_URL = "https://savemyreel.online";

export const metadata: Metadata = {
    title: "How to Download YouTube Playlists for Free (2026 Guide)",
    description: "Download entire YouTube playlists for free. Save every video as MP4 for offline viewing. Step-by-step guide for iPhone, Android & PC.",
    keywords: [
        "download youtube playlist", "youtube playlist download", "save youtube playlist",
        "how to download youtube playlist", "youtube playlist downloader free",
        "download entire youtube playlist", "youtube playlist to mp4",
        "download all videos from youtube playlist", "youtube playlist download online",
        "batch download youtube videos", "youtube playlist download 2026",
    ],
    alternates: { canonical: `${SITE_URL}/blog/download-youtube-playlists` },
    openGraph: {
        title: "How to Download YouTube Playlists for Free (2026)",
        description: "Save entire YouTube playlists for offline viewing. Free guide.",
        type: "article",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Download YouTube Playlists for Free (2026)",
    "description": "Complete guide to downloading YouTube playlists",
    "author": { "@type": "Organization", "name": "SaveMyReel" },
    "publisher": { "@type": "Organization", "name": "SaveMyReel", "url": SITE_URL },
    "datePublished": "2026-03-06",
    "dateModified": "2026-03-06",
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I download an entire YouTube playlist at once?",
            "acceptedAnswer": { "@type": "Answer", "text": "Browser tools like SaveMyReel download one video at a time. Desktop tools like yt-dlp can batch-download entire playlists with one command." }
        },
        {
            "@type": "Question",
            "name": "Can I download YouTube playlists on iPhone?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! Use SaveMyReel in Safari to download each video individually from the playlist." }
        },
        {
            "@type": "Question",
            "name": "Is it legal to download YouTube playlists?",
            "acceptedAnswer": { "@type": "Answer", "text": "Downloading for personal offline use is generally acceptable. Don't redistribute copyrighted content." }
        },
    ]
};

export default function DownloadYouTubePlaylists() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <div className={styles.pageContent} style={{ maxWidth: "800px" }}>
                    <p style={{ marginBottom: "0.5rem" }}>
                        <Link href="/blog" style={{ color: "var(--primary)", textDecoration: "none" }}>← Back to Blog</Link>
                    </p>
                    <h1 className={styles.pageTitle} style={{ textAlign: "left" }}>How to Download YouTube Playlists for Free</h1>
                    <p style={{ color: "var(--secondary-foreground)", marginBottom: "2rem" }}>Save every video from a YouTube playlist for offline viewing — free, no app needed</p>

                    <section className={styles.section}>
                        <p>YouTube playlists are incredibly useful — curated music, full courses, workout series, tutorials. But what happens when you want to watch them <strong>offline</strong>?</p>
                        <p>YouTube Premium lets you download playlists, but downloads expire after 30 days and only work in the app. Here&apos;s how to <strong>permanently save playlist videos as MP4 files</strong> for free.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Download YouTube Playlists?</h2>
                        <ul>
                            <li><strong>Offline learning:</strong> Download full courses to study without internet</li>
                            <li><strong>Music collections:</strong> Save music playlists for offline listening</li>
                            <li><strong>Workout routines:</strong> Download fitness playlists for the gym</li>
                            <li><strong>Travel:</strong> Pre-download entertainment before long trips</li>
                            <li><strong>Preservation:</strong> Save playlists before videos get removed</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Method 1: SaveMyReel (Quick &amp; Easy)</h2>
                        <p><Link href="/" style={{ color: "var(--primary)" }}>SaveMyReel</Link> is the easiest way to download videos from a playlist:</p>
                        <ol>
                            <li><strong>Open the playlist</strong> on YouTube</li>
                            <li><strong>Click a video</strong> and copy the URL from your browser</li>
                            <li><strong>Paste at SaveMyReel:</strong> Go to savemyreel.online, select YouTube, paste the URL</li>
                            <li><strong>Download:</strong> Click Download and save the MP4 file</li>
                            <li><strong>Repeat</strong> for each video in the playlist</li>
                        </ol>
                        <div style={{ padding: "1.25rem", background: "rgba(139, 92, 246, 0.1)", borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.3)", marginTop: "1.5rem" }}>
                            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>💡 Pro Tip:</p>
                            <p style={{ color: "var(--secondary-foreground)" }}>For playlists with 5-10 videos, SaveMyReel is the fastest option. For 50+ video playlists, consider using yt-dlp (Method 2) for batch downloading.</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Method 2: yt-dlp (Batch Download — Advanced)</h2>
                        <p>For tech-savvy users, <strong>yt-dlp</strong> is a free command-line tool that can download entire playlists with one command:</p>
                        <div style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", overflowX: "auto", marginTop: "0.5rem" }}>
                            <code style={{ color: "#e2e8f0", fontSize: "0.875rem" }}>yt-dlp -f &quot;best[ext=mp4]&quot; PLAYLIST_URL</code>
                        </div>
                        <p style={{ marginTop: "0.75rem" }}>Replace <code>PLAYLIST_URL</code> with the full playlist URL. Every video downloads automatically.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>Method Comparison</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>Feature</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>SaveMyReel</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>yt-dlp</th>
                                        <th style={{ padding: "0.75rem", textAlign: "left" }}>YouTube Premium</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Price</td><td style={{ padding: "0.75rem" }}>Free ✅</td><td style={{ padding: "0.75rem" }}>Free ✅</td><td style={{ padding: "0.75rem" }}>$13.99/mo</td></tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Batch download?</td><td style={{ padding: "0.75rem" }}>One at a time</td><td style={{ padding: "0.75rem" }}>Full playlist ✅</td><td style={{ padding: "0.75rem" }}>Full playlist ✅</td></tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Output format</td><td style={{ padding: "0.75rem" }}>MP4 ✅</td><td style={{ padding: "0.75rem" }}>MP4 ✅</td><td style={{ padding: "0.75rem" }}>In-app only</td></tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Requires install?</td><td style={{ padding: "0.75rem" }}>No ✅</td><td style={{ padding: "0.75rem" }}>Yes (CLI)</td><td style={{ padding: "0.75rem" }}>YouTube app</td></tr>
                                    <tr style={{ borderBottom: "1px solid var(--card-border)" }}><td style={{ padding: "0.75rem" }}>Permanent?</td><td style={{ padding: "0.75rem" }}>Yes ✅</td><td style={{ padding: "0.75rem" }}>Yes ✅</td><td style={{ padding: "0.75rem" }}>Expires 30 days</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>FAQ — YouTube Playlist Downloads</h2>
                        <h3>Can I download an entire playlist at once?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Browser tools like SaveMyReel download one video at a time. Desktop tools like yt-dlp can process entire playlists with a single command.</p>
                        <h3>Can I download playlists on iPhone?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Yes! Use SaveMyReel in Safari to download each video individually.</p>
                        <h3>Is it legal?</h3>
                        <p style={{ color: "var(--secondary-foreground)" }}>Downloading for personal offline use is generally acceptable. Don&apos;t redistribute copyrighted content.</p>
                    </section>

                    <section className={styles.section} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <h2>Start Downloading YouTube Playlists</h2>
                        <p style={{ marginBottom: "1.5rem" }}>Try SaveMyReel — the easiest way to save YouTube videos for offline viewing.</p>
                        <Link href="/" style={{ display: "inline-block", padding: "1rem 2rem", background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}>
                            Download YouTube Videos Now →
                        </Link>
                    </section>

                    <section className={styles.section}>
                        <h3>Related Guides</h3>
                        <ul>
                            <li><Link href="/blog/download-youtube-videos" style={{ color: "var(--primary)" }}>How to Download YouTube Videos in HD</Link></li>
                            <li><Link href="/blog/download-youtube-shorts" style={{ color: "var(--primary)" }}>How to Download YouTube Shorts</Link></li>
                            <li><Link href="/blog/youtube-to-mp3-converter" style={{ color: "var(--primary)" }}>YouTube to MP3 Converter</Link></li>
                            <li><Link href="/youtube-downloader" style={{ color: "var(--primary)" }}>YouTube Downloader Tool</Link></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
