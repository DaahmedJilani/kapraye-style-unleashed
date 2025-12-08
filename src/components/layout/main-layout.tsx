import { ReactNode } from "react";
import { EnhancedNavbar } from "./enhanced-navbar";
import { PremiumNavbar } from "./premium-navbar";
import { Footer } from "./footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface MainLayoutProps {
  children: ReactNode;
  useTransparentNavbar?: boolean;
}

export function MainLayout({ children, useTransparentNavbar = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {useTransparentNavbar ? <PremiumNavbar /> : <EnhancedNavbar />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
