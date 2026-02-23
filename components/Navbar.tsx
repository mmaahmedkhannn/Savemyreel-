"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import styles from "./Navbar.module.css";
import LanguageSelector from "./LanguageSelector";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLocale();

    return (
        <nav className={clsx("glass-panel", styles.navbar)}>
            <div className={clsx("container", styles.container)}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.iconWrapper}>
                        <Download className={styles.icon} size={24} />
                    </div>
                    <span className="gradient-text">SaveMyReel</span>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="/about" className={styles.link}>{t("nav.about")}</Link>
                    <Link href="/features" className={styles.link}>{t("nav.features")}</Link>
                    <Link href="/contact" className={styles.link}>{t("nav.contact")}</Link>
                    <LanguageSelector />
                </div>

                {/* Mobile Toggle */}
                <div className={styles.mobileToggleWrapper}>
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/about" className={styles.mobileLink} onClick={() => setIsOpen(false)}>{t("nav.about")}</Link>
                        <Link href="/features" className={styles.mobileLink} onClick={() => setIsOpen(false)}>{t("nav.features")}</Link>
                        <Link href="/contact" className={styles.mobileLink} onClick={() => setIsOpen(false)}>{t("nav.contact")}</Link>
                        <div style={{ display: "flex", justifyContent: "center", paddingTop: "0.25rem" }}>
                            <LanguageSelector />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
