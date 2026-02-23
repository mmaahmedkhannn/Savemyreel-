"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function Terms() {
    const lastUpdated = "January 19, 2026";

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Terms of Service</h1>
                <p className={styles.pageSubtitle}>Last updated: {lastUpdated}</p>

                <div className={styles.pageContent}>
                    <section className={styles.section}>
                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            By accessing and using SaveMyReel (&quot;the Service&quot;), you accept and agree to be bound
                            by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>2. Description of Service</h3>
                        <p>
                            SaveMyReel provides a free online tool that allows users to download publicly available
                            media content (videos, images) from social media platforms including Instagram, Facebook,
                            TikTok, and X (formerly Twitter). The Service retrieves content directly from the respective
                            platforms&apos; servers; we do not host any media content ourselves.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>3. Eligibility</h3>
                        <p>
                            You must be at least 13 years of age to use this Service. By using the Service, you represent
                            and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>4. User Responsibilities</h3>
                        <p>You agree to:</p>
                        <ul>
                            <li>Use the Service only for lawful purposes</li>
                            <li>Download only content that is publicly available</li>
                            <li>Respect the intellectual property rights of content creators</li>
                            <li>Use downloaded content for personal, non-commercial purposes only</li>
                            <li>Comply with the terms of service of the source platforms</li>
                            <li>Not use the Service to infringe on any third-party rights</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>5. Prohibited Uses</h3>
                        <p>You may NOT use the Service to:</p>
                        <ul>
                            <li>Download copyrighted content without permission from the copyright holder</li>
                            <li>Download private or restricted content</li>
                            <li>Redistribute or sell downloaded content commercially</li>
                            <li>Attempt to circumvent any security measures or rate limits</li>
                            <li>Use automated scripts, bots, or scraping tools excessively</li>
                            <li>Engage in any activity that disrupts or interferes with the Service</li>
                            <li>Use the Service for any illegal or unauthorized purpose</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>6. Intellectual Property Rights</h3>
                        <p>
                            The content you download from social media platforms belongs to the original creators or
                            copyright holders. By using our Service, you acknowledge that:
                        </p>
                        <ul>
                            <li>Downloaded content remains subject to its original copyright</li>
                            <li>You do not gain any ownership rights to the downloaded content</li>
                            <li>You are solely responsible for how you use downloaded content</li>
                            <li>The SaveMyReel website and its original content are our property</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>7. Disclaimer of Warranties</h3>
                        <p>
                            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
                            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                        </p>
                        <ul>
                            <li>WARRANTIES OF MERCHANTABILITY</li>
                            <li>FITNESS FOR A PARTICULAR PURPOSE</li>
                            <li>NON-INFRINGEMENT</li>
                            <li>ACCURACY OR RELIABILITY OF CONTENT</li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            We do not guarantee that the Service will be uninterrupted, secure, or error-free.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>8. Limitation of Liability</h3>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAVEMYREEL SHALL NOT BE LIABLE FOR ANY
                            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
                            LIMITED TO:
                        </p>
                        <ul>
                            <li>Loss of profits, data, or goodwill</li>
                            <li>Service interruption or computer damage</li>
                            <li>Cost of substitute services</li>
                            <li>Any damages arising from your use of the Service</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>9. Indemnification</h3>
                        <p>
                            You agree to defend, indemnify, and hold harmless SaveMyReel and its operators from
                            any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
                        </p>
                        <ul>
                            <li>Your use of the Service</li>
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any third-party rights</li>
                            <li>Any content you download or actions you take with downloaded content</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>10. Third-Party Links and Services</h3>
                        <p>
                            The Service may contain links to third-party websites or services. We are not responsible
                            for the content, privacy policies, or practices of any third-party sites. You access
                            third-party links at your own risk.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>11. Modifications to Service</h3>
                        <p>
                            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof)
                            at any time without notice. We shall not be liable to you or any third party for any
                            modification, suspension, or discontinuation of the Service.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>12. Changes to Terms</h3>
                        <p>
                            We may revise these Terms at any time by updating this page. The &quot;Last updated&quot; date at
                            the top of this page indicates when these Terms were last revised. Your continued use of
                            the Service after any changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>13. Governing Law</h3>
                        <p>
                            These Terms shall be governed by and construed in accordance with applicable laws, without
                            regard to conflict of law principles. Any disputes arising from these Terms or the Service
                            shall be resolved in the appropriate courts.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>14. Severability</h3>
                        <p>
                            If any provision of these Terms is found to be unenforceable or invalid, that provision
                            shall be limited or eliminated to the minimum extent necessary, and the remaining provisions
                            shall remain in full force and effect.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>15. Entire Agreement</h3>
                        <p>
                            These Terms, together with our Privacy Policy and any other legal notices published on the
                            Service, constitute the entire agreement between you and SaveMyReel regarding your use
                            of the Service.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>16. Contact Us</h3>
                        <p>
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <ul>
                            <li>Email: <a href="mailto:support@savemyreel.online" style={{ color: "var(--primary)" }}>support@savemyreel.online</a></li>
                            <li>Contact Page: <a href="/contact" style={{ color: "var(--primary)" }}>Contact Us</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
