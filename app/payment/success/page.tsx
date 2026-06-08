import { Suspense } from "react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PaymentStatusView } from "@/components/payment/PaymentStatusView";
import { PaymentSuccessContent } from "./PaymentSuccessContent";

export default function PaymentSuccessPage() {
  return (
    <MarketingShell>
      <Suspense
        fallback={
          <PaymentStatusView
            title="Mokėjimas"
            message="Tikriname mokėjimo būseną..."
            loading
          />
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </MarketingShell>
  );
}
