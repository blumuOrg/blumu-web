import type { LucideIcon } from "lucide-react";

type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E85002]/20 lg:h-12 lg:w-12 lg:rounded-xl lg:border lg:border-[#E85002]/30 lg:bg-[#E85002]/15">
        <Icon className="h-6 w-6 text-[#E85002] lg:h-5 lg:w-5" aria-hidden />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white lg:mb-1 lg:text-lg lg:font-semibold">
          {title}
        </h3>
        <p className="max-w-[280px] text-sm text-zinc-400 lg:max-w-none lg:leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
