"use client";

import { useState, type ReactNode } from "react";
import styles from "./HowItWorks.module.css";
import clsx from "clsx";

type Platform = "youtube" | "instagram" | "tiktok" | "facebook" | "twitter" | "pinterest";

/* SVG brand icons */
const PlatformIcons: Record<Platform, ReactNode> = {
    instagram: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
    ),
    youtube: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
    ),
    tiktok: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
    ),
    facebook: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
    ),
    twitter: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    ),
    pinterest: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" /></svg>
    ),
};

const platforms: { id: Platform; name: string; color: string }[] = [
    { id: "instagram", name: "Instagram", color: "#E1306C" },
    { id: "youtube", name: "YouTube", color: "#FF0000" },
    { id: "tiktok", name: "TikTok", color: "#00f2ea" },
    { id: "facebook", name: "Facebook", color: "#1877F2" },
    { id: "twitter", name: "X (Twitter)", color: "#1DA1F2" },
    { id: "pinterest", name: "Pinterest", color: "#E60023" },
];

const platformDomains: Record<Platform, string> = {
    youtube: "youtube.com/watch?v=...",
    instagram: "instagram.com/reel/...",
    tiktok: "tiktok.com/@user/video/...",
    facebook: "facebook.com/watch?v=...",
    twitter: "x.com/user/status/...",
    pinterest: "pinterest.com/pin/...",
};

const platformNames: Record<Platform, string> = {
    youtube: "YouTube",
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    twitter: "X (Twitter)",
    pinterest: "Pinterest",
};

const stepTips: Record<Platform, string[]> = {
    youtube: [
        "On mobile, tap Share → Copy link. On desktop, copy from the address bar.",
        "You can also paste YouTube Shorts URLs — they work the same way!",
        "Choose from 360p to 4K quality, or extract audio only.",
    ],
    instagram: [
        "Tap the ⋯ menu on any Reel or post, then tap 'Copy Link'.",
        "Works with Reels, carousel posts, Stories, and IGTV videos.",
        "The download starts immediately — check your browser's download folder.",
    ],
    tiktok: [
        "Tap the Share arrow on any TikTok video, then tap 'Copy link'.",
        "Works with TikTok videos from any creator.",
        "Videos are saved as watermark-free MP4 files.",
    ],
    facebook: [
        "Click the ⋯ menu on a video post and select 'Copy link to this post'.",
        "Works with public Facebook videos, Reels, and video posts.",
        "Videos are downloaded in the best available HD quality.",
    ],
    twitter: [
        "Click the Share icon on any tweet, then 'Copy link to Tweet'.",
        "Works with videos, GIFs, and media from both posts and replies.",
        "Videos are saved as MP4 files in the best quality.",
    ],
    pinterest: [
        "Tap the three dots (...) or Share button on any pin, then 'Copy link'.",
        "Works with video pins, image pins, Idea Pins, and GIF pins.",
        "Videos save as MP4 and images in original HD quality.",
    ],
};

/* ── SVG Illustrations ── */

function Step1SVG({ platform }: { platform: Platform }) {
    const color = platforms.find(p => p.id === platform)?.color || "#8b5cf6";
    return (
        <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.illustration}>
            <rect x="10" y="8" width="260" height="144" rx="10" fill="#1a1a2e" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="10" y="8" width="260" height="26" rx="10" fill="#12122a" />
            <rect x="10" y="28" width="260" height="2" fill="rgba(255,255,255,0.04)" />
            <circle cx="26" cy="21" r="4" fill="#ff5f57" />
            <circle cx="38" cy="21" r="4" fill="#febc2e" />
            <circle cx="50" cy="21" r="4" fill="#28c840" />
            <rect x="66" y="14" width="180" height="14" rx="5" fill="rgba(255,255,255,0.06)" />
            <text x="76" y="24" fontSize="7" fill="rgba(255,255,255,0.45)" fontFamily="monospace">{platformDomains[platform]}</text>

            {/* Video thumbnail area */}
            <rect x="22" y="42" width="150" height="85" rx="6" fill={`${color}10`} stroke={color} strokeWidth="0.5" strokeOpacity="0.25" />
            <rect x="32" y="50" width="55" height="5" rx="2.5" fill={color} opacity="0.5" />
            <rect x="32" y="60" width="120" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
            <rect x="32" y="68" width="95" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x="32" y="80" width="120" height="38" rx="5" fill="rgba(255,255,255,0.04)" />
            <polygon points="80,93 80,107 94,100" fill={color} opacity="0.7" />

            {/* Share button */}
            <rect x="190" y="55" width="65" height="24" rx="8" fill={color} opacity="0.9" />
            <text x="200" y="71" fontSize="9" fill="white" fontWeight="bold">Share</text>
            <circle cx="222" cy="67" r="18" fill={color} opacity="0.06">
                <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.02;0.1" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Copy link popup */}
            <rect x="182" y="84" width="80" height="22" rx="6" fill="#2a2a4e" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <text x="192" y="99" fontSize="8" fill="rgba(255,255,255,0.7)">📋 Copy link</text>

            {/* Cursor */}
            <path d="M248 108 L236 92" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M248 108 L250 100 L244 102 Z" fill="white" opacity="0.7" />
        </svg>
    );
}

