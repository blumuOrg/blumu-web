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
      "Klientas ir meistras bendrauja be tarpininkų per saugų pokalbių langą.",
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

function FeatureColumn({ items }: { items: FeatureData[] }) {
  return (
    <div className="flex flex-col gap-10">
      {items.map((item) => (
        <FeatureItem key={item.title} {...item} />
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="privalumai" className="w-full bg-black py-20 md:py-28">
      <Container>
        <h2 className="text-center font-display text-4xl font-bold text-white md:text-5xl">
          BLUMU privalumai
        </h2>

        <div className="mt-16 hidden items-center gap-12 lg:grid lg:grid-cols-3">
          <FeatureColumn items={leftFeatures} />
          <FeaturesPhoneVisual />
          <FeatureColumn items={rightFeatures} />
        </div>

        <div className="mt-16 flex flex-col gap-10 lg:hidden">
          <FeatureColumn items={leftFeatures} />
          <FeaturesPhoneVisual className="py-4" />
          <FeatureColumn items={rightFeatures} />
        </div>
      </Container>
    </section>
  );
}
