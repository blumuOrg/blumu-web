import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/image-paths";

export const metadata: Metadata = {
  title: "Blumu - Jau greitai",
  description:
    "Patikimo meistro paieška neturėtų būti sudėtinga. Kuriame Blumu – platformą, kuri sujungs patikrintus meistrus su žmonėmis, kuriems jų pagalbos reikia čia ir dabar.",
  robots: { index: true, follow: true },
  // Matches lock page base so Safari chrome / overscroll aren't pure black
  themeColor: "#3a1810",
};

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/app.blumu",
    icon: "/images/fb_icon.png",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/blumu.app/",
    icon: "/images/ig_icon.png",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@blumu.app",
    icon: "/images/tiktok_icon.png",
  },
] as const;

/**
 * Translucent glass tray — black soft silhouette at reduced opacity (Figma).
 */
function LogoTrayBadge() {
  return (
    <div className="absolute -top-3 left-1/2 z-20 hidden w-[min(600px,94vw)] -translate-x-1/2 md:block">
      <div className="relative flex aspect-[985/306] w-full items-center justify-center">
        {/* Black translucent tray + soft outer drop shadow */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lock_tray_shadow.png"
            alt=""
            className="absolute inset-0 h-full w-full object-fill"
            style={{
              filter: `
                drop-shadow(0 4px 14px rgba(0, 0, 0, 0.4))
                drop-shadow(0 10px 28px rgba(0, 0, 0, 0.28))
              `,
            }}
          />
        </div>
        <Image
          src={images.logo}
          alt="BLUMU"
          width={480}
          height={146}
          priority
          className="relative z-10 h-[160px] w-auto -translate-x-1 -translate-y-2 object-contain"
        />
      </div>
    </div>
  );
}

export default function LockPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#3a1810]">
      {/*
        Warm base under lock_bg so dark corners don't crush to pure #000.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/lock_bg.jpg"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover opacity-90 brightness-[1.35] contrast-[1] saturate-[1.1] md:block"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/lock_bg_mobile.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90 brightness-[1.25] saturate-[1.08] md:hidden"
      />

      <LogoTrayBadge />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:pt-44 md:pb-20">
        <h1 className="font-display text-5xl font-medium tracking-tight text-white md:text-7xl">
          JAU GREITAI...
        </h1>

        <p className="mt-10 max-w-[480px] text-lg font-normal text-white/90 md:mt-14 md:text-xl">
          Patikimo meistro paieška neturėtų būti sudėtinga.
        </p>
        <p className="mt-5 max-w-[520px] text-lg font-normal text-white/90 md:mt-6 md:text-xl">
          Todėl kuriame Blumu – platformą, kuri sujungs patikrintus meistrus su
          žmonėmis, kuriems jų pagalbos reikia čia ir dabar.
        </p>

        <a
          href="mailto:info@blumu.eu"
          className="mt-10 inline-flex w-full max-w-[300px] items-center justify-center rounded-lg bg-[#E85002] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-[#d44800] md:mt-12 md:w-auto md:max-w-none"
        >
          Susisiekti el. paštu
        </a>

        <div className="mt-10 flex items-center justify-center gap-4 md:mt-12 md:gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="box-border flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-solid border-white/25 bg-black/40 transition hover:border-white/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={social.icon}
                alt={social.label}
                className="h-6 w-6 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
