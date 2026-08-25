import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutBlumu } from "@/components/sections/AboutBlumu";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
// import { Pricing } from "@/components/sections/Pricing";

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
      <div className="relative bg-black">
        {/* Two positioned wrappers so the navbar sits where the design wants on each breakpoint */}
        <div className="nav-overlay-mobile-wrap">
          <Navbar overlay />
        </div>
        <div className="nav-overlay-desktop-wrap">
          <Navbar overlay />
        </div>
        <Hero />
      </div>
      <main className="bg-black text-white">
        <AboutBlumu />
        <DownloadCTA />
        <Features />
        {/* PRICING SECTION — hidden temporarily
        <Pricing />
        */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
