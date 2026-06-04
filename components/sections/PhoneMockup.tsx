import { cn } from "@/lib/utils";

type PhoneMockupProps = {
  className?: string;
  widthClass?: string;
};

export function PhoneMockup({
  className,
  widthClass = "w-[280px] md:w-[320px]",
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] rounded-[3rem] border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl",
        widthClass,
        className,
      )}
    >
      <div className="absolute top-2 left-1/2 z-10 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />
      <div className="flex h-full w-full items-center justify-center rounded-[2.2rem] bg-gradient-to-b from-zinc-900 to-black">
        <span className="text-xs text-zinc-600">📱 App screenshot</span>
      </div>
      {/* TODO: pakeisti centrinį div į <Image src="..." /> su realiu app screenshot'u */}
    </div>
  );
}
