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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" className={`${inter.variable} ${poppins.variable} h-full antialiased dark`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero_bg.webp"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} min-h-full overflow-x-hidden bg-black font-sans text-white antialiased`}
      >
        <HashScrollOnNavigate />
        {children}
      </body>
    </html>
  );
}
