import { ReactNode } from "react";
import { EnhancedNavbar } from "./enhanced-navbar";
import { Footer } from "./footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface MainLayoutProps {
  children: ReactNode;
  hasHero?: boolean;
}

export function MainLayout({ children, hasHero = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <EnhancedNavbar isTransparent={hasHero} />
      <main className={`flex-1 ${!hasHero ? 'pt-[72px]' : ''}`}>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
