import Image from "next/image";
import { images } from "@/lib/image-paths";

export function Hero() {
  return (
    <section id="hero" className="bg-black px-4 pt-4 md:px-6 md:pt-6 lg:px-8">
      <div className="relative mx-auto min-h-[580px] max-w-[1400px] overflow-hidden rounded-3xl md:min-h-[680px] lg:min-h-[760px]">
        <div className="absolute inset-0 bg-black">
          <Image
            src={images.heroBg}
            alt=""
            fill
            priority
            fetchPriority="high"
            unoptimized
            className="object-cover object-center"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />

          <div className="absolute inset-0 hidden bg-gradient-to-r from-black/85 via-black/55 to-black/10 md:block" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 md:hidden" />
        </div>

        <div className="relative z-10 flex min-h-[580px] items-center px-6 py-12 md:min-h-[680px] md:px-12 md:py-16 lg:min-h-[760px] lg:px-16 lg:py-20">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="text-left">
              <h1 className="font-display text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Pagalba,
                <br />
                kai jos reikia.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-200 md:mt-6 md:text-lg">
                Rask patikimus specialistus savo mieste arba sukurk užduotį ir gauk
                pasiūlymus realiu laiku.
              </p>
              <a
                href="#privalumai"
                className="mt-7 inline-block rounded-full bg-[#E85002] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#d04600] md:mt-8"
              >
                Sužinoti Daugiau
              </a>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src={images.heroMobile}
                alt="Blumu mobile programėlė"
                width={340}
                height={690}
                loading="lazy"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 340px"
                className="h-auto w-[240px] sm:w-[280px] md:w-[320px] lg:w-[340px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
