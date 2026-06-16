import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { images } from "@/lib/image-paths";

const planFeatures = [
  "Neribotas užsakymų gavimas",
  "Pranešimai apie naujus užsakymus",
  "Paslaugų reklama",
  "Tiesioginis bendravimas",
  "Mūsų komandos palaikymas",
] as const;

export function Pricing() {
  return (
    <section id="ikainiai" className="w-full bg-black py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
              BLUMU įkainiai
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-zinc-300">
              Šiuo metu taikomas visiškai{" "}
              <span className="text-[#E85002]">nemokamas</span> bandomasis
              laikotarpis, galiojantis iki 2026 m. lapkričio 1 d.
            </p>
            <p className="mt-5 leading-relaxed text-zinc-400">
              Visiems meistrams, prisijungusiems iki šios datos, vėliau bus
              pritaikyta metams užšaldyta 19,99 €/mėn. prenumeratos kaina.
            </p>
            {/* <p className="mt-5 text-zinc-400">
              Standartinė platformos kaina vėliau sieks 24,99 €/mėn.
            </p> */}
            <div className="mt-10 flex items-center gap-4">
              <Image
                src={images.klientai}
                alt="Patenkinti Blumu klientai"
                width={180}
                height={48}
                loading="lazy"
                sizes="180px"
                className="h-12 w-auto"
              />
              <span className="text-sm text-zinc-400">
                Jie jau išbandė, pabandyk ir tu!
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl md:p-10">
              <h3 className="font-display text-3xl font-bold text-white">
                Planas meistrams
              </h3>
              <p className="mt-3 text-zinc-400">
                Prisijunkite prie Blumu ir gaukite užsakymus tiesiai į telefoną.
              </p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-[#E85002]">
                  00,00€
                </span>
                <span className="text-sm text-zinc-400">
                  / mėn. iki 2026 m. lapkričio 1 d.
                </span>
              </div>

              <h4 className="mb-4 mt-8 font-semibold text-white">
                Kas įeina į planą?
              </h4>
              <ul className="space-y-3">
                {planFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#E85002]"
                      aria-hidden
                    />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#atsisiusk"
                className="mt-10 flex w-full items-center justify-center rounded-full bg-[#E85002] py-3.5 font-medium text-white transition hover:bg-[#d04600]"
              >
                Užsisakyti dabar
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
