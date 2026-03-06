import styles from "./StepGuide.module.css";

type Platform = "youtube" | "instagram" | "tiktok" | "facebook" | "twitter" | "pinterest";

interface StepGuideProps {
    platform: Platform;
}

const platformColors: Record<Platform, { primary: string; bg: string; accent: string }> = {
    youtube: { primary: "#FF0000", bg: "rgba(255,0,0,0.08)", accent: "#CC0000" },
    instagram: { primary: "#E1306C", bg: "rgba(225,48,108,0.08)", accent: "#C13584" },
    tiktok: { primary: "#00f2ea", bg: "rgba(0,242,234,0.08)", accent: "#ff0050" },
    facebook: { primary: "#1877F2", bg: "rgba(24,119,242,0.08)", accent: "#166FE5" },
    twitter: { primary: "#1DA1F2", bg: "rgba(29,161,242,0.08)", accent: "#0d8ecf" },
    pinterest: { primary: "#E60023", bg: "rgba(230,0,35,0.08)", accent: "#C8102E" },
};

const platformNames: Record<Platform, string> = {
    youtube: "YouTube",
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    twitter: "X (Twitter)",
    pinterest: "Pinterest",
};

const platformDomains: Record<Platform, string> = {
    youtube: "youtube.com/watch?v=...",
    instagram: "instagram.com/reel/...",
    tiktok: "tiktok.com/@user/video/...",
    facebook: "facebook.com/watch?v=...",
    twitter: "x.com/user/status/...",
    pinterest: "pinterest.com/pin/...",
};

/* ── SVG Illustrations for each step ── */

function CopyLinkIllustration({ platform }: { platform: Platform }) {
    const c = platformColors[platform];
    return (
        <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Browser chrome */}
            <rect x="10" y="10" width="200" height="130" rx="8" fill="#1a1a2e" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="10" y="10" width="200" height="24" rx="8" fill="#12122a" />
            <rect x="10" y="26" width="200" height="2" fill="rgba(255,255,255,0.05)" />
            {/* Browser dots */}
            <circle cx="24" cy="22" r="3" fill="#ff5f57" />
            <circle cx="34" cy="22" r="3" fill="#febc2e" />
            <circle cx="44" cy="22" r="3" fill="#28c840" />
            {/* Address bar */}
            <rect x="56" y="16" width="140" height="12" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="64" y="25" fontSize="6" fill="rgba(255,255,255,0.5)" fontFamily="monospace">{platformDomains[platform].substring(0, 24)}</text>
            {/* Platform content area */}
            <rect x="20" y="40" width="120" height="70" rx="4" fill={c.bg} stroke={c.primary} strokeWidth="0.5" strokeOpacity="0.3" />
            <rect x="28" y="48" width="40" height="4" rx="2" fill={c.primary} opacity="0.6" />
            <rect x="28" y="56" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
            <rect x="28" y="62" width="80" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
            {/* Video thumbnail placeholder */}
            <rect x="28" y="72" width="100" height="30" rx="4" fill="rgba(255,255,255,0.05)" />
            <polygon points="68,82 68,92 78,87" fill={c.primary} opacity="0.7" />
            {/* Share / Copy button highlighted */}
            <rect x="150" y="50" width="50" height="20" rx="6" fill={c.primary} opacity="0.9" />
            <text x="158" y="63" fontSize="7" fill="white" fontWeight="bold">Share</text>
            {/* Cursor pointing at share */}
            <path d="M185 78 L175 65" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <path d="M185 78 L187 72 L181 74 Z" fill="white" opacity="0.8" />
            {/* Copy link popup */}
            <rect x="140" y="74" width="65" height="18" rx="4" fill="#2a2a4e" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <text x="148" y="86" fontSize="6" fill="rgba(255,255,255,0.7)">📋 Copy link</text>
            {/* Animated pulse on share */}
            <circle cx="175" cy="60" r="16" fill={c.primary} opacity="0.08">
                <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.12;0.04;0.12" dur="2s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

function PasteUrlIllustration({ platform }: { platform: Platform }) {
    const c = platformColors[platform];
    return (
        <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* SaveMyReel interface */}
            <rect x="10" y="10" width="200" height="130" rx="8" fill="#0f0f23" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Header */}
            <text x="20" y="30" fontSize="9" fill="white" fontWeight="bold">Save</text>
            <text x="44" y="30" fontSize="9" fill="#8b5cf6" fontWeight="bold">My</text>
            <text x="56" y="30" fontSize="9" fill="white" fontWeight="bold">Reel</text>
            {/* Platform tabs */}
            {(["instagram", "facebook", "tiktok", "twitter", "youtube", "pinterest"] as Platform[]).map((p, i) => {
                const isActive = p === platform;
                const tabW = 36;
                const x = 16 + i * (tabW + 4);
                return (
                    <g key={p}>
                        <rect
                            x={x} y="40" width={tabW} height="14" rx="4"
                            fill={isActive ? platformColors[p].primary : "rgba(255,255,255,0.05)"}
                            opacity={isActive ? 0.9 : 0.6}
                        />
                        <text x={x + 4} y="50" fontSize="5.5" fill="white" opacity={isActive ? 1 : 0.5}>
                            {platformNames[p].substring(0, 6)}
                        </text>
                    </g>
                );
            })}
            {/* Input field with pasted URL */}
            <rect x="16" y="62" width="168" height="22" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
            <text x="22" y="76" fontSize="5.5" fill="rgba(255,255,255,0.6)" fontFamily="monospace">{platformDomains[platform]}</text>
            {/* Download button */}
            <rect x="188" y="62" width="18" height="22" rx="6" fill="#8b5cf6" />
            <text x="193" y="76" fontSize="8" fill="white">→</text>
            {/* Paste indicator */}
            <rect x="68" y="88" width="85" height="18" rx="6" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
            <text x="76" y="100" fontSize="6.5" fill="#a78bfa" fontWeight="bold">📋 Paste your URL here</text>
            {/* Arrow pointing to input */}
            <line x1="110" y1="86" x2="110" y2="82" stroke="#a78bfa" strokeWidth="1" markerEnd="url(#arrowhead)" />
            <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#a78bfa" />
                </marker>
            </defs>
            {/* Glow effect on input */}
            <rect x="16" y="62" width="168" height="22" rx="6" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4">
                <animate attributeName="stroke-opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
            </rect>
        </svg>
    );
}

