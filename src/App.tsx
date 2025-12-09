import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { ProtectedRoute } from "./components/auth/protected-route";

// Import pages
import EnhancedIndex from "./pages/EnhancedIndex";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import ShopifyProductPage from "./pages/shopify/ShopifyProductPage";
import DynamicProductPage from "./pages/product/DynamicProductPage";
import ShopifyCheckoutPage from "./pages/shopify-checkout";
import OrderSuccess from "./pages/order-success";
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

// Admin pages
import AdminDashboard from "./pages/admin/index";
import AdminSetup from "./pages/admin/setup";
import AdminProducts from "./pages/admin/products";
import AdminProductImport from "./pages/admin/products/import";
import AdminCategories from "./pages/admin/products/categories";
import AdminOrders from "./pages/admin/orders";
import AdminCustomers from "./pages/admin/customers";
import AdminSettings from "./pages/admin/settings";
import AdminHeroSlides from "./pages/admin/hero-slides";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppSettingsProvider>
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
                <Route path="/shop/:handle" element={<ShopifyProductPage />} />
                <Route path="/checkout" element={<ShopifyCheckoutPage />} />
                <Route path="/cart" element={<ShopifyCheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccess />} />
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

                {/* Admin routes - Protected */}
                <Route path="/admin/setup" element={<AdminSetup />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
                <Route path="/admin/products/import" element={<ProtectedRoute><AdminProductImport /></ProtectedRoute>} />
                <Route path="/admin/products/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
                <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                <Route path="/admin/hero-slides" element={<ProtectedRoute><AdminHeroSlides /></ProtectedRoute>} />

                {/* 404 page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AppSettingsProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
