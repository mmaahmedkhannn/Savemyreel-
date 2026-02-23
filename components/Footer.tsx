"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import clsx from "clsx";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLocale();

    return (
        <footer className={styles.footer}>
            <div className={clsx("container", styles.container)}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3 className="gradient-text">SaveMyReel</h3>
                        <p className={styles.tagline}>
                            {t("footer.tagline")}
                        </p>
                    </div>

                    <div className={styles.links}>
                        <h4>{t("footer.legal")}</h4>
                        <Link href="/privacy-policy">{t("footer.privacy")}</Link>
                        <Link href="/terms">{t("footer.terms")}</Link>
                        <Link href="/cookie-policy">Cookie Policy</Link>
                        <Link href="/dmca">DMCA</Link>
                        <Link href="/disclaimer">Disclaimer</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>{t("footer.downloaders")}</h4>
                        <Link href="/instagram-downloader">Instagram Downloader</Link>
                        <Link href="/tiktok-downloader">TikTok Downloader</Link>
                        <Link href="/facebook-downloader">Facebook Downloader</Link>
                        <Link href="/twitter-downloader">Twitter Downloader</Link>
                        <Link href="/youtube-downloader">YouTube Downloader</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>{t("footer.guides")}</h4>
                        <Link href="/blog/how-to-download-instagram-reels">Download Instagram Reels</Link>
                        <Link href="/blog/download-tiktok-without-watermark">TikTok Without Watermark</Link>
                        <Link href="/blog/save-facebook-videos">Save Facebook Videos</Link>
                        <Link href="/blog">All Guides</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>{t("footer.support")}</h4>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/accessibility">Accessibility</Link>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>&copy; {currentYear} SaveMyReel. {t("footer.copyright")}</p>
                    <p className={styles.disclaimer}>
                        SaveMyReel is not affiliated with Instagram, Facebook, TikTok, YouTube, or X. All trademarks belong to their respective owners.
                    </p>
                </div>
            </div>
        </footer>
    );
}