function DownloadIllustration({ platform }: { platform: Platform }) {
    const c = platformColors[platform];
    const isYoutube = platform === "youtube";
    return (
        <svg viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Result card */}
            <rect x="10" y="10" width="200" height="130" rx="8" fill="#0f0f23" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            {/* Video thumbnail */}
            <rect x="18" y="18" width="90" height="55" rx="6" fill="rgba(255,255,255,0.05)" />
            <polygon points="53,38 53,50 65,44" fill={c.primary} opacity="0.8" />
            <rect x="18" y="62" width="30" height="4" rx="2" fill={c.primary} opacity="0.4" />
            {/* Video info */}
            <rect x="116" y="20" width="86" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
            <text x="120" y="28" fontSize="5.5" fill="rgba(255,255,255,0.6)">Video Title Here</text>
            <rect x="116" y="34" width="40" height="8" rx="3" fill={c.bg} stroke={c.primary} strokeWidth="0.5" strokeOpacity="0.3" />
            <text x="120" y="40" fontSize="5" fill={c.primary}>{platformNames[platform]}</text>
            {/* Quality selector (YouTube-specific or simplified) */}
            {isYoutube ? (
                <>
                    <text x="116" y="56" fontSize="5" fill="rgba(255,255,255,0.4)">Quality</text>
                    <rect x="116" y="58" width="86" height="14" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <text x="122" y="68" fontSize="6" fill="white">MP4 1080p HD ▼</text>
                </>
            ) : (
                <>
                    <rect x="116" y="48" width="60" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
                    <rect x="116" y="54" width="45" height="3" rx="1.5" fill="rgba(255,255,255,0.07)" />
                </>
            )}
            {/* Download button */}
            <rect x="18" y="82" width="184" height="26" rx="8" fill="url(#downloadGrad)" />
            <text x="70" y="99" fontSize="9" fill="white" fontWeight="bold">⬇ Download {isYoutube ? "Video" : "Now"}</text>
            <defs>
                <linearGradient id="downloadGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>
            {/* Pulse on download btn */}
            <rect x="18" y="82" width="184" height="26" rx="8" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="3">
                <animate attributeName="stroke-opacity" values="0.2;0.05;0.2" dur="1.5s" repeatCount="indefinite" />
            </rect>
            {/* Success state below */}
            <rect x="18" y="114" width="184" height="16" rx="4" fill="rgba(40,200,100,0.08)" stroke="rgba(40,200,100,0.2)" strokeWidth="0.5" />
            <text x="62" y="125" fontSize="6" fill="rgba(40,200,100,0.8)">✅ Ready to save to your device</text>
        </svg>
    );
}

