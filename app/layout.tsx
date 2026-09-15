import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { HashScrollOnNavigate } from "@/components/layout/HashScrollOnNavigate";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blumu.eu"),
  alternates: {
    canonical: "/",
  },
  title: "Blumu — paslaugų platforma",
  description:
    "Blumu — Lietuvos paslaugų platforma. Rask patikimus vykdytojus arba augink savo verslą.",
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      { url: "/images/favicon/favicon.svg", type: "image/svg+xml" },
      {
        url: "/images/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: "/images/favicon/site.webmanifest",
  themeColor: "#3a1810",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="lt"
      className={`${inter.variable} ${poppins.variable} h-full overflow-x-hidden antialiased dark`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero_bg_mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero_bg.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero_mobile.webp"
          media="(min-width: 1024px)"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} relative min-h-full overflow-x-hidden bg-[#3a1810] font-sans text-white antialiased`}
      >
        <HashScrollOnNavigate />
        {children}
      </body>
    </html>
  );
}
