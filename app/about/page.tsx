"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function About() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>About SaveMyReel</h1>
                <p className={styles.pageSubtitle}>Fast, Free, and Privacy-Focused Video & Reel Downloading</p>

                <div className={styles.pageContent}>
                    <section className={styles.section}>
                        <h2>Our Mission</h2>
                        <p>
                            SaveMyReel was created with a simple mission: to provide everyone with a free, fast,
                            and secure way to download their favorite content from social media platforms. We believe
                            that people should be able to access and save publicly shared content for personal use,
                            whether it&apos;s a creative Pinterest pin, a memorable Instagram reel, a viral TikTok video,
                            an inspiring Facebook clip, or educational material shared on YouTube.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>What We Offer</h2>
                        <p>SaveMyReel is a free online video downloader that supports multiple social media platforms:</p>
                        <ul>
                            <li><strong>Pinterest Downloader:</strong> Download video pins, image pins, Idea Pins, and GIFs in full HD quality</li>
                            <li><strong>Instagram Downloader:</strong> Download Reels, posts, carousel images, stories, and IGTV videos in HD</li>
                            <li><strong>YouTube Downloader:</strong> Save YouTube videos, Shorts, and playlists as MP4 or extract audio to MP3</li>
                            <li><strong>Facebook Video Downloader:</strong> Save videos and Reels from public pages and profiles</li>
                            <li><strong>TikTok Downloader:</strong> Download TikTok videos without watermark in HD quality</li>
                            <li><strong>X (Twitter) Video Downloader:</strong> Save videos and GIFs from tweets instantly</li>
                        </ul>
                        <p style={{ marginTop: "1rem" }}>
                            All downloads are processed in real-time without storing any content on our servers.
                            SaveMyReel works on all devices — iPhone, Android, iPad, Windows, and Mac.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Why Choose SaveMyReel?</h2>
                        <ul>
                            <li>
                                <strong>Privacy First:</strong> We don&apos;t require registration, don&apos;t store URLs
                                you submit, and don&apos;t track your downloads. Your privacy is our priority.
                            </li>
                            <li>
                                <strong>Lightning Fast:</strong> Our optimized servers ensure fast download speeds.
                                Paste a link and get your video in seconds, not minutes.
                            </li>
                            <li>
                                <strong>HD Quality:</strong> We always fetch the highest quality available — up to
                                1080p and 4K when the original supports it.
                            </li>
                            <li>
                                <strong>No Watermark:</strong> Download TikTok videos and Instagram Reels without
                                watermarks whenever possible.
                            </li>
                            <li>
                                <strong>100% Free:</strong> SaveMyReel is and will always be free to use.
                                No hidden fees, no premium subscriptions.
                            </li>
                            <li>
                                <strong>No App Required:</strong> Works directly in your browser. No software
                                installation, no browser extensions needed.
                            </li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>How to Download Videos with SaveMyReel</h2>
                        <ol>
                            <li><strong>Copy:</strong> Find the video, image, or pin you want to download and copy its URL from Pinterest, Instagram, YouTube, TikTok, Facebook, or X</li>
                            <li><strong>Paste:</strong> Paste the URL into SaveMyReel&apos;s input field on the homepage</li>
                            <li><strong>Download:</strong> Click the download button and save the media to your device in HD quality</li>
                        </ol>
                        <p style={{ marginTop: "1rem" }}>
                            It&apos;s that simple! No registration, no fees, no hassle. Save your favorite reels and videos in seconds.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Responsible Use</h2>
                        <p>
                            We encourage all users to respect content creators&apos; rights. Please:
                        </p>
                        <ul>
                            <li>Only download content that is publicly available</li>
                            <li>Use downloaded content for personal purposes only</li>
                            <li>Give credit to original creators when sharing</li>
                            <li>Do not use our service to infringe on copyrights</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Contact Us</h2>
                        <p>
                            We love hearing from our users! Whether you have questions, feedback, or suggestions,
                            don&apos;t hesitate to reach out.
                        </p>
                        <ul>
                            <li>General Inquiries: <a href="mailto:support@savemyreel.online" style={{ color: "var(--primary)" }}>support@savemyreel.online</a></li>
                            <li>Contact Form: <a href="/contact" style={{ color: "var(--primary)" }}>Contact Page</a></li>
                            <li>FAQ: <a href="/faq" style={{ color: "var(--primary)" }}>Frequently Asked Questions</a></li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>Legal</h2>
                        <p>
                            For legal matters, please review our policies:
                        </p>
                        <ul>
                            <li><a href="/terms" style={{ color: "var(--primary)" }}>Terms of Service</a></li>
                            <li><a href="/privacy-policy" style={{ color: "var(--primary)" }}>Privacy Policy</a></li>
                            <li><a href="/dmca" style={{ color: "var(--primary)" }}>DMCA Policy</a></li>
                            <li><a href="/disclaimer" style={{ color: "var(--primary)" }}>Disclaimer</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
