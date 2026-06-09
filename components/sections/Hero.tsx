import Image from "next/image";
import { images } from "@/lib/image-paths";

/* ── Desktop geometry — matches hero_bg.webp (1600×1042) ──
 * Panel fills viewport width minus small side gaps and preserves the
 * source aspect ratio, so the entire collage is always visible —
 * no cropping, no letterboxing, regardless of monitor aspect.
 */

function HeroBackground({ variant }: { variant: "desktop" | "mobile" }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="/images/hero_bg_mobile.webp"
        />
        <source
          media="(min-width: 769px)"
          srcSet="/images/hero_bg.webp"
        />
        <img
          src="/images/hero_bg.webp"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[center_75%]"
        />
      </picture>

      {variant === "desktop" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/60" />
        </>
      )}
    </div>
  );
}

function HeroOrangeGlow({ className }: { className?: string }) {
  return (
    <>
      <div
        className={`pointer-events-none absolute top-[55%] left-1/2 h-[min(420px,80vw)] w-[min(420px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E85002]/35 blur-[80px] ${className ?? ""}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute top-[55%] left-1/2 h-[min(240px,50vw)] w-[min(240px,50vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B1A]/45 blur-[45px] ${className ?? ""}`}
        aria-hidden
      />
    </>
  );
}

function HeroDesktopCopy() {
  return (
    <div className="pointer-events-auto flex w-full max-w-[1100px] items-start gap-8 xl:gap-12">
      <div className="shrink-0">
        <h1 className="font-display text-[2.5rem] leading-[1.08] font-medium text-white xl:text-[3.25rem]">
          Pagalba,
          <br />
          kai jos reikia.
        </h1>
        <div className="mt-7">
          <a
            href="#privalumai"
            className="inline-block rounded-full bg-[#E85002] px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#d04600]"
          >
            Sužinoti Daugiau
          </a>
        </div>
      </div>
      <p className="max-w-[520px] pt-2 text-base leading-snug font-normal text-zinc-200 xl:max-w-[560px] xl:pt-3 xl:text-lg">
        Rask patikimus specialistus savo mieste arba sukurk užduotį ir gauk
        pasiūlymus realiu laiku.
      </p>
    </div>
  );
}

function HeroDesktopPhone() {
  return (
    <div className="pointer-events-none absolute right-6 -bottom-2 z-20 h-[86%] xl:right-10">
      <div
        className="relative h-full"
        style={{ aspectRatio: "340 / 700" }}
      >
        <HeroOrangeGlow className="left-[55%]" />
        <Image
          src={images.heroMobile}
          alt="Blumu mobile programėlė"
          fill
          loading="lazy"
          fetchPriority="low"
          sizes="(min-width: 1280px) 400px, 320px"
          className="relative z-10 object-contain"
        />
      </div>
    </div>
  );
}

/**
 * Desktop hero:
 * - Panel keeps the image aspect ratio and shrinks to fit viewport height.
 * - Text overlays inside the panel (aligned to its left padding).
 * - Phone scales to panel height with a small overflow.
 */
function HeroDesktop() {
  return (
    <div className="relative hidden h-screen w-full lg:block">
      {/* Image panel fills the viewport (100vw × 100vh) with a small inset.
          object-cover keeps the collage edge-to-edge regardless of monitor aspect. */}
      <div className="absolute inset-0 px-3 pt-3 pb-3">
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-black p-2">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <HeroBackground variant="desktop" />
          </div>
        </div>
      </div>

      {/* Text overlay — vertically centered in the viewport, navbar-safe top padding */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center pt-[6rem] pl-8 lg:pl-14 xl:pl-20">
        <HeroDesktopCopy />
      </div>

      <HeroDesktopPhone />
    </div>
  );
}

function HeroMobile() {
  return (
    <div className="relative z-10 lg:hidden">
      <div className="relative h-[50vh] min-h-[360px]">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackground variant="mobile" />
        </div>
        <div className="absolute inset-x-0 top-0 px-5 pt-[5.5rem]">
          <h1 className="max-w-[300px] text-left font-display text-[2rem] leading-[1.12] font-semibold text-white">
            Pagalba,
            <br />
            kai jos reikia.
          </h1>
          <p className="mt-3 max-w-[280px] text-left text-[15px] leading-relaxed font-normal text-zinc-200">
            Rask patikimus specialistus savo mieste arba sukurk užduotį ir gauk
            pasiūlymus realiu laiku.
          </p>
        </div>
      </div>

      <div className="relative -mt-4 h-[44vh] min-h-[300px]">
        <a
          href="#privalumai"
          className="absolute bottom-[60%] left-4 z-20 inline-block rounded-full bg-[#E85002] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d04600]"
        >
          Sužinoti Daugiau
        </a>

        <div className="absolute bottom-0 left-1/2 z-10 w-[58vw] max-w-[250px] -translate-x-1/2 translate-y-[6%]">
          <HeroOrangeGlow />
          <Image
            src={images.heroMobile}
            alt="Blumu mobile programėlė"
            width={250}
            height={520}
            loading="lazy"
            fetchPriority="low"
            sizes="58vw"
            className="relative z-10 h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-visible bg-black">
      <HeroDesktop />
      <HeroMobile />
      <div className="h-4 lg:h-6" aria-hidden />
    </section>
  );
}
