import { preload } from "react-dom";
import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutBlumu } from "@/components/sections/AboutBlumu";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { images } from "@/lib/image-paths";

const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((mod) => mod.FAQ),
);

const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((mod) => mod.Contact),
);

export default function HomePage() {
  preload(images.heroBg, { as: "image", fetchPriority: "high" });

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
