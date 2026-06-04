import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PlaceholderMessage } from "@/components/PlaceholderMessage";

export default function PaymentCancelPage() {
  return (
    <MarketingShell>
      <div className="flex flex-1 flex-col">
        <PlaceholderMessage title="Mokėjimas atšauktas" message="Atšaukta" />
        <p className="pb-16 text-center">
          <Link href="/pricing" className="text-[#E85002] hover:underline">
            Grįžti į kainas
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
