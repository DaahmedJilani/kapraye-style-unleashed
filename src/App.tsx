
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { WooCommerceCartProvider } from "./contexts/WooCommerceCartContext";
import { CartProvider } from "./contexts/CartContext";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";

// Import pages
import EnhancedIndex from "./pages/EnhancedIndex";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import DynamicProductPage from "./pages/product/DynamicProductPage";
import EnhancedCheckoutPage from "./pages/enhanced-checkout";
import Wishlist from "./pages/wishlist";
import Loyalty from "./pages/loyalty";
import Search from "./pages/search";
import Quiz from "./pages/quiz";
import Recommendations from "./pages/recommendations";
import Notes from "./pages/notes";

// Category pages
import Men from "./pages/categories/men";
import Women from "./pages/categories/women";
import Kids from "./pages/categories/kids";
import Eastern from "./pages/categories/eastern";
import Western from "./pages/categories/western";
import Saudi from "./pages/categories/saudi";
import Makeup from "./pages/categories/makeup";
import Accessories from "./pages/categories/accessories";
import Perfumes from "./pages/categories/perfumes";
import Shoes from "./pages/categories/shoes";

// Company pages
import About from "./pages/company/about";
import Contact from "./pages/company/contact";
import Terms from "./pages/company/terms";
import Privacy from "./pages/company/privacy";
import Careers from "./pages/company/careers";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppSettingsProvider>
          <CartProvider>
            <WooCommerceCartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Main pages */}
                    <Route path="/" element={<EnhancedIndex />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="/product/:slug" element={<DynamicProductPage />} />
                    <Route path="/checkout" element={<EnhancedCheckoutPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/loyalty" element={<Loyalty />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/notes" element={<Notes />} />

                    {/* Category pages */}
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/kids" element={<Kids />} />
                    <Route path="/eastern" element={<Eastern />} />
                    <Route path="/western" element={<Western />} />
                    <Route path="/saudi" element={<Saudi />} />
                    <Route path="/makeup" element={<Makeup />} />
                    <Route path="/accessories" element={<Accessories />} />
                    <Route path="/perfumes" element={<Perfumes />} />
                    <Route path="/shoes" element={<Shoes />} />

                    {/* Company pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/careers" element={<Careers />} />

                    {/* 404 page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </WooCommerceCartProvider>
          </CartProvider>
        </AppSettingsProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
