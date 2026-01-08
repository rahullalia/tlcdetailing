import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TLC.Detailing | Mobile Car Detailing in Bakersfield, CA",
  description: "Bakersfield's premier mobile car detailing service. Ceramic coating, paint correction, polishing, and headlight restoration. 5-star rated with 315+ reviews. Call (832) 466-1100.",
  keywords: "car detailing, mobile detailing, ceramic coating, paint correction, Bakersfield CA, auto detailing, car wash, headlight restoration, polishing, waxing",
  authors: [{ name: "TLC.Detailing" }],
  openGraph: {
    title: "TLC.Detailing | Mobile Car Detailing in Bakersfield, CA",
    description: "Bakersfield's premier mobile car detailing service. Ceramic coating, paint correction, and more. 5-star rated.",
    url: "https://www.tlcdetailing.com",
    siteName: "TLC.Detailing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TLC.Detailing | Mobile Car Detailing Bakersfield",
    description: "Bakersfield's premier mobile car detailing. Ceramic coating, paint correction, and more. 5-star rated.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDetailing",
              "name": "TLC.Detailing",
              "image": "https://www.tlcdetailing.com/og-image.jpg",
              "description": "Bakersfield's premier mobile car detailing service offering ceramic coating, paint correction, polishing, and headlight restoration.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "13901 Austin Creek Ave",
                "addressLocality": "Bakersfield",
                "addressRegion": "CA",
                "postalCode": "93314",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 35.3733,
                "longitude": -119.0187
              },
              "url": "https://www.tlcdetailing.com",
              "telephone": "+18324661100",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "07:00",
                  "closes": "19:00"
                }
              ],
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "315"
              },
              "areaServed": {
                "@type": "City",
                "name": "Bakersfield"
              },
              "serviceType": "Mobile Car Detailing"
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
