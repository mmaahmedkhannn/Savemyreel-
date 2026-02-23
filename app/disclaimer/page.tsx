"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function Disclaimer() {
    const lastUpdated = "January 19, 2026";

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Disclaimer</h1>
                <p className={styles.pageSubtitle}>Last updated: {lastUpdated}</p>

                <div className={styles.pageContent}>
                    <section className={styles.section}>
                        <h3>1. No Affiliation</h3>
                        <p>
                            SaveMyReel is an independent website and is <strong>NOT</strong> affiliated, associated,
                            authorized, endorsed by, or in any way officially connected with:
                        </p>
                        <ul>
                            <li>Instagram (Meta Platforms, Inc.)</li>
                            <li>Facebook (Meta Platforms, Inc.)</li>
                            <li>TikTok (ByteDance Ltd.)</li>
                            <li>X / Twitter (X Corp.)</li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            Or any of their subsidiaries, affiliates, or parent companies. The names Instagram,
                            Facebook, TikTok, Twitter, X, and related names, marks, logos, and images are registered
                            trademarks of their respective owners.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>2. Content Hosting</h3>
                        <p>
                            <strong>We do not host any media content on our servers.</strong> SaveMyReel acts as
                            a tool that facilitates downloading publicly available content directly from the respective
                            social media platforms. All files are retrieved from and remain on the original platform&apos;s
                            servers until downloaded by the user.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>3. User Responsibility</h3>
                        <p>
                            Users are solely responsible for:
                        </p>
                        <ul>
                            <li>Ensuring they have the right to download and use any content</li>
                            <li>Complying with applicable copyright laws and platform terms of service</li>
                            <li>Respecting the intellectual property rights of content creators</li>
                            <li>Any consequences resulting from the use of downloaded content</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>4. Accuracy of Information</h3>
                        <p>
                            While we strive to provide accurate and up-to-date information on our website, we make
                            no representations or warranties of any kind, express or implied, about the completeness,
                            accuracy, reliability, suitability, or availability of:
                        </p>
                        <ul>
                            <li>The website or its content</li>
                            <li>The quality of downloads</li>
                            <li>The availability of content on third-party platforms</li>
                            <li>Any information, products, services, or related graphics</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>5. External Links</h3>
                        <p>
                            Our website may contain links to external websites that are not provided or maintained by
                            or in any way affiliated with SaveMyReel. Please note that we:
                        </p>
                        <ul>
                            <li>Do not guarantee the accuracy, relevance, or completeness of any external content</li>
                            <li>Are not responsible for the content of linked sites</li>
                            <li>Do not endorse the views expressed on linked sites</li>
                            <li>Are not liable for any damages arising from external links</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>6. No Warranties</h3>
                        <p>
                            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We expressly disclaim
                            all warranties of any kind, whether express or implied, including but not limited to:
                        </p>
                        <ul>
                            <li>Implied warranties of merchantability</li>
                            <li>Fitness for a particular purpose</li>
                            <li>Non-infringement</li>
                            <li>That the service will be uninterrupted, timely, secure, or error-free</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>7. Limitation of Liability</h3>
                        <p>
                            Under no circumstances shall SaveMyReel, its operators, or affiliates be liable for
                            any direct, indirect, incidental, consequential, special, or exemplary damages arising
                            from your use of the Service, including but not limited to:
                        </p>
                        <ul>
                            <li>Loss of profits, data, or goodwill</li>
                            <li>Device damage or malfunction</li>
                            <li>Legal action taken against you by third parties</li>
                            <li>Any claim related to downloaded content</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>8. Platform Changes</h3>
                        <p>
                            Social media platforms frequently update their systems, which may affect the functionality
                            of our Service. We do not guarantee that our Service will always work with all platforms
                            or all content types. Platforms may block access at any time without notice.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>9. Changes to This Disclaimer</h3>
                        <p>
                            We reserve the right to modify this Disclaimer at any time. Changes will be effective
                            immediately upon posting. Your continued use of the Service after any modifications
                            indicates your acceptance of the updated Disclaimer.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>10. Contact</h3>
                        <p>
                            If you have any questions about this Disclaimer, please contact us:
                        </p>
                        <ul>
                            <li>Email: <a href="mailto:legal@savemyreel.online" style={{ color: "var(--primary)" }}>legal@savemyreel.online</a></li>
                            <li>Contact Page: <a href="/contact" style={{ color: "var(--primary)" }}>Contact Us</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
