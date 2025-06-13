
import { MainLayout } from "@/components/layout/main-layout";
import { EnhancedHeroSection } from "@/components/home/enhanced-hero-section";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { TrustSection } from "@/components/home/trust-section";
import { LoyaltySection } from "@/components/home/loyalty-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { Helmet } from "react-helmet-async";

export default function EnhancedIndex() {
  return (
    <>
      <Helmet>
        <title>Kaprayé - Premium Pakistani Fashion | Eastern & Western Wear</title>
        <meta name="description" content="Discover premium Pakistani fashion at Kaprayé. Shop authentic Eastern wear, modern Western styles, and exclusive collections. Free delivery nationwide." />
        <meta name="keywords" content="Pakistani fashion, Eastern wear, Western wear, women's clothing, men's fashion, kids fashion, traditional wear, modern fashion" />
        <meta property="og:title" content="Kaprayé - Premium Pakistani Fashion" />
        <meta property="og:description" content="Discover premium Pakistani fashion at Kaprayé. Shop authentic Eastern wear, modern Western styles, and exclusive collections." />
        <meta property="og:image" content="/lovable-uploads/f735aa4e-d866-403e-8e04-81e8bc202810.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://kapraye.com" />
      </Helmet>
      
      <MainLayout>
        <EnhancedHeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <TrustSection />
        <LoyaltySection />
        <NewsletterSection />
      </MainLayout>
    </>
  );
}
