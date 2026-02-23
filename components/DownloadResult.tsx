import { Download, FileVideo, Image as ImageIcon } from "lucide-react";
import styles from "./DownloadResult.module.css";
import clsx from "clsx";
import { DownloadResult as DownloadResultType } from "@/types";
import { useState } from "react";

interface Props {
    result: DownloadResultType;
    onReset: () => void;
}

/** Proxy CDN URLs through our server to bypass CORS for previews */
function proxyUrl(url: string, platform: string): string {
    if ((platform === 'instagram' || platform === 'tiktok' || platform === 'youtube') && url) {
        return `/api/proxy?url=${encodeURIComponent(url)}`;
    }
    return url;
}

export default function DownloadResult({ result, onReset }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const hasCarousel = result.carouselItems && result.carouselItems.length > 1;

    const [selectedQuality, setSelectedQuality] = useState(0);
    const qualityOptions = result.metadata?.qualityOptions as { label: string; url: string; quality: string; ext: string }[] | undefined;

    const handleDownload = (downloadFilename: string, formatOverride?: string) => {
        const itemToDownload = hasCarousel ? result.carouselItems![selectedIndex] : result;
        const targetUrl = itemToDownload.url;

        if (!targetUrl) {
            console.error("[Download] No URL available to download");
            return;
        }

        // Use the new server-side proxy endpoint to bypass CORS and force download
        const streamUrl = `/api/stream?url=${encodeURIComponent(targetUrl)}&filename=${encodeURIComponent(downloadFilename || 'download.mp4')}`;

        // Open in new tab to trigger download without blocking UI
        window.open(streamUrl, '_blank');
    };

    const handleDownloadAll = () => {
        if (!result.carouselItems) return;

        // Download all items with a small delay between each
        result.carouselItems.forEach((item, index) => {
            setTimeout(() => {
                handleDownload(item.filename || `download_${index + 1}`);
            }, index * 500); // 500ms delay between downloads
        });
    };

    const currentItem = hasCarousel ? result.carouselItems![selectedIndex] : result;

    return (
        <div className={clsx("glass-panel", styles.card)}>
            <div className={styles.preview}>
                {currentItem.type === 'video' ? (
                    <video
                        src={proxyUrl(currentItem.url, result.platform)}
                        controls
                        poster={proxyUrl(currentItem.thumbnail || '', result.platform)}
                        className={styles.media}
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={proxyUrl(currentItem.url, result.platform)}
                        alt={result.title || "Downloaded content"}
                        className={styles.media}
                    />
                )}
            </div>

            {hasCarousel && (
                <div className={styles.carouselInfo}>
                    <p className={styles.carouselCount}>
                        {selectedIndex + 1} / {result.carouselItems!.length}
                    </p>
                </div>
            )}

            {hasCarousel && (
                <div className={styles.thumbnailGrid}>
                    {result.carouselItems!.map((item, index) => (
                        <div
                            key={index}
                            className={clsx(
                                styles.thumbnailItem,
                                selectedIndex === index && styles.thumbnailActive
                            )}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {item.type === 'video' ? (
                                <div className={styles.thumbnailWrapper}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={proxyUrl(item.thumbnail || item.url, result.platform)}
                                        alt={`Media ${index + 1}`}
                                        className={styles.thumbnail}
                                    />
                                    <div className={styles.videoOverlay}>
                                        <FileVideo size={20} />
                                    </div>
                                </div>
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={proxyUrl(item.url, result.platform)}
                                    alt={`Image ${index + 1}`}
                                    className={styles.thumbnail}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.info}>
                <div className={styles.meta}>
                    <span className={styles.platformBadge}>{result.platform}</span>
                    <h3 className={styles.title}>
                        {result.title || "Media Found"}
                        {hasCarousel && ` (${result.carouselItems!.length} items)`}
                    </h3>
                </div>

                {/* YouTube Quality Selector */}
                {qualityOptions && qualityOptions.length > 0 && (
                    <div style={{ marginBottom: '0.75rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--secondary-foreground)', marginBottom: '0.375rem', display: 'block' }}>Quality / Format</label>
                        <select
                            value={selectedQuality}
                            onChange={(e) => setSelectedQuality(Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '0.625rem 0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '8px',
                                color: 'var(--foreground)',
                                fontSize: '0.9375rem',
                                cursor: 'pointer',
                            }}
                        >
                            {qualityOptions.map((opt, i) => (
                                <option key={i} value={i} style={{ background: '#1a1a2e' }}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className={styles.actions}>
                    {hasCarousel ? (
                        <>
                            <button
                                onClick={() => handleDownload(currentItem.filename || 'download')}
                                className={styles.downloadBtn}
                            >
                                <Download size={20} />
                                Download Selected {currentItem.type === 'video' ? 'Video' : 'Image'}
                            </button>
                            <button
                                onClick={handleDownloadAll}
                                className={styles.downloadAllBtn}
                            >
                                <Download size={20} />
                                Download All ({result.carouselItems!.length})
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                const selectedOpt = qualityOptions?.[selectedQuality];
                                const ext = selectedOpt?.ext || 'mp4';
                                const fname = result.filename?.replace(/\.\w+$/, `.${ext}`) || `download.${ext}`;
                                // Build yt-dlp format string from quality selection
                                let format = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best';
                                if (selectedOpt) {
                                    if (selectedOpt.quality === 'audio') {
                                        format = 'bestaudio[ext=m4a]/bestaudio';
                                    } else {
                                        const height = selectedOpt.quality.replace('p', '');
                                        format = `bestvideo[height<=${height}][ext=mp4]+bestaudio[ext=m4a]/best[height<=${height}][ext=mp4]/best[height<=${height}]/best`;
                                    }
                                }
                                handleDownload(fname, format);
                            }}
                            className={styles.downloadBtn}
                        >
                            <Download size={20} />
                            Download {qualityOptions?.[selectedQuality]?.quality === 'audio' ? 'Audio' : (result.type === 'video' ? 'Video' : 'Image')}
                        </button>
                    )}
                    <button onClick={onReset} className={styles.resetBtn}>
                        Download Another
                    </button>
                </div>
            </div>
        </div>
    );
}
