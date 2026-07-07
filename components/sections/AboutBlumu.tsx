import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ctaButtonClass } from "@/lib/cta";
import { images } from "@/lib/image-paths";

export function AboutBlumu() {
  return (
    <section id="apie" className="w-full bg-black py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal direction="left" className="flex justify-center">
            <Image
              src={images.whoisBlumu}
              alt="Blumu programėlė dviejuose telefonuose"
              width={500}
              height={500}
              loading="lazy"
              sizes="(max-width: 1024px) 90vw, 500px"
              className="h-auto w-full max-w-[500px]"
            />
          </Reveal>

          <Reveal direction="right" delay={80}>
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              Kas yra BLUMU?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Tai inovatyvi, geolokacija ir patogia paieškos sistema paremta mobili
              programėlė. Ji sukurta ne tik palengvinti paslaugų teikėjų kasdienybę,
              bet ir padėti užsakovams be vargo rasti patikimus meistrus savo mieste.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Mes sujungiame tuos, kuriems reikia pagalbos čia ir dabar, su tikrais
              savo srities profesionalais.
            </p>
            <Link href="#privalumai" className={`${ctaButtonClass} mt-8`}>
              Programėlės privalumai
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
