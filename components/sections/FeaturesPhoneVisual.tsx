import Image from "next/image";
import { images } from "@/lib/image-paths";

type FeaturesPhoneVisualProps = {
  className?: string;
};

export function FeaturesPhoneVisual({ className }: FeaturesPhoneVisualProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E85002] opacity-25 blur-3xl"
        aria-hidden="true"
      />
      <Image
        src={images.blumuPrivalumai}
        alt="Blumu paieška santechnikos kategorijoje"
        width={320}
        height={650}
        loading="lazy"
        sizes="(max-width: 768px) 280px, 320px"
        className="relative z-10 h-auto w-[280px] md:w-[320px]"
      />
    </div>
  );
}