/* ── Step data per platform ── */

function getSteps(platform: Platform) {
    const name = platformNames[platform];
    const tips: Record<Platform, string[]> = {
        youtube: [
            "On mobile, tap Share → Copy link. On desktop, copy from the address bar.",
            "You can also paste YouTube Shorts URLs — just copy the link the same way!",
            "Higher quality = larger file size. 720p is a great balance of quality and size.",
        ],
        instagram: [
            "Tap the ⋯ menu on any Reel or post, then tap 'Copy Link'.",
            "Works with Reels, Stories (while live), carousel posts, and IGTV videos.",
            "The download starts immediately — check your browser's download folder.",
        ],
        tiktok: [
            "Tap the Share arrow on any TikTok video, then tap 'Copy link'.",
            "Works with TikTok videos from any creator, just paste the link.",
            "Videos are saved as watermark-free MP4 files to your device.",
        ],
        facebook: [
            "Click the ⋯ menu on a video post and select 'Copy link to this post'.",
            "Works with public Facebook videos, Reels, and video posts shared with you.",
            "If the video is set to private, you'll need the owner to make it public first.",
        ],
        twitter: [
            "Click the Share icon on any tweet with a video, then 'Copy link to Tweet'.",
            "Works with videos, GIFs, and media from both X (Twitter) posts and replies.",
            "Videos are saved in the best available quality as MP4 files.",
        ],
        pinterest: [
            "Tap the three dots (...) or Share button on any pin, then select 'Copy link'.",
            "Works with video pins, image pins, Idea Pins, and GIF pins.",
            "Videos are saved as MP4 and images in their original HD quality.",
        ],
    };

    return [
        {
            number: 1,
            title: `Copy the ${name} Link`,
            description: `Open ${name} and find the video you want to download. Copy the URL from your browser's address bar, or tap the Share button and select "Copy Link".`,
            tip: tips[platform][0],
            color: platformColors[platform].primary,
            illustration: <CopyLinkIllustration platform={platform} />,
        },
        {
            number: 2,
            title: "Paste into SaveMyReel",
            description: `Go to SaveMyReel, select the "${name}" tab, and paste the copied URL into the input field. Then click the download button or press Enter.`,
            tip: tips[platform][1],
            color: "#8b5cf6",
            illustration: <PasteUrlIllustration platform={platform} />,
        },
        {
            number: 3,
            title: platform === "youtube" ? "Choose Quality & Download" : "Click Download",
            description: platform === "youtube"
                ? "Select your preferred video quality (360p, 720p, 1080p, or 4K) or choose audio-only. Then click the Download button to save it to your device."
                : `Your content will be processed in seconds. Click the "Download" button to save the video or image directly to your device.`,
            tip: tips[platform][2],
            color: "#22c55e",
            illustration: <DownloadIllustration platform={platform} />,
        },
    ];
}

export default function StepGuide({ platform }: StepGuideProps) {
    const steps = getSteps(platform);
    return (
        <div className={styles.guideContainer}>
            {steps.map((step) => (
                <div key={step.number} className={styles.stepCard}>
                    <div className={styles.stepIllustration}>
                        {step.illustration}
                    </div>
                    <div className={styles.stepContent}>
                        <h3>
                            <span
                                className={styles.stepBadge}
                                style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}aa)` }}
                            >
                                {step.number}
                            </span>
                            {step.title}
                        </h3>
                        <p>{step.description}</p>
                        <div className={styles.proTip}>
                            <strong>💡 Tip:</strong> {step.tip}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
