"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function LanguageSelector() {
    const { locale, setLocale, locales } = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Prevent body scroll when mobile dropdown is open
    useEffect(() => {
        if (isOpen && typeof window !== "undefined" && window.innerWidth <= 640) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const currentLang = locales.find(l => l.code === locale);

    return (
        <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    padding: "0.5rem 0.6rem",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                    minHeight: "44px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                aria-label="Select Language"
                aria-expanded={isOpen}
            >
                <Globe size={20} />
                <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>{currentLang?.name?.split(" ")[0] || "EN"}</span>
            </button>

            {isOpen && (
                <>
                    {/* Mobile overlay backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        className="lang-overlay"
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            zIndex: 9998,
                            display: "none",
                        }}
                    />
                    <div
                        className="lang-dropdown"
                        style={{
                            position: "absolute",
                            top: "calc(100% + 0.5rem)",
                            right: 0,
                            backgroundColor: "#111111",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            padding: "0.5rem",
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "0.25rem",
                            minWidth: "320px",
                            maxHeight: "400px",
                            overflowY: "auto",
                            WebkitOverflowScrolling: "touch",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                            zIndex: 9999,
                        }}
                    >
                        {/* Mobile close header */}
                        <div
                            className="lang-mobile-header"
                            style={{
                                display: "none",
                                gridColumn: "1 / -1",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.5rem 0.5rem 0.75rem",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                marginBottom: "0.25rem",
                            }}
                        >
                            <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>Select Language</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "var(--secondary-foreground)",
                                    cursor: "pointer",
                                    padding: "0.25rem",
                                    display: "flex",
                                    minHeight: "auto",
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {locales.map((lang) => {
                            const isActive = locale === lang.code;
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLocale(lang.code);
                                        setIsOpen(false);
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        padding: "0.6rem 0.75rem",
                                        borderRadius: "8px",
                                        border: "none",
                                        background: isActive ? "rgba(139,92,246,0.15)" : "transparent",
                                        color: isActive ? "var(--primary)" : "var(--foreground)",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        fontWeight: isActive ? "600" : "400",
                                        transition: "background 0.15s, color 0.15s",
                                        minHeight: "44px",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = isActive ? "rgba(139,92,246,0.15)" : "transparent";
                                    }}
                                >
                                    <span>{lang.name}</span>
                                    {isActive && <Check size={14} />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile-specific styles */}
                    <style>{`
                        @media (max-width: 640px) {
                            .lang-overlay { display: block !important; }
                            .lang-mobile-header { display: flex !important; }
                            .lang-dropdown {
                                position: fixed !important;
                                bottom: 0 !important;
                                left: 0 !important;
                                right: 0 !important;
                                top: auto !important;
                                min-width: unset !important;
                                max-height: 70vh !important;
                                border-radius: 20px 20px 0 0 !important;
                                padding: 0.75rem !important;
                                grid-template-columns: repeat(2, 1fr) !important;
                                animation: langSlideUp 0.3s ease-out;
                            }
                            @keyframes langSlideUp {
                                from { transform: translateY(100%); }
                                to { transform: translateY(0); }
                            }
                        }
                    `}</style>
                </>
            )}
        </div>
    );
}
