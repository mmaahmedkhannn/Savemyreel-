"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function Accessibility() {
    const lastUpdated = "January 19, 2026";

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Accessibility Statement</h1>
                <p className={styles.pageSubtitle}>Last updated: {lastUpdated}</p>

                <div className={styles.pageContent}>
                    <section className={styles.section}>
                        <h3>Our Commitment</h3>
                        <p>
                            SaveMyReel is committed to ensuring digital accessibility for people with disabilities.
                            We are continually improving the user experience for everyone and applying the relevant
                            accessibility standards to ensure we provide equal access to all users.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>Conformance Status</h3>
                        <p>
                            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
                            These guidelines help make web content accessible to people with a wide range of disabilities,
                            including:
                        </p>
                        <ul>
                            <li>Visual impairments</li>
                            <li>Hearing impairments</li>
                            <li>Motor limitations</li>
                            <li>Cognitive limitations</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>Accessibility Features</h3>
                        <p>We have implemented the following accessibility features:</p>
                        <ul>
                            <li><strong>Keyboard Navigation:</strong> All interactive elements are accessible via keyboard</li>
                            <li><strong>Screen Reader Support:</strong> Semantic HTML and ARIA labels for screen reader compatibility</li>
                            <li><strong>Color Contrast:</strong> Text and interactive elements meet minimum contrast ratios</li>
                            <li><strong>Resizable Text:</strong> Text can be enlarged up to 200% without loss of functionality</li>
                            <li><strong>Focus Indicators:</strong> Clear visual focus indicators for keyboard navigation</li>
                            <li><strong>Alt Text:</strong> Descriptive alternative text for images</li>
                            <li><strong>Consistent Navigation:</strong> Consistent page structure and navigation throughout the site</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>Known Limitations</h3>
                        <p>
                            While we strive for full accessibility, some content may have limitations:
                        </p>
                        <ul>
                            <li>
                                Third-party content (advertisements) may not meet all accessibility standards.
                                We work with our advertising partners to improve accessibility where possible.
                            </li>
                            <li>
                                Downloaded media inherits the accessibility features (or lack thereof) from
                                the original content creators.
                            </li>
                            <li>
                                Some dynamic content may require JavaScript. We ensure graceful degradation
                                where possible.
                            </li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>Assistive Technologies</h3>
                        <p>
                            SaveMyReel is designed to be compatible with the following assistive technologies:
                        </p>
                        <ul>
                            <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                            <li>Screen magnification software</li>
                            <li>Voice recognition software</li>
                            <li>Keyboard-only navigation</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>Browser Compatibility</h3>
                        <p>
                            For the best accessible experience, we recommend using the latest versions of:
                        </p>
                        <ul>
                            <li>Google Chrome</li>
                            <li>Mozilla Firefox</li>
                            <li>Microsoft Edge</li>
                            <li>Apple Safari</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>Feedback</h3>
                        <p>
                            We welcome your feedback on the accessibility of SaveMyReel. Please let us know
                            if you encounter accessibility barriers:
                        </p>
                        <ul>
                            <li>Email: <a href="mailto:accessibility@savemyreel.online" style={{ color: "var(--primary)" }}>accessibility@savemyreel.online</a></li>
                            <li>Contact Form: <a href="/contact" style={{ color: "var(--primary)" }}>Contact Us</a></li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            When reporting accessibility issues, please include:
                        </p>
                        <ul>
                            <li>The web page URL where you experienced the issue</li>
                            <li>Description of the problem</li>
                            <li>The assistive technology you were using (if any)</li>
                            <li>Your browser and operating system</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>Continuous Improvement</h3>
                        <p>
                            We are committed to continually improving the accessibility of our website. We regularly:
                        </p>
                        <ul>
                            <li>Review and test our website for accessibility issues</li>
                            <li>Train our team on accessibility best practices</li>
                            <li>Update our content to meet accessibility standards</li>
                            <li>Seek feedback from users with disabilities</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>Additional Resources</h3>
                        <p>
                            For more information about web accessibility:
                        </p>
                        <ul>
                            <li>
                                <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                                    Web Content Accessibility Guidelines (WCAG)
                                </a>
                            </li>
                            <li>
                                <a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                                    W3C Web Accessibility Initiative (WAI)
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
