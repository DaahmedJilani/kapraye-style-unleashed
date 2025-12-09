import { ReactNode } from "react";
import { EnhancedNavbar } from "./enhanced-navbar";
import { Footer } from "./footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <EnhancedNavbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
