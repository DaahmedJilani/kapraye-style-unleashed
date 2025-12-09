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

// Women subcategory pages
import WomenUnstitched from "./pages/categories/women/unstitched";
import WomenStitched from "./pages/categories/women/stitched";
import WomenTees from "./pages/categories/women/tees";
import WomenBottoms from "./pages/categories/women/bottoms";
import WomenUndergarments from "./pages/categories/women/undergarments";
import WomenBodycon from "./pages/categories/women/bodycon";
import WomenWesternDresses from "./pages/categories/women/western-dresses";
import WomenBeautyCosmetics from "./pages/categories/women/beauty-cosmetics";

// Men subcategory pages
import MenUnstitched from "./pages/categories/men/unstitched";
import MenTees from "./pages/categories/men/tees";
import MenBottoms from "./pages/categories/men/bottoms";

// Kids subcategory pages
import KidsBoys from "./pages/categories/kids/boys";
import KidsGirls from "./pages/categories/kids/girls";
import KidsBabies from "./pages/categories/kids/babies";

// Company pages
import About from "./pages/company/about";
import Contact from "./pages/company/contact";
import Terms from "./pages/company/terms";
import Privacy from "./pages/company/privacy";
import Careers from "./pages/company/careers";
import Refund from "./pages/company/refund";
import Shipping from "./pages/company/shipping";

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
                <Route path="/product/:handle" element={<ShopifyProductPage />} />
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

                {/* Main category pages */}
                <Route path="/women" element={<Women />} />
                <Route path="/men" element={<Men />} />
                <Route path="/kids" element={<Kids />} />

                {/* Women subcategory pages */}
                <Route path="/women/unstitched" element={<WomenUnstitched />} />
                <Route path="/women/stitched" element={<WomenStitched />} />
                <Route path="/women/tees" element={<WomenTees />} />
                <Route path="/women/bottoms" element={<WomenBottoms />} />
                <Route path="/women/undergarments" element={<WomenUndergarments />} />
                <Route path="/women/bodycon" element={<WomenBodycon />} />
                <Route path="/women/western-dresses" element={<WomenWesternDresses />} />
                <Route path="/women/beauty-cosmetics" element={<WomenBeautyCosmetics />} />

                {/* Men subcategory pages */}
                <Route path="/men/unstitched" element={<MenUnstitched />} />
                <Route path="/men/tees" element={<MenTees />} />
                <Route path="/men/bottoms" element={<MenBottoms />} />

                {/* Kids subcategory pages */}
                <Route path="/kids/boys" element={<KidsBoys />} />
                <Route path="/kids/girls" element={<KidsGirls />} />
                <Route path="/kids/babies" element={<KidsBabies />} />

                {/* Company pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/shipping" element={<Shipping />} />

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
