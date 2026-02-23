"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1000);
    };

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Contact Us</h1>
                <p className={styles.pageSubtitle}>We&apos;d love to hear from you. Get in touch with us!</p>

                <div className={styles.pageContent} style={{ maxWidth: "700px" }}>
                    <section className={styles.section}>
                        <h3>Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className={styles.form} style={{ marginTop: "1rem" }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className={styles.input}
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className={styles.input}
                            />
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                                className={styles.input}
                                style={{ cursor: "pointer" }}
                            >
                                <option value="">Select Subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="support">Technical Support</option>
                                <option value="feedback">Feedback & Suggestions</option>
                                <option value="bug">Report a Bug</option>
                                <option value="business">Business Inquiry</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={6}
                                required
                                className={styles.textarea}
                            />
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>

                            {status === "success" && (
                                <p style={{ color: "#22c55e", marginTop: "0.5rem" }}>
                                    ✓ Thank you! Your message has been sent. We&apos;ll get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p style={{ color: "#ef4444", marginTop: "0.5rem" }}>
                                    ✗ Something went wrong. Please try again or email us directly.
                                </p>
                            )}
                        </form>
                    </section>

                    <section className={styles.section}>
                        <h3>Other Ways to Reach Us</h3>
                        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
                            <div>
                                <strong>General Support</strong>
                                <p>
                                    <a href="mailto:support@savemyreel.online" style={{ color: "var(--primary)" }}>
                                        support@savemyreel.online
                                    </a>
                                </p>
                            </div>
                            <div>
                                <strong>Legal & DMCA</strong>
                                <p>
                                    <a href="mailto:support@savemyreel.online" style={{ color: "var(--primary)" }}>
                                        support@savemyreel.online
                                    </a>
                                </p>
                            </div>
                            <div>
                                <strong>Privacy Concerns</strong>
                                <p>
                                    <a href="mailto:support@savemyreel.online" style={{ color: "var(--primary)" }}>
                                        support@savemyreel.online
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3>Response Time</h3>
                        <p>
                            We typically respond to inquiries within <strong>24-48 hours</strong> during business days.
                            For urgent matters, please include &quot;URGENT&quot; in your subject line.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>Before Contacting Us</h3>
                        <p>
                            You might find the answer to your question in our resources:
                        </p>
                        <ul>
                            <li><a href="/faq" style={{ color: "var(--primary)" }}>Frequently Asked Questions (FAQ)</a></li>
                            <li><a href="/terms" style={{ color: "var(--primary)" }}>Terms of Service</a></li>
                            <li><a href="/privacy-policy" style={{ color: "var(--primary)" }}>Privacy Policy</a></li>
                            <li><a href="/dmca" style={{ color: "var(--primary)" }}>DMCA Policy</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
