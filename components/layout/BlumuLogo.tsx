import Image from "next/image";
import { images } from "@/lib/image-paths";
import { cn } from "@/lib/utils";

type BlumuLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const logoDimensions = {
  sm: { w: 96, h: 24 },
  md: { w: 320, h: 84 },
  lg: { w: 200, h: 80 },
} as const;

export function BlumuLogo({
  size = "md",
  className,
  priority = true,
}: BlumuLogoProps) {
  const { w, h } = logoDimensions[size];

  return (
    <Image
      src={images.logo}
      alt="BLUMU"
      width={w}
      height={h}
      priority={priority}
      sizes={`${w}px`}
      className={cn("object-contain object-left", className)}
      style={{ width: w, height: h }}
    />
  );
}
