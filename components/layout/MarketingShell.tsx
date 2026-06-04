import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type MarketingShellProps = {
  children: React.ReactNode;
};

/** Navbar + Footer wrapper for secondary marketing pages. */
export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-black text-white">{children}</main>
      <Footer />
    </>
  );
}
