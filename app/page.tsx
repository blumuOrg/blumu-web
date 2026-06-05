import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutBlumu } from "@/components/sections/AboutBlumu";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";

const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((mod) => mod.FAQ),
  {
    loading: () => <div style={{ minHeight: "700px" }} />,
  },
);

const Contact = dynamic(
  () => import("@/components/sections/Contact").then((mod) => mod.Contact),
  {
    loading: () => <div style={{ minHeight: "500px" }} />,
  },
);

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        <Hero />
        <AboutBlumu />
        <DownloadCTA />
        <Features />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
