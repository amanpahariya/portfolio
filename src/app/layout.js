import { Outfit } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider"
import { HeroInfoProvider } from "@/components/hero-info-context";
import HeroInfo from "@/utility/hero.json";
import { SITE_URL } from "@/utility/site-config";
import "./globals.css";
import "./app.scss"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${HeroInfo.name} - ${HeroInfo.seoTitle}`,
  description: HeroInfo.seoDescription,
  keywords: `${HeroInfo.name}, ${HeroInfo.seoKeywords}`,
  authors: [{ name: HeroInfo.name, url: HeroInfo.githubUrl }],
  creator: HeroInfo.name,
  publisher: HeroInfo.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${HeroInfo.name} - ${HeroInfo.seoTitle}`,
    description: HeroInfo.seoDescription,
    siteName: `${HeroInfo.name} Portfolio`,
    images: [
      {
        url: HeroInfo.heroImage,
        width: 1200,
        height: 630,
        alt: `${HeroInfo.name} - ${HeroInfo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${HeroInfo.name} - ${HeroInfo.title}`,
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

export default function RootLayout({ children }) {
  const currentRole = HeroInfo.experience[0];
  const skills = HeroInfo.skills.flatMap((category) =>
    category.skills.map((skill) => skill.name)
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": HeroInfo.name,
    "jobTitle": currentRole.title,
    "description": HeroInfo.seoDescription,
    "url": SITE_URL,
    "image": new URL(HeroInfo.heroImage, SITE_URL).href,
    "email": HeroInfo.email,
    "knowsAbout": skills,
    "hasOccupation": {
      "@type": "Occupation",
      "name": currentRole.title,
      "occupationLocation": {
        "@type": "Country",
        "name": HeroInfo.location
      },
      "skills": skills.join(", ")
    },
    "worksFor": {
      "@type": "Organization",
      "name": currentRole.company
    },
    "sameAs": [
      HeroInfo.githubUrl,
      HeroInfo.linkedinUrl
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HeroInfoProvider value={HeroInfo}>
            {children}
          </HeroInfoProvider>
        </ThemeProvider>
        <Link
          href={HeroInfo.githubUrl}
          target="_blank"
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors z-10 text-xs flex items-center gap-2"
        >
          Source Code
        </Link>
      </body>
    </html>
  );
}
