
import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add padding-top to ensure content is below fixed navbar */}
      <main className="flex-grow pt-[72px]">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
