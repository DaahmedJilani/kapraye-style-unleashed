
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
import QuizPage from "./pages/quiz";
import Recommendations from "./pages/recommendations";
import AboutPage from "./pages/company/about";
import ContactPage from "./pages/company/contact";
import CareersPage from "./pages/company/careers";
import TermsPage from "./pages/company/terms";
import PrivacyPage from "./pages/company/privacy";
import MakeupPage from "./pages/categories/makeup";
import AccessoriesPage from "./pages/categories/accessories";
import PerfumesPage from "./pages/categories/perfumes";
import ShoesPage from "./pages/categories/shoes";
import SubcategoryPage from "./pages/subcategory/SubcategoryPage";

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
            
            {/* Main category pages */}
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/eastern" element={<EasternPage />} />
            <Route path="/western" element={<WesternPage />} />
            <Route path="/saudi" element={<SaudiPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/recommendations" element={<Recommendations />} />
            
            {/* Company routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            
            {/* Category routes */}
            <Route path="/makeup" element={<MakeupPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/perfumes" element={<PerfumesPage />} />
            <Route path="/shoes" element={<ShoesPage />} />
            
            {/* Subcategory routes */}
            <Route path="/:category/:subcategory" element={<SubcategoryPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppSettingsProvider>
  </QueryClientProvider>
);

export default App;
