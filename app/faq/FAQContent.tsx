"use client";

import { useState } from "react";
import styles from "../page-styles.module.css";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

interface Props {
    faqData: FAQItem[];
}

export default function FAQContent({ faqData }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>("All");

    const categories = ["All", ...Array.from(new Set(faqData.map(item => item.category)))];
    const filteredFAQ = filterCategory === "All"
        ? faqData
        : faqData.filter(item => item.category === filterCategory);

    return (
        <div className={`container ${styles.pageContainer}`}>
            <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
            <p className={styles.pageSubtitle}>Find answers to common questions about SaveMyReel video downloader</p>

            <div className={styles.pageContent} style={{ maxWidth: "900px" }}>
                {/* Category Filter */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilterCategory(category)}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "20px",
                                border: "1px solid var(--card-border)",
                                background: filterCategory === category ? "var(--primary)" : "transparent",
                                color: filterCategory === category ? "white" : "var(--secondary-foreground)",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filteredFAQ.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid var(--card-border)",
                                borderRadius: "8px",
                                overflow: "hidden",
                                transition: "all 0.3s ease"
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                style={{
                                    width: "100%",
                                    padding: "1rem 1.25rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    background: "rgba(255,255,255,0.02)",
                                    border: "none",
                                    color: "var(--foreground)",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "1rem",
                                    fontWeight: 500
                                }}
                            >
                                <span>{item.question}</span>
                                <span style={{
                                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.3s ease",
                                    fontSize: "1.25rem"
                                }}>
                                    ▼
                                </span>
                            </button>
                            <div style={{
                                maxHeight: openIndex === index ? "500px" : "0",
                                overflow: "hidden",
                                transition: "max-height 0.3s ease",
                                background: "rgba(0,0,0,0.2)"
                            }}>
                                <p style={{
                                    padding: "1rem 1.25rem",
                                    color: "var(--secondary-foreground)",
                                    lineHeight: "1.6"
                                }}>
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <section className={styles.section} style={{ marginTop: "2rem" }}>
                    <h3>Still Have Questions?</h3>
                    <p>
                        If you couldn&apos;t find the answer you were looking for, feel free to reach out to us:
                    </p>
                    <ul>
                        <li><a href="/contact" style={{ color: "var(--primary)" }}>Contact Us</a></li>
                        <li>Email: <a href="mailto:support@savemyreel.online" style={{ color: "var(--primary)" }}>support@savemyreel.online</a></li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
