import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaveMyReel – Free Video Downloader for Instagram, TikTok, Facebook & X",
  description: "Download videos, reels, and photos from Instagram, TikTok, Facebook, and Twitter (X) for free. HD quality, no watermark, no login required. Paste a link and save instantly.",
  alternates: {
    canonical: "https://savemyreel.online",
  },
};

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  );
}
