import { MarketingShell } from "@/components/layout/MarketingShell";
import { PlaceholderMessage } from "@/components/PlaceholderMessage";

export default function PaymentSuccessPage() {
  return (
    <MarketingShell>
      <PlaceholderMessage
        title="Mokėjimas"
        message="Tikrinama mokėjimo būsena..."
      />
    </MarketingShell>
  );
}
