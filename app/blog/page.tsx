import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import styles from "../page-styles.module.css";

export const metadata: Metadata = {
    title: "Blog – Video Download Guides & Tips",
    description: "Learn how to download videos and images from Pinterest, Instagram, YouTube, TikTok, Facebook, and Twitter. Step-by-step guides, tips, and tricks for saving social media content for free.",
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
        title: "How to Save Instagram Stories Without Them Knowing",
        description: "Download Instagram Stories anonymously without the user knowing. Free methods for iPhone, Android & PC. No login required.",
        href: "/blog/save-instagram-stories",
        category: "Instagram",
        color: "#E1306C",
    },
    {
        title: "5 Best Free Instagram Video Downloaders Online (2026)",
        description: "We tested dozens of tools — here are the safest and fastest Instagram downloaders that actually work in 2026.",
        href: "/blog/best-instagram-video-downloaders",
        category: "Instagram",
        color: "#E1306C",
    },
    {
        title: "Instagram Reel Download vs Screen Recording — Which is Better?",
        description: "Detailed comparison of downloading Reels vs screen recording. See why one method wins every time.",
        href: "/blog/instagram-reel-download-vs-screen-recording",
        category: "Instagram",
        color: "#E1306C",
    },
    {
        title: "How to Download Instagram Photos in Full Quality",
        description: "Save Instagram photos, carousel posts, and profile pictures in original HD resolution. No compression.",
        href: "/blog/download-instagram-photos-full-quality",
        category: "Instagram",
        color: "#E1306C",
    },
    {
        title: "How to Download YouTube Videos in 2026 – Free HD Guide",
        description: "Download YouTube videos in HD, 1080p, or 4K quality for free. Save as MP4 or extract audio. Works on all devices.",
        href: "/blog/download-youtube-videos",
        category: "YouTube",
        color: "#FF0000",
    },
    {
        title: "How to Download YouTube Shorts as MP4 in 2026",
        description: "Save any YouTube Short to your phone or computer as an MP4 file. Free, no app needed, works on all devices.",
        href: "/blog/download-youtube-shorts",
        category: "YouTube",
        color: "#FF0000",
    },
    {
        title: "YouTube to MP3 Converter — Free & Safe Online Tool",
        description: "Convert YouTube videos to MP3 audio files for free. Safe, fast, and no app required. Works on all devices.",
        href: "/blog/youtube-to-mp3-converter",
        category: "YouTube",
        color: "#FF0000",
    },
    {
        title: "How to Download YouTube Playlists for Free",
        description: "Save entire YouTube playlists for offline viewing. Download every video as MP4. Multiple methods compared.",
        href: "/blog/download-youtube-playlists",
        category: "YouTube",
        color: "#FF0000",
    },
    {
        title: "Is It Legal to Download YouTube Videos? (2026 Guide)",
        description: "Understand copyright law, fair use, and the legality of downloading YouTube videos. Comprehensive legal guide.",
        href: "/blog/is-it-legal-to-download-youtube-videos",
        category: "YouTube",
        color: "#FF0000",
    },
    {
        title: "How to Save Facebook Videos to Your Phone or Computer",
        description: "Complete guide to downloading Facebook videos, Reels, and live streams in HD quality for offline viewing.",
        href: "/blog/save-facebook-videos",
        category: "Facebook",
        color: "#1877F2",
    },
    {
        title: "How to Download Facebook Videos on iPhone & Android",
        description: "Step-by-step guide to saving Facebook videos to your phone in HD. Covers both iPhone and Android devices.",
        href: "/blog/download-facebook-videos-iphone-android",
        category: "Facebook",
        color: "#1877F2",
    },
    {
        title: "How to Download Twitter/X Videos in 2026 – Free Guide",
        description: "Save Twitter and X video tweets and GIFs to your phone or computer in HD quality. Supports twitter.com and x.com links.",
        href: "/blog/download-twitter-videos",
        category: "Twitter/X",
        color: "#1DA1F2",
    },
    {
        title: "How to Download TikTok Videos Without Watermark",
        description: "Save TikTok videos to your device without the watermark overlay. Works on iPhone, Android, and desktop.",
        href: "/blog/download-tiktok-without-watermark",
        category: "TikTok",
        color: "#FE2C55",
    },
    {
        title: "How to Download Pinterest Videos for Free",
        description: "Save Pinterest video pins, Idea Pins, and GIFs to your phone or computer. Free, no app required.",
        href: "/blog/download-pinterest-videos",
        category: "Pinterest",
        color: "#E60023",
    },
    {
        title: "How to Download Pinterest Images in HD Quality",
        description: "Save Pinterest images and photos in full HD resolution. Download pins in original quality for free. No app needed.",
        href: "/blog/download-pinterest-images-hd",
        category: "Pinterest",
        color: "#E60023",
    },
    {
        title: "5 Best Free Pinterest Downloaders Online (2026)",
        description: "We tested dozens of Pinterest downloaders — here are the 5 safest and fastest tools that actually work.",
        href: "/blog/best-pinterest-downloaders",
        category: "Pinterest",
        color: "#E60023",
    },
    {
        title: "How to Download Pinterest Idea Pins & Stories",
        description: "Download Pinterest Idea Pins (multi-page stories) with videos and images for free in HD quality.",
        href: "/blog/download-pinterest-idea-pins",
        category: "Pinterest",
        color: "#E60023",
    },
    {
        title: "Pinterest Downloader for iPhone & Android — Save Pins to Phone",
        description: "Download Pinterest videos and images to your phone for free. Step-by-step guide for iPhone & Android.",
        href: "/blog/pinterest-downloader-iphone-android",
        category: "Pinterest",
        color: "#E60023",
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
