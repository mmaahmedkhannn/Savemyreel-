import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SaveMyReel – Free Video Downloader for Instagram, TikTok, Facebook & X";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #1a0533 0%, #0d0d1a 40%, #0a0a0a 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    padding: "60px",
                }}
            >
                {/* Top badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 20px",
                        borderRadius: "50px",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        background: "rgba(139, 92, 246, 0.1)",
                        marginBottom: "24px",
                    }}
                >
                    <span style={{ fontSize: 18, color: "#a78bfa" }}>🚀 100% Free & Secure</span>
                </div>

                {/* Main title */}
                <div
                    style={{
                        display: "flex",
                        fontSize: 72,
                        fontWeight: 800,
                        letterSpacing: "-2px",
                        marginBottom: "12px",
                    }}
                >
                    <span style={{ color: "#ffffff" }}>Save</span>
                    <span
                        style={{
                            background: "linear-gradient(135deg, #8b5cf6, #a855f7, #d946ef)",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        MyReel
                    </span>
                </div>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: 28,
                        color: "#d1d5db",
                        margin: "0 0 40px 0",
                        textAlign: "center",
                        maxWidth: "800px",
                        lineHeight: 1.4,
                    }}
                >
                    Download Videos from Instagram, TikTok, Facebook, YouTube & X
                </p>

                {/* Platform pills */}
                <div style={{ display: "flex", gap: "12px" }}>
                    {[
                        { name: "Instagram", color: "#E1306C" },
                        { name: "TikTok", color: "#FE2C55" },
                        { name: "Facebook", color: "#1877F2" },
                        { name: "YouTube", color: "#FF0000" },
                        { name: "Twitter/X", color: "#1DA1F2" },
                    ].map((p) => (
                        <div
                            key={p.name}
                            style={{
                                padding: "10px 20px",
                                borderRadius: "10px",
                                background: `${p.color}22`,
                                border: `1px solid ${p.color}44`,
                                color: p.color,
                                fontSize: 18,
                                fontWeight: 600,
                            }}
                        >
                            {p.name}
                        </div>
                    ))}
                </div>

                {/* Bottom tagline */}
                <p
                    style={{
                        fontSize: 18,
                        color: "#9ca3af",
                        marginTop: "40px",
                    }}
                >
                    No Watermark • HD Quality • No Login Required
                </p>
            </div>
        ),
        { ...size }
    );
}
