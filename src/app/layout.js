import { Outfit } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider"
import HeroInfo from "@/utility/hero.json";
import "./globals.css";
import "./app.scss"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata = {
  title: `${HeroInfo.name} - ${HeroInfo.seoTitle}`,
  description: HeroInfo.seoDescription,
  keywords: `${HeroInfo.name}, ${HeroInfo.seoKeywords}`,
  authors: [{ name: HeroInfo.name, url: HeroInfo.githubUrl }],
  creator: HeroInfo.name,
  publisher: HeroInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": HeroInfo.name,
    "jobTitle": HeroInfo.title,
    "description": HeroInfo.seoDescription,
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "image": metadata.openGraph.images[0].url,
    "email": HeroInfo.email,
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS",
      "Full Stack Development",
      "ERP Systems",
      "CRM Development",
      "Web Applications",
      "Cloud Architecture"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": HeroInfo.title,
      "occupationLocation": {
        "@type": "Country",
        "name": "India"
      },
      "skills": "React.js, Node.js, MongoDB, AWS, JavaScript, TypeScript, Next.js, Express.js",
      "experienceRequirements": "4+ years"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Educational Institution"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Tata Consulting Services"
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
          {children}
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
