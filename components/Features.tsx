"use client";

import { ShieldCheck, Zap, Video, Smartphone } from "lucide-react";
import styles from "./Features.module.css";
import clsx from "clsx";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export default function Features() {
    const { t } = useLocale();

    const features = [
        {
            icon: <Zap size={32} />,
            titleKey: "features.fast.title",
            descKey: "features.fast.desc",
        },
        {
            icon: <ShieldCheck size={32} />,
            titleKey: "features.secure.title",
            descKey: "features.secure.desc",
        },
        {
            icon: <Video size={32} />,
            titleKey: "features.quality.title",
            descKey: "features.quality.desc",
        },
        {
            icon: <Smartphone size={32} />,
            titleKey: "features.mobile.title",
            descKey: "features.mobile.desc",
        },
    ];

    return (
        <section className={styles.section}>
            <div className={clsx("container", styles.container)}>
                <h2 className={styles.heading}>{t("features.heading")} <span className="gradient-text">SaveMyReel?</span></h2>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={clsx("glass-panel", styles.card)}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.title}>{t(feature.titleKey)}</h3>
                            <p className={styles.description}>{t(feature.descKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
