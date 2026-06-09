import Image from "next/image";
import { images } from "@/lib/image-paths";
import { cn } from "@/lib/utils";

type BlumuLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const logoDimensions = {
  // sm + lg keep object-contain on a square box (existing usages).
  sm: { w: 96, h: 24, fit: "contain" as const },
  // md crops the surrounding black padding so the visible BLUMU text
  // ends up ~92px wide in the desktop navbar (was much smaller before).
  md: { w: 160, h: 52, fit: "cover" as const },
  lg: { w: 200, h: 80, fit: "contain" as const },
} as const;

export function BlumuLogo({
  size = "md",
  className,
  priority = true,
}: BlumuLogoProps) {
  const { w, h, fit } = logoDimensions[size];

  return (
    <Image
      src={images.logo}
      alt="BLUMU"
      width={w}
      height={h}
      priority={priority}
      sizes={`${w}px`}
      className={cn(
        fit === "cover" ? "object-cover object-center" : "object-contain object-left",
        className,
      )}
      style={{ width: w, height: h }}
    />
  );
}
