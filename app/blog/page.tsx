import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

export const metadata: Metadata = {
    title: "Blog – Video Download Guides & Tips",
    description: "Learn how to download videos from Instagram, TikTok, Facebook, and Twitter. Step-by-step guides, tips, and tricks for saving social media content for free.",
    alternates: { canonical: "https://savemyreel.online/blog" },
};

const articles = [
    {
        title: "How to Download Instagram Reels in 2026 – Complete Guide",
        description: "Step-by-step guide to downloading Instagram Reels to your phone or computer for free. Learn 3 different methods.",
        href: "/blog/how-to-download-instagram-reels",
        category: "Instagram",
        color: "#E1306C",
    },
    {
        title: "How to Download TikTok Videos Without Watermark",
        description: "Save TikTok videos to your device without the watermark overlay. Works on iPhone, Android, and desktop.",
        href: "/blog/download-tiktok-without-watermark",
        category: "TikTok",
        color: "#FE2C55",
    },
    {
        title: "How to Save Facebook Videos to Your Phone or Computer",
        description: "Complete guide to downloading Facebook videos, Reels, and live streams in HD quality for offline viewing.",
        href: "/blog/save-facebook-videos",
        category: "Facebook",
        color: "#1877F2",
    },
    {
        title: "How to Download YouTube Videos in 2026 – Free HD Guide",
        description: "Download YouTube videos in HD, 1080p, or 4K quality for free. Save as MP4 or extract audio. Works on all devices.",
        href: "/blog/download-youtube-videos",
        category: "YouTube",
        color: "#FF0000",
    },
    {
        title: "How to Download Twitter/X Videos in 2026 – Free Guide",
        description: "Save Twitter and X video tweets and GIFs to your phone or computer in HD quality. Supports twitter.com and x.com links.",
        href: "/blog/download-twitter-videos",
        category: "Twitter/X",
        color: "#1DA1F2",
    },
];

export default function Blog() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>SaveMyReel Blog</h1>
                <p className={styles.pageSubtitle}>Guides & tips for downloading social media videos</p>

                <div className={styles.pageContent} style={{ maxWidth: "900px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {articles.map((article, i) => (
                            <Link
                                key={i}
                                href={article.href}
                                style={{
                                    display: "block",
                                    padding: "1.5rem 2rem",
                                    background: "rgba(255,255,255,0.02)",
                                    borderRadius: "12px",
                                    border: "1px solid var(--card-border)",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <span style={{
                                    display: "inline-block",
                                    padding: "0.25rem 0.75rem",
                                    background: article.color,
                                    color: "white",
                                    borderRadius: "20px",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    marginBottom: "0.75rem",
                                }}>
                                    {article.category}
                                </span>
                                <h2 style={{ fontSize: "1.25rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
                                    {article.title}
                                </h2>
                                <p style={{ color: "var(--secondary-foreground)", lineHeight: 1.6 }}>
                                    {article.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
