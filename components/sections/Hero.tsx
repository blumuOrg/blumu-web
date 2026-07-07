import Image from "next/image";
import { images } from "@/lib/image-paths";

/* ── Desktop geometry — matches hero_bg.webp (1600×1042) ──
 * Panel fills viewport width minus small side gaps and preserves the
 * source aspect ratio, so the entire collage is always visible —
 * no cropping, no letterboxing, regardless of monitor aspect.
 */

function HeroBackground({ variant }: { variant: "desktop" | "mobile" }) {
  // Canvas aspect (desktop) matches the source image, so cover === contain — no cropping.
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
          className="h-full w-full object-cover object-center"
        />
      </picture>

      {variant === "desktop" ? (
        <>
          {/* subtle, lets the artwork breathe */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
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
    <div className="pointer-events-auto flex w-full max-w-[560px] flex-col items-start">
      <h1
        className="font-display font-medium text-white"
        style={{
          fontSize: "clamp(48px, 5vw, 72px)",
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
        }}
      >
        Pagalba,
        <br />
        kai jos reikia.
      </h1>
      <p
        className="mt-9 max-w-[540px] text-zinc-200 xl:mt-11"
        style={{
          fontSize: "clamp(17px, 1.35vw, 21px)",
          lineHeight: 1.4,
        }}
      >
        Rask patikimus specialistus savo mieste arba sukurk užduotį ir gauk
        pasiūlymus realiu laiku.
      </p>
      <a
        href="#privalumai"
        className="mt-9 inline-flex items-center rounded-[18px] bg-[#E85002] px-8 text-base font-semibold text-white shadow-lg transition hover:bg-[#d04600] xl:mt-11"
        style={{ height: 56 }}
      >
        Sužinoti Daugiau
      </a>
    </div>
  );
}

function HeroDesktopPhone() {
  // Anchored to the canvas bottom, slight translateY downwards
  // → phone bottom (and the orange glow under it) extend past the canvas edge.
  // Width is clamp-driven so the phone stays modest in size, never overlapping
  // the navbar pill at the top of the canvas.
  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{
        right: "clamp(120px, 14%, 240px)",
        bottom: 0,
        width: "clamp(260px, 22%, 360px)",
        transform: "translateY(clamp(18px, 3vh, 48px))",
      }}
    >
      <div className="relative w-full" style={{ aspectRatio: "340 / 700" }}>
        <HeroOrangeGlow className="left-[55%]" />
        <Image
          src={images.heroMobile}
          alt="Blumu mobile programėlė"
          fill
          priority
          sizes="(min-width: 1280px) 320px, 260px"
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
    <div className="relative hidden w-full justify-center pt-5 pb-2 lg:flex">
      {/*
        Frame = same aspect & width as the canvas, but NOT overflow-hidden.
        - The image canvas (child) clips its own background with rounded corners.
        - The phone sits as a sibling so it can extend below the canvas
          (the orange glow shows beneath the rounded image edge).
        - Text overlay also sits relative to the frame.
      */}
      <div
        className="relative mx-auto aspect-[1600/1042]"
        style={{
          width:
            "min(calc(100% - 40px), 1440px, calc((100vh - 60px) * 1600 / 1042))",
        }}
      >
        {/* Image canvas — rounded, clips the background only */}
        <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-black">
          <HeroBackground variant="desktop" />
        </div>

        {/* Content layer */}
        <div
          className="absolute z-10"
          style={{
            left: "clamp(0px, 3%, 100px)",
            right: "clamp(40px, 5%, 80px)",
            top: "clamp(140px, 24%, 220px)",
          }}
        >
          <HeroDesktopCopy />
        </div>

        {/* Phone mockup — extends past the canvas bottom */}
        <HeroDesktopPhone />
      </div>
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
            loading="eager"
            sizes="250px"
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
