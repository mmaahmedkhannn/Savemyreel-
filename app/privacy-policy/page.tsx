"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../page-styles.module.css";

export default function PrivacyPolicy() {
    const lastUpdated = "January 19, 2026";

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <h1 className={styles.pageTitle}>Privacy Policy</h1>
                <p className={styles.pageSubtitle}>Last updated: {lastUpdated}</p>

                <div className={styles.pageContent}>
                    <section className={styles.section}>
                        <h3>1. Introduction</h3>
                        <p>
                            Welcome to SaveMyReel. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>2. Information We Collect</h3>
                        <p><strong>Information We DO NOT Collect:</strong></p>
                        <ul>
                            <li>We do not require user registration or accounts</li>
                            <li>We do not store the URLs you submit for downloading</li>
                            <li>We do not store downloaded media on our servers</li>
                            <li>We do not collect personal identification information</li>
                        </ul>
                        <p style={{ marginTop: "1rem" }}><strong>Information We May Collect:</strong></p>
                        <ul>
                            <li><strong>Usage Data:</strong> Anonymous analytics data such as pages visited, time spent on site, and browser type</li>
                            <li><strong>Cookies:</strong> Essential cookies for website functionality and analytics cookies (see our Cookie Policy)</li>
                            <li><strong>IP Address:</strong> Temporarily processed for security purposes and rate limiting, but not stored</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>3. How We Use Your Information</h3>
                        <p>Any information we collect is used for:</p>
                        <ul>
                            <li>Providing and maintaining our service</li>
                            <li>Improving user experience and website performance</li>
                            <li>Analyzing usage patterns through aggregated, anonymous data</li>
                            <li>Preventing abuse and ensuring security</li>
                            <li>Displaying relevant advertisements through Google AdSense</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>4. Cookies and Tracking Technologies</h3>
                        <p>We use the following types of cookies:</p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics)</li>
                            <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display personalized ads</li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            For more details, please see our <a href="/cookie-policy" style={{ color: "var(--primary)" }}>Cookie Policy</a>.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>5. Third-Party Services</h3>
                        <p>We use the following third-party services:</p>
                        <ul>
                            <li><strong>Google Analytics:</strong> For website analytics and traffic analysis</li>
                            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            These services may collect information sent by your browser as part of a web page request.
                            Please refer to their respective privacy policies for more information.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>6. Your Rights (GDPR)</h3>
                        <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights:</p>
                        <ul>
                            <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                            <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                            <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                            <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                            <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            Since we do not store personal data, these rights are automatically satisfied by our privacy-first approach.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>7. California Privacy Rights (CCPA)</h3>
                        <p>If you are a California resident, you have the right to:</p>
                        <ul>
                            <li>Know what personal information is collected about you</li>
                            <li>Know whether your personal information is sold or disclosed</li>
                            <li>Say no to the sale of personal information</li>
                            <li>Access your personal information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Equal service and price, regardless of exercising your privacy rights</li>
                        </ul>
                        <p style={{ marginTop: "0.5rem" }}>
                            <strong>We do not sell personal information.</strong>
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>8. Children&apos;s Privacy (COPPA)</h3>
                        <p>
                            Our service is not intended for children under 13 years of age. We do not knowingly collect
                            personal information from children under 13. If you are a parent or guardian and believe
                            your child has provided us with personal information, please contact us.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>9. Data Security</h3>
                        <p>
                            We implement appropriate security measures to protect against unauthorized access, alteration,
                            disclosure, or destruction of your information. This includes:
                        </p>
                        <ul>
                            <li>SSL/TLS encryption for all data transmission</li>
                            <li>Regular security audits and updates</li>
                            <li>Rate limiting to prevent abuse</li>
                            <li>No storage of sensitive user data</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h3>10. Data Retention</h3>
                        <p>
                            Since we do not store personal data or URLs you submit, there is no data retained after
                            your session ends. Analytics data is aggregated and anonymized.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>11. International Data Transfers</h3>
                        <p>
                            Your information may be transferred to and processed in countries other than your own.
                            By using our service, you consent to this transfer. We ensure adequate protection for
                            any data transfers.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>12. Changes to This Privacy Policy</h3>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes
                            by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h3>13. Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
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
