import {
  BellRing,
  MessageCircle,
  Percent,
  Search,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FeatureItem } from "@/components/sections/FeatureItem";
import { FeaturesPhoneVisual } from "@/components/sections/FeaturesPhoneVisual";

type FeatureData = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const leftFeatures: FeatureData[] = [
  {
    icon: Percent,
    title: "0 % komisiniai",
    description:
      "Visi kliento sumokėti pinigai lieka jums – mes nerenkame jokio procento nuo jūsų uždarbio.",
  },
  {
    icon: Search,
    title: "Patogi paieška",
    description:
      "Klientai greitai randa meistrą pagal vietą arba žemėlapį, kad pagalba būtų dar greitesnė.",
  },
  {
    icon: MessageCircle,
    title: "Tiesioginis bendravimas",
    description:
      "Klientas ir meistras bendrauja be tarpininkų per saugų pokalbio langą.",
  },
];

const rightFeatures: FeatureData[] = [
  {
    icon: ShieldCheck,
    title: "Patikrinti specialistai",
    description: "Platformoje dirba tik oficialią veiklą vykdantys meistrai.",
  },
  {
    icon: Star,
    title: "Reitingų sistema",
    description:
      "Atsiliepimai padeda klientams pasirinkti patikimus meistrus, o jums auginti reputaciją.",
  },
  {
    icon: BellRing,
    title: "Greitas užsakymų gavimas",
    description:
      "Sistema automatiškai praneša laisviems meistrams apie naujus užsakymus šalia jų.",
  },
];

export function Features() {
  return (
    <section id="privalumai" className="w-full bg-black py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="text-center font-display text-4xl font-bold text-white md:text-5xl">
            BLUMU privalumai
          </h2>
        </Reveal>

        <Reveal delay={100}>
          {/* Mobile: single column, centered. Desktop: 3-col grid. */}
          <div className="mt-16 flex flex-col items-center gap-12 text-center md:gap-14 lg:grid lg:grid-cols-3 lg:items-center lg:gap-12 lg:text-left">
            <div className="flex flex-col gap-12 md:gap-14 lg:gap-10">
              {leftFeatures.map((item) => (
                <FeatureItem key={item.title} {...item} />
              ))}
            </div>

            <div className="flex justify-center">
              <FeaturesPhoneVisual className="mx-auto py-4 lg:py-0" />
            </div>

            <div className="flex flex-col gap-12 md:gap-14 lg:gap-10">
              {rightFeatures.map((item) => (
                <FeatureItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
