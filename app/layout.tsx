import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const SITE_URL = "https://savemyreel.online";
const SITE_NAME = "SaveMyReel";
const SITE_DESCRIPTION = "Free online video downloader for Instagram, TikTok, Facebook & Twitter (X). Download reels, videos, and photos in HD quality — no watermark, no login, no app required. Save to any device instantly.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SaveMyReel – Free Video Downloader for Instagram, TikTok, Facebook & X (2026)",
    template: "%s | SaveMyReel",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // Core high-volume keywords
    "video downloader", "free video downloader", "online video downloader",
    "social media video downloader", "all in one video downloader",
    "save videos online", "HD video download", "download videos free",
    "best video downloader 2026", "multi-platform video downloader",
    // Instagram — 135K+ monthly searches
    "instagram downloader", "instagram video downloader", "instagram reel downloader",
    "download instagram reels", "save instagram videos", "download insta videos",
    "instagram photo downloader", "instagram carousel downloader",
    "instagram story downloader", "download instagram reels without watermark",
    "save instagram reels", "instagram reels to mp4", "download IG reels",
    "instagram video download online", "save instagram reels to phone",
    "how to download instagram reels", "free instagram downloader",
    "instagram HD download", "instagram reels saver", "download reels instagram",
    // TikTok — very high volume
    "tiktok downloader", "tiktok video downloader", "download tiktok without watermark",
    "tiktok downloader without watermark", "save tiktok videos",
    "tiktok mp4 download", "tiktok video saver", "download tiktok videos free",
    "tiktok watermark remover", "free tiktok downloader no watermark",
    "tiktok video download HD no watermark", "save tiktok to phone",
    "how to download tiktok without watermark", "tiktok video saver without watermark",
    "remove tiktok watermark", "tiktok to mp4",
    // Facebook — 5M+ monthly searches
    "facebook video downloader", "download facebook videos", "facebook video download",
    "facebook downloader", "save facebook videos", "fb downloader",
    "facebook reel downloader", "download fb videos", "fb video saver",
    "facebook video download online", "download facebook reels",
    "facebook video to mp4", "save fb videos to phone",
    "how to download facebook videos", "free facebook video downloader",
    // Twitter / X
    "twitter video downloader", "download twitter videos", "save twitter videos",
    "twitter gif downloader", "download x videos", "x video downloader",
    "twitter video to mp4", "twitter video saver", "save tweets video",
    "download twitter gif", "free twitter video downloader",
    "x.com video downloader", "download tweet video",
    // Long-tail / Intent-based
    "download social media videos free", "save reels to phone",
    "download videos from social media", "free reel downloader",
    "how to save tiktok without watermark", "best free video downloader online",
    "download videos without app", "save video from link",
    "online video saver", "paste link download video",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Technology",
  openGraph: {
    title: "SaveMyReel – Free Video Downloader | Instagram, TikTok, Facebook, X",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SaveMyReel – Free Video Downloader for Instagram, TikTok, Facebook & X",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaveMyReel – Download Videos from Social Media Instantly",
    description: "Free online video downloader for Instagram Reels, TikTok, Facebook & X. No watermark, HD quality.",
    creator: "@savemyreel",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "es": SITE_URL,
      "fr": SITE_URL,
      "de": SITE_URL,
      "hi": SITE_URL,
      "ar": SITE_URL,
      "pt": SITE_URL,
      "ru": SITE_URL,
      "ja": SITE_URL,
      "ko": SITE_URL,
      "zh": SITE_URL,
      "tr": SITE_URL,
      "it": SITE_URL,
      "id": SITE_URL,
      "vi": SITE_URL,
      "th": SITE_URL,
      "nl": SITE_URL,
      "pl": SITE_URL,
      "cs": SITE_URL,
      "ro": SITE_URL,
      "sv": SITE_URL,
      "sk": SITE_URL,
      "ms": SITE_URL,
      "fa": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "v-placeholder-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": SITE_NAME,
      "url": SITE_URL,
      "description": SITE_DESCRIPTION,
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "featureList": [
        "Instagram Video & Reel Download",
        "TikTok Video Download Without Watermark",
        "Facebook Video & Reel Download",
        "Twitter/X Video & GIF Download",
        "HD Quality Downloads",
        "No Registration Required",
        "Carousel/Multi-Image Support",
      ],
    },
    {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": `${SITE_URL}/favicon.ico`,
      "sameAs": [],
    },
    {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#6c5ce7" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={clsx(spaceGrotesk.variable, dmSans.variable, "antialiased")}>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
