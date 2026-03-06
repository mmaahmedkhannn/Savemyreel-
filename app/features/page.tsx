import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "../page-styles.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Features – SaveMyReel Video Downloader",
    description: "Explore SaveMyReel's powerful features: HD video & image downloads, no watermark, multi-platform support for Pinterest, Instagram, TikTok, Facebook, YouTube & X. Fast, free, and privacy-focused.",
    alternates: { canonical: "https://savemyreel.online/features" },
};

const features = [
    { emoji: "⚡", title: "Lightning Fast Downloads", description: "Our advanced servers ensure you get your videos, reels, and photos in seconds. We optimize every step of the download process for maximum speed." },
    { emoji: "🛡️", title: "100% Safe & Secure", description: "No malware, no tracking, no data storage. Your downloads are completely private and safe. We never log your activity or store your URLs." },
    { emoji: "🎬", title: "HD & 4K Quality", description: "Download Pinterest pins, Instagram Reels, TikTok videos, and Facebook clips in their original HD resolution (1080p, 4K) when available. Always the highest quality." },
    { emoji: "📱", title: "Works on All Devices", description: "Works perfectly on iPhone, Android, iPad, tablets, and desktop computers. No app installation required — just use your web browser." },
    { emoji: "✨", title: "No Watermark Downloads", description: "Download TikTok videos without watermark and save Instagram Reels clean. Get watermark-free content whenever technically possible." },
    { emoji: "🌐", title: "Multi-Platform Support", description: "Download from Pinterest, Instagram, YouTube, Facebook, TikTok, and X (Twitter). Support for pins, reels, videos, photos, carousels, GIFs, and stories." },
    { emoji: "🕐", title: "No Registration Needed", description: "Start downloading immediately. No sign-up, no account creation, no personal information required. Just paste a link and save." },
    { emoji: "🔒", title: "Privacy Focused", description: "We don't store URLs, videos, or any user data. Once you close the page, there's zero trace of your activity. Your privacy matters." },
];

export default function FeaturesPage() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>SaveMyReel Features</h1>
                <p className={styles.pageSubtitle}>
                    The fastest, safest, and easiest way to download videos from social media
                </p>

                <div className={styles.pageContent} style={{ maxWidth: "1000px" }}>
                    <section className={styles.section}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1.5rem"
                        }}>
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={styles.featureCard}
                                    style={{
                                        padding: "1.5rem",
                                        background: "rgba(255, 255, 255, 0.02)",
                                        borderRadius: "12px",
                                        border: "1px solid var(--card-border)",
                                    }}
                                >
                                    <div style={{
                                        fontSize: "2.5rem",
                                        marginBottom: "1rem",
                                    }}>
                                        {feature.emoji}
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--foreground)" }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ color: "var(--secondary-foreground)", lineHeight: "1.6" }}>
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section} style={{ marginTop: "3rem" }}>
                        <h2>Supported Platforms</h2>
                        <p style={{ marginBottom: "1rem" }}>SaveMyReel supports downloading from all major social media platforms:</p>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "1.5rem",
                            marginTop: "1rem"
                        }}>
                            {[
                                { emoji: "📌", name: "Pinterest", desc: "Video Pins, Image Pins, Idea Pins, GIFs" },
                                { emoji: "📸", name: "Instagram", desc: "Reels, Posts, Carousels, Stories, IGTV" },
                                { emoji: "▶️", name: "YouTube", desc: "Videos, Shorts, Playlists, MP4 & Audio" },
                                { emoji: "🎵", name: "TikTok", desc: "Videos without watermark, HD quality" },
                                { emoji: "📘", name: "Facebook", desc: "Videos, Reels, Public Pages" },
                                { emoji: "𝕏", name: "X (Twitter)", desc: "Videos, GIFs, Tweets" },
                            ].map((platform, i) => (
                                <div key={i} style={{ textAlign: "center", padding: "1.5rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
                                    <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{platform.emoji}</div>
                                    <h3 style={{ marginBottom: "0.25rem" }}>{platform.name}</h3>
                                    <p style={{ color: "var(--secondary-foreground)", fontSize: "0.875rem" }}>{platform.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section} style={{ marginTop: "3rem", textAlign: "center" }}>
                        <h2>Ready to Start Downloading?</h2>
                        <p style={{ marginBottom: "1.5rem" }}>
                            It&apos;s free, fast, and requires no registration. Save your favorite reels and videos now.
                        </p>
                        <Link
                            href="/"
                            style={{
                                display: "inline-block",
                                padding: "1rem 2rem",
                                background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)",
                                color: "white",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                textDecoration: "none",
                            }}
                        >
                            Start Downloading Now →
                        </Link>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