function Step2SVG({ platform }: { platform: Platform }) {
    const color = platforms.find(p => p.id === platform)?.color || "#8b5cf6";
    return (
        <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.illustration}>
            <rect x="10" y="8" width="260" height="144" rx="10" fill="#0f0f23" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Logo */}
            <text x="22" y="30" fontSize="11" fill="white" fontWeight="bold">Save</text>
            <text x="52" y="30" fontSize="11" fill="#8b5cf6" fontWeight="bold">My</text>
            <text x="68" y="30" fontSize="11" fill="white" fontWeight="bold">Reel</text>

            {/* Platform tabs */}
            {platforms.map((p, i) => {
                const isActive = p.id === platform;
                const tabW = 46;
                const x = 18 + i * (tabW + 4);
                return (
                    <g key={p.id}>
                        <rect x={x} y="42" width={tabW} height="16" rx="5" fill={isActive ? p.color : "rgba(255,255,255,0.04)"} opacity={isActive ? 0.9 : 0.5} />
                        <text x={x + 5} y="54" fontSize="7" fill="white" opacity={isActive ? 1 : 0.4}>{p.name.substring(0, 7)}</text>
                    </g>
                );
            })}

            {/* URL input */}
            <rect x="18" y="68" width="218" height="26" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
            <text x="28" y="85" fontSize="7" fill="rgba(255,255,255,0.55)" fontFamily="monospace">{platformDomains[platform]}</text>
            <rect x="240" y="68" width="24" height="26" rx="8" fill="#8b5cf6" />
            <text x="248" y="86" fontSize="11" fill="white">→</text>

            {/* Input glow */}
            <rect x="18" y="68" width="218" height="26" rx="8" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="4">
                <animate attributeName="stroke-opacity" values="0.12;0.04;0.12" dur="2s" repeatCount="indefinite" />
            </rect>

            {/* Paste hint */}
            <rect x="70" y="102" width="140" height="22" rx="7" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
            <text x="82" y="117" fontSize="8" fill="#a78bfa" fontWeight="bold">📋 Paste your URL here</text>
            <line x1="140" y1="100" x2="140" y2="94" stroke="#a78bfa" strokeWidth="1.2" markerEnd="url(#arrow2)" />
            <defs>
                <marker id="arrow2" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#a78bfa" />
                </marker>
            </defs>
        </svg>
    );
}

