import { MarketingShell } from "@/components/layout/MarketingShell";
import { PlaceholderMessage } from "@/components/PlaceholderMessage";

export default function CheckoutPage() {
  return (
    <MarketingShell>
      <PlaceholderMessage
        title="Apmokėjimas"
        message="Kraunama... Mokėjimas bus nukreiptas per backend."
      />
    </MarketingShell>
  );
}
