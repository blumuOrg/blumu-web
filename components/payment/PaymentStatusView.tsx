import { Loader2 } from "lucide-react";
import { ctaButtonClass } from "@/lib/cta";
import { cn } from "@/lib/utils";

type PaymentStatusViewProps = {
  title: string;
  message?: string;
  loading?: boolean;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
};

export function PaymentStatusView({
  title,
  message,
  loading = false,
  actionHref,
  actionLabel,
  className,
}: PaymentStatusViewProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center",
        className,
      )}
    >
      {loading ? (
        <Loader2
          className="mb-6 h-10 w-10 animate-spin text-[#E85002]"
          aria-hidden
        />
      ) : null}
      <h1 className="font-display text-2xl font-semibold text-white md:text-3xl">
        {title}
      </h1>
      {message ? <p className="mt-4 text-zinc-400">{message}</p> : null}
      {actionHref && actionLabel ? (
        <a href={actionHref} className={`${ctaButtonClass} mt-8`}>
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
