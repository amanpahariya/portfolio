import Script from "next/script";
import { Outfit } from "next/font/google";
import { HeroInfoProvider } from "@/components/hero-info-context";
import HeroInfo from "@/utility/hero.json";
import { SITE_URL } from "@/utility/site-config";
import "./globals.css";
import "./app.scss";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

// ── SEO Metadata ───────────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${HeroInfo.name} — ${HeroInfo.seoTitle}`,
  description: HeroInfo.seoDescription,
  keywords: `${HeroInfo.name}, ${HeroInfo.seoKeywords}`,
  authors: [{ name: HeroInfo.name, url: HeroInfo.githubUrl }],
  creator: HeroInfo.name,
  publisher: HeroInfo.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${HeroInfo.name} — ${HeroInfo.seoTitle}`,
    description: HeroInfo.seoDescription,
    siteName: `${HeroInfo.name} Portfolio`,
    images: [
      {
        url: HeroInfo.heroImage,
        width: 1200,
        height: 630,
        alt: `${HeroInfo.name} — ${HeroInfo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${HeroInfo.name} — ${HeroInfo.title}`,
    description: HeroInfo.seoShortDescription,
    images: [HeroInfo.heroImage],
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
};

// ── Structured Data ────────────────────────────────────────────────────────────
function buildStructuredData() {
  const currentRole = HeroInfo.experience[0];
  const skills = HeroInfo.skills.flatMap((cat) => cat.skills.map((s) => s.name));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: HeroInfo.name,
    jobTitle: currentRole.title,
    description: HeroInfo.seoDescription,
    url: SITE_URL,
    image: new URL(HeroInfo.heroImage, SITE_URL).href,
    email: HeroInfo.email,
    knowsAbout: skills,
    hasOccupation: {
      "@type": "Occupation",
      name: currentRole.title,
      occupationLocation: { "@type": "Country", name: HeroInfo.location },
      skills: skills.join(", "),
    },
    worksFor: { "@type": "Organization", name: currentRole.company },
    sameAs: [HeroInfo.githubUrl, HeroInfo.linkedinUrl],
  };
}

// ── Root Layout ────────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  const structuredData = buildStructuredData();

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-N7HZLG4H"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N7HZLG4H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <HeroInfoProvider value={HeroInfo}>
          {/* Skip-to-content link for keyboard users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-chartreuse focus:text-charcoal focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-semibold"
          >
            Skip to main content
          </a>
          {children}
        </HeroInfoProvider>
      </body>
    </html>
  );
}
