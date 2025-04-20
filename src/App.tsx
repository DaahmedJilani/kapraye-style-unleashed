
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Loyalty from "./pages/loyalty";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Wishlist from "./pages/wishlist";
import MenPage from "./pages/categories/men";
import WomenPage from "./pages/categories/women";
import KidsPage from "./pages/categories/kids";
import EasternPage from "./pages/categories/eastern";
import WesternPage from "./pages/categories/western";
import SaudiPage from "./pages/categories/saudi";
import ProductPage from "./pages/product/ProductPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppSettingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/eastern" element={<EasternPage />} />
            <Route path="/western" element={<WesternPage />} />
            <Route path="/saudi" element={<SaudiPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppSettingsProvider>
  </QueryClientProvider>
);

export default App;
