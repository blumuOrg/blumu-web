import Image from "next/image";
import { images } from "@/lib/image-paths";
import { cn } from "@/lib/utils";

type BlumuLogoProps = {
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
};

export function BlumuLogo({
  size = "md",
  className,
  priority = true,
}: BlumuLogoProps) {
  const h = size === "sm" ? 28 : 36;
  const w = size === "sm" ? 100 : 130;

  return (
    <Image
      src={images.logo}
      alt="BLUMU"
      width={w}
      height={h}
      priority={priority}
      sizes={size === "sm" ? "100px" : "130px"}
      className={cn("object-contain", className)}
    />
  );
}
