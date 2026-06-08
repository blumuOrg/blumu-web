import { MarketingShell } from "@/components/layout/MarketingShell";
import { PaymentStatusView } from "@/components/payment/PaymentStatusView";

export default function PaymentCancelPage() {
  return (
    <MarketingShell>
      <PaymentStatusView
        title="Mokėjimas atšauktas"
        message="Mokėjimas nebuvo užbaigtas. Gali bandyti dar kartą programėlėje."
        actionHref="blumu://payment/cancel"
        actionLabel="Grįžti į programėlę"
      />
    </MarketingShell>
  );
}