function Step3SVG({ platform }: { platform: Platform }) {
    const color = platforms.find(p => p.id === platform)?.color || "#8b5cf6";
    const isYT = platform === "youtube";
    return (
        <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.illustration}>
            <rect x="10" y="8" width="260" height="144" rx="10" fill="#0f0f23" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* Thumbnail */}
            <rect x="20" y="18" width="110" height="65" rx="6" fill="rgba(255,255,255,0.04)" />
            <polygon points="63,42 63,56 77,49" fill={color} opacity="0.7" />
            <rect x="20" y="74" width="40" height="5" rx="2.5" fill={color} opacity="0.35" />

            {/* Video info */}
            <rect x="142" y="20" width="120" height="12" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="148" y="30" fontSize="7" fill="rgba(255,255,255,0.55)">Video Title Here</text>
            <rect x="142" y="36" width="50" height="10" rx="4" fill={`${color}18`} stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
            <text x="148" y="44" fontSize="6" fill={color}>{platformNames[platform]}</text>

            {/* Quality selector for YouTube, info for others */}
            {isYT ? (
                <>
                    <text x="142" y="62" fontSize="6" fill="rgba(255,255,255,0.35)">Quality / Format</text>
                    <rect x="142" y="66" width="120" height="16" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <text x="150" y="78" fontSize="7.5" fill="white">MP4 1080p Full HD ▾</text>
                </>
            ) : (
                <>
                    <rect x="142" y="56" width="80" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
                    <rect x="142" y="64" width="60" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
                </>
            )}

            {/* Download button */}
            <rect x="20" y="94" width="244" height="30" rx="10" fill="url(#dlGrad)" />
            <text x="88" y="114" fontSize="11" fill="white" fontWeight="bold">⬇ Download {isYT ? "Video" : "Now"}</text>
            <defs>
                <linearGradient id="dlGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>
            <rect x="20" y="94" width="244" height="30" rx="10" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="3">
                <animate attributeName="stroke-opacity" values="0.2;0.06;0.2" dur="1.5s" repeatCount="indefinite" />
            </rect>

            {/* Success bar */}
            <rect x="20" y="132" width="244" height="14" rx="5" fill="rgba(40,200,100,0.06)" stroke="rgba(40,200,100,0.15)" strokeWidth="0.5" />
            <text x="80" y="142" fontSize="7" fill="rgba(40,200,100,0.75)">✅ Ready to save to your device</text>
        </svg>
    );
}

/* ── Main Component ── */

export default function HowItWorks() {
    const [activePlatform, setActivePlatform] = useState<Platform>("instagram");

    const steps = [
        {
            number: 1,
            title: `Copy the ${platformNames[activePlatform]} Link`,
            desc: `Open ${platformNames[activePlatform]} and find the video you want to download. Copy the URL from the address bar or tap Share → Copy Link.`,
            tip: stepTips[activePlatform][0],
            color: platforms.find(p => p.id === activePlatform)!.color,
            svg: <Step1SVG platform={activePlatform} />,
        },
        {
            number: 2,
            title: "Paste into SaveMyReel",
            desc: `Select the "${platformNames[activePlatform]}" tab on SaveMyReel and paste the copied URL into the input field.`,
            tip: stepTips[activePlatform][1],
            color: "#8b5cf6",
            svg: <Step2SVG platform={activePlatform} />,
        },
        {
            number: 3,
            title: activePlatform === "youtube" ? "Choose Quality & Download" : "Click Download",
            desc: activePlatform === "youtube"
                ? "Select your preferred quality (360p–4K) or audio-only, then click Download to save."
                : "Your content is processed in seconds. Click Download to save the video or image to your device.",
            tip: stepTips[activePlatform][2],
            color: "#22c55e",
            svg: <Step3SVG platform={activePlatform} />,
        },
    ];

    return (
        <section className={styles.section}>
            <div className={clsx("container", styles.container)}>
                <h2 className={styles.heading}>
                    How It <span className="gradient-text">Works</span>
                </h2>
                <p className={styles.subtitle}>Download videos in 3 easy steps — no apps, no signup</p>

                {/* Platform switcher */}
                <div className={styles.platformSwitcher}>
                    {platforms.map((p) => (
                        <button
                            key={p.id}
                            className={clsx(styles.platformTab, activePlatform === p.id && styles.platformTabActive)}
                            style={{
                                borderColor: activePlatform === p.id ? p.color : "transparent",
                                background: activePlatform === p.id ? `${p.color}15` : undefined,
                            }}
                            onClick={() => setActivePlatform(p.id)}
                        >
                            <span className={styles.platformIcon} style={{ color: activePlatform === p.id ? p.color : undefined }}>{PlatformIcons[p.id]}</span>
                            {p.name}
                        </button>
                    ))}
                </div>

                {/* Steps */}
                <div className={styles.stepsGrid}>
                    {steps.map((step) => (
                        <div key={step.number} className={styles.stepCard}>
                            <div className={styles.illustrationWrap}>
                                {step.svg}
                            </div>
                            <div className={styles.stepBody}>
                                <div className={styles.stepHeader}>
                                    <span
                                        className={styles.stepNum}
                                        style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}aa)` }}
                                    >
                                        {step.number}
                                    </span>
                                    <h3>{step.title}</h3>
                                </div>
                                <p className={styles.stepDesc}>{step.desc}</p>
                                <div className={styles.tipBox}>
                                    <strong>💡 Tip:</strong> {step.tip}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
