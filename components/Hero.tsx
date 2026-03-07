"use client";

import { useState } from "react";
import { ArrowRight, Download, Link as LinkIcon, Loader2 } from "lucide-react";
import styles from "./Hero.module.css";
import clsx from "clsx";
import { motion } from "framer-motion";
import { DownloadResult as DownloadResultType, MediaItem } from "@/types";
import DownloadResult from "./DownloadResult";
import { instagramService } from "@/lib/services/instagram";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type Platform = 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'youtube' | 'pinterest';

const platforms = [
    { id: 'instagram' as Platform, name: 'Instagram', domain: 'instagram.com' },
    { id: 'pinterest' as Platform, name: 'Pinterest', domain: 'pinterest.com' },
    { id: 'youtube' as Platform, name: 'YouTube', domain: 'youtube.com' },
    { id: 'facebook' as Platform, name: 'Facebook', domain: 'facebook.com' },
    { id: 'tiktok' as Platform, name: 'TikTok', domain: 'tiktok.com' },
    { id: 'twitter' as Platform, name: 'X (Twitter)', domain: 'twitter.com' },
];

export default function Hero() {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<DownloadResultType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLocale();

    const validateUrl = (url: string, platform: Platform): boolean => {
        const platformData = platforms.find(p => p.id === platform);
        if (!platformData) return false;

        return url.toLowerCase().includes(platformData.domain) ||
            (platform === 'facebook' && url.includes('fb.watch')) ||
            (platform === 'twitter' && url.includes('x.com')) ||
            (platform === 'youtube' && (url.includes('youtu.be') || url.includes('m.youtube.com'))) ||
            (platform === 'pinterest' && (url.includes('pin.it') || url.includes('pinterest.com')));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        if (!validateUrl(url, selectedPlatform)) {
            setError(`This URL doesn't match the selected platform (${platforms.find(p => p.id === selectedPlatform)?.name}). Please check your selection.`);
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            // DIRECT SERVICE CALL - NO BACKEND API
            if (selectedPlatform === 'instagram' && instagramService.canHandle(url)) {
                console.log("[UI] Calling instagramService.extract directly");
                const extractResult = await instagramService.extract(url);

                // Handle the union return type
                const media = Array.isArray(extractResult) ? extractResult : extractResult.carouselItems || [{
                    url: extractResult.url,
                    thumbnail: extractResult.thumbnail,
                    type: extractResult.type,
                    filename: extractResult.filename,
                }];

                const downloadResult: DownloadResultType = {
                    url: media[0].url,
                    thumbnail: media[0].thumbnail,
                    title: "Instagram Media",
                    platform: "instagram",
                    type: media[0].type,
                    filename: media[0].filename,
                    carouselItems: media.length > 0 ? media : undefined,
                    sourceUrl: url,
                };

                setResult(downloadResult);
            } else {
                // Fallback for other platforms (use legacy API for now)
                const res = await fetch('/api/download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, platform: selectedPlatform })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to download");
                }

                // Attach original URL for server-side streaming download
                data.sourceUrl = url;
                setResult(data);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const currentPlatformName = platforms.find(p => p.id === selectedPlatform)?.name || "Instagram";

    return (
        <section className={styles.hero}>
            <div className={clsx("container", styles.container)}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.content}
                >
                    <div className={styles.badge}>
                        <span>{t("hero.badge")}</span>
                    </div>
                    <h1 className={styles.title}>
                        {t("hero.title1")} <br className={styles.break} />
                        <span className="gradient-text">{t("hero.title2")}</span> {t("hero.title3")}
                    </h1>
                    <p className={styles.subtitle}>
                        {t("hero.subtitle")}
                    </p>

                    {/* Platform Selector */}
                    <div className={styles.platformSelector}>
                        {platforms.map((platform) => (
                            <button
                                key={platform.id}
                                type="button"
                                onClick={() => setSelectedPlatform(platform.id)}
                                className={clsx(
                                    styles.platformTab,
                                    selectedPlatform === platform.id && styles.platformTabActive
                                )}
                            >
                                {platform.name}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={clsx("glass-panel", styles.inputWrapper)}>
                            <LinkIcon className={styles.inputIcon} size={20} />
                            <input
                                type="url"
                                placeholder={t("hero.paste", { platform: currentPlatformName })}
                                className={styles.input}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                            <button type="submit" className={styles.button} disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className={styles.spinner} size={20} />
                                ) : (
                                    <>
                                        <span>{t("hero.download")}</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div style={{ color: '#ef4444', marginTop: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                            {error}
                        </div>
                    )}

                    {result && (
                        <DownloadResult result={result} onReset={() => { setResult(null); setUrl(""); }} />
                    )}

                    {!result && (
                        <div className={styles.platforms}>
                            {["Instagram", "Pinterest", "YouTube", "Facebook", "TikTok", "Twitter"].map((p) => (
                                <span key={p} className={styles.platformBadge}>{p}</span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
