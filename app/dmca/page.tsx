"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function DMCA() {
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>DMCA Policy</h1>
                <p className={styles.pageSubtitle}>Digital Millennium Copyright Act Compliance</p>

                <div className={styles.pageContent}>
                    <section className={styles.section}>
                        <h3>1. Overview</h3>
                        <p>
                            SaveMyReel respects the intellectual property rights of others and expects our users
                            to do the same. In accordance with the Digital Millennium Copyright Act of 1998
                            (&quot;DMCA&quot;), we will respond expeditiously to claims of copyright infringement.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>2. Our Role</h3>
                        <p>
                            It&apos;s important to understand that SaveMyReel:
                        </p>
                        <ul>
                            <li><strong>Does not host any media content</strong> on our servers</li>
                            <li>Acts only as a tool to facilitate downloading publicly available content</li>
                            <li>Retrieves content directly from the source platform&apos;s servers</li>
                            <li>Does not have control over what content exists on third-party platforms</li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            Therefore, to remove content from the internet, you should contact the platform where
                            the content is hosted (Instagram, Facebook, TikTok, X/Twitter).
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>3. Filing a DMCA Takedown Notice</h3>
                        <p>
                            If you believe that your copyrighted work has been infringed through our Service, please
                            provide our DMCA Agent with a written notification containing the following:
                        </p>
                        <ol>
                            <li>
                                <strong>Physical or electronic signature</strong> of the copyright owner or a person
                                authorized to act on their behalf
                            </li>
                            <li>
                                <strong>Identification of the copyrighted work</strong> claimed to have been infringed,
                                or a representative list if multiple works
                            </li>
                            <li>
                                <strong>Identification of the material</strong> that is claimed to be infringing,
                                including specific URL(s) where it can be found
                            </li>
                            <li>
                                <strong>Your contact information</strong>, including address, telephone number, and
                                email address
                            </li>
                            <li>
                                A statement that you have a <strong>good faith belief</strong> that the use of the
                                material is not authorized by the copyright owner, its agent, or the law
                            </li>
                            <li>
                                A statement, <strong>under penalty of perjury</strong>, that the information in the
                                notification is accurate and that you are authorized to act on behalf of the copyright owner
                            </li>
                        </ol>
                    </section>

                    <section className={styles.section}>
                        <h3>4. DMCA Agent Contact</h3>
                        <p>Send your DMCA takedown notice to:</p>
                        <div style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "1rem",
                            borderRadius: "8px",
                            marginTop: "0.5rem"
                        }}>
                            <p><strong>Email:</strong> <a href="mailto:support@savemyreel.online" style={{ color: "var(--primary)" }}>support@savemyreel.online</a></p>
                            <p><strong>Subject Line:</strong> DMCA Takedown Notice</p>
                        </div>
                        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                            Please note: Submitting false DMCA claims may result in legal consequences under
                            Section 512(f) of the DMCA.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>5. Counter-Notification</h3>
                        <p>
                            If you believe that your content was removed due to mistake or misidentification, you
                            may submit a counter-notification containing:
                        </p>
                        <ol>
                            <li>Your physical or electronic signature</li>
                            <li>Identification of the material that was removed and its prior location</li>
                            <li>
                                A statement under penalty of perjury that you have a good faith belief the material
                                was removed by mistake or misidentification
                            </li>
                            <li>Your name, address, and telephone number</li>
                            <li>
                                A statement that you consent to the jurisdiction of the Federal District Court for
                                your address (or any judicial district where we may be found if outside the U.S.)
                            </li>
                            <li>
                                A statement that you will accept service of process from the person who provided
                                the original notification
                            </li>
                        </ol>
                    </section>

                    <section className={styles.section}>
                        <h3>6. Repeat Infringer Policy</h3>
                        <p>
                            In accordance with the DMCA and other applicable laws, we have adopted a policy of
                            terminating, in appropriate circumstances and at our sole discretion, users who are
                            deemed to be repeat infringers. We may also at our sole discretion limit access to
                            the Service for any users who infringe the intellectual property rights of others.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>7. Recommended Actions</h3>
                        <p>
                            If your copyrighted content is being distributed without permission:
                        </p>
                        <ul>
                            <li>
                                <strong>For Instagram content:</strong>{" "}
                                <a href="https://help.instagram.com/contact/372592039493026" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                                    Report to Instagram
                                </a>
                            </li>
                            <li>
                                <strong>For Facebook content:</strong>{" "}
                                <a href="https://www.facebook.com/help/contact/634636770043106" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                                    Report to Facebook
                                </a>
                            </li>
                            <li>
                                <strong>For TikTok content:</strong>{" "}
                                <a href="https://www.tiktok.com/legal/report/Copyright" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                                    Report to TikTok
                                </a>
                            </li>
                            <li>
                                <strong>For X/Twitter content:</strong>{" "}
                                <a href="https://help.twitter.com/en/forms/ipi" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                                    Report to X/Twitter
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>8. Changes to This Policy</h3>
                        <p>
                            We reserve the right to modify this DMCA Policy at any time. Changes will be effective
                            immediately upon posting. We encourage you to review this policy periodically.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
