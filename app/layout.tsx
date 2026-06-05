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
  title: "Blumu — paslaugų marketplace",
  description:
    "Blumu — Lietuvos paslaugų marketplace. Rask patikimus vykdytojus arba augink savo verslą.",
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: "/images/favicon/site.webmanifest",
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
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} relative min-h-full overflow-x-hidden bg-black font-sans text-white antialiased`}
      >
        <HashScrollOnNavigate />
        {children}
      </body>
    </html>
  );
}
