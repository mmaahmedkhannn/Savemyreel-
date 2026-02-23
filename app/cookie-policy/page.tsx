"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function CookiePolicy() {
    const lastUpdated = "January 19, 2026";

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Cookie Policy</h1>
                <p className={styles.pageSubtitle}>Last updated: {lastUpdated}</p>

                <div className={styles.pageContent}>
                    <section className={styles.section}>
                        <h3>1. What Are Cookies?</h3>
                        <p>
                            Cookies are small text files that are stored on your computer or mobile device when you
                            visit a website. They are widely used to make websites work more efficiently and provide
                            information to the website owners. Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies.
                        </p>
                        <ul>
                            <li><strong>Session cookies:</strong> Temporary cookies that expire when you close your browser</li>
                            <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until you delete them</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>2. Types of Cookies We Use</h3>

                        <p style={{ marginTop: "1rem" }}><strong>Essential Cookies</strong></p>
                        <p>
                            These cookies are necessary for the website to function properly. They enable basic
                            functions like page navigation and access to secure areas. The website cannot function
                            properly without these cookies.
                        </p>
                        <ul>
                            <li>Session management</li>
                            <li>Security features</li>
                            <li>Load balancing</li>
                        </ul>

                        <p style={{ marginTop: "1rem" }}><strong>Analytics Cookies</strong></p>
                        <p>
                            We use analytics cookies to understand how visitors interact with our website. These
                            cookies help us improve our website by collecting and reporting information anonymously.
                        </p>
                        <ul>
                            <li>Google Analytics (_ga, _gid, _gat)</li>
                            <li>Page views and navigation patterns</li>
                            <li>Time spent on pages</li>
                            <li>Bounce rate and exit pages</li>
                        </ul>

                        <p style={{ marginTop: "1rem" }}><strong>Advertising Cookies</strong></p>
                        <p>
                            These cookies are used to deliver advertisements that are relevant to you. They also
                            help limit the number of times you see an advertisement and measure the effectiveness
                            of advertising campaigns.
                        </p>
                        <ul>
                            <li>Google AdSense cookies</li>
                            <li>Personalized ad preferences</li>
                            <li>Ad performance tracking</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>3. Third-Party Cookies</h3>
                        <p>
                            Some cookies on our website are placed by third-party services. These include:
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Provider</th>
                                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Purpose</th>
                                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Privacy Policy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                    <td style={{ padding: "0.5rem" }}>Google Analytics</td>
                                    <td style={{ padding: "0.5rem" }}>Website analytics</td>
                                    <td style={{ padding: "0.5rem" }}>
                                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>View</a>
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid var(--card-border)" }}>
                                    <td style={{ padding: "0.5rem" }}>Google AdSense</td>
                                    <td style={{ padding: "0.5rem" }}>Advertising</td>
                                    <td style={{ padding: "0.5rem" }}>
                                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>View</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className={styles.section}>
                        <h3>4. How to Manage Cookies</h3>
                        <p>
                            You can control and manage cookies in various ways. Please note that removing or blocking
                            cookies may impact your user experience and some functionality may no longer be available.
                        </p>

                        <p style={{ marginTop: "1rem" }}><strong>Browser Settings</strong></p>
                        <p>Most browsers allow you to:</p>
                        <ul>
                            <li>View what cookies are stored and delete them individually</li>
                            <li>Block third-party cookies</li>
                            <li>Block all cookies</li>
                            <li>Delete all cookies when you close your browser</li>
                        </ul>

                        <p style={{ marginTop: "1rem" }}><strong>Browser-Specific Instructions:</strong></p>
                        <ul>
                            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Google Chrome</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Mozilla Firefox</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Safari</a></li>
                            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Microsoft Edge</a></li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>5. Opt-Out of Personalized Advertising</h3>
                        <p>You can opt out of personalized advertising through:</p>
                        <ul>
                            <li><a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Google Ads Settings</a></li>
                            <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Digital Advertising Alliance</a></li>
                            <li><a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Network Advertising Initiative</a></li>
                            <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Your Online Choices (EU)</a></li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>6. Do Not Track</h3>
                        <p>
                            Some browsers have a &quot;Do Not Track&quot; feature that signals to websites that you do not
                            want your online activity tracked. We respect these signals where technically feasible.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>7. Changes to This Cookie Policy</h3>
                        <p>
                            We may update this Cookie Policy from time to time. Any changes will be posted on this
                            page with an updated revision date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>8. Contact Us</h3>
                        <p>
                            If you have any questions about our use of cookies, please contact us at:
                        </p>
                        <ul>
                            <li>Email: <a href="mailto:privacy@savemyreel.online" style={{ color: "var(--primary)" }}>privacy@savemyreel.online</a></li>
                            <li>Contact Page: <a href="/contact" style={{ color: "var(--primary)" }}>Contact Us</a></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
