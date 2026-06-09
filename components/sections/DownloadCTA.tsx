import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { images } from "@/lib/image-paths";

export function DownloadCTA() {
  return (
    <section id="atsisiusk" className="w-full bg-black py-12 md:py-16">
      <Container className="text-center">
        <h2 className="text-xl font-medium text-white md:text-2xl">
          Parsisiųsk ir pradėk naudotis jau ŠIANDIEN!
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#" className="transition hover:opacity-80">
            <Image
              src={images.appStoreLogo}
              alt="Atsisiųsk iš App Store"
              width={180}
              height={56}
              loading="lazy"
              sizes="180px"
              className="h-14 w-auto"
            />
          </a>
          <a href="#" className="transition hover:opacity-80">
            <Image
              src={images.googlePlayLogo}
              alt="Atsisiųsk iš Google Play"
              width={180}
              height={56}
              loading="lazy"
              sizes="180px"
              className="h-14 w-auto"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
