import type { LucideIcon } from "lucide-react";

type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E85002]/30 bg-[#E85002]/15">
        <Icon className="h-5 w-5 text-[#E85002]" aria-hidden />
      </div>
      <div>
        <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
