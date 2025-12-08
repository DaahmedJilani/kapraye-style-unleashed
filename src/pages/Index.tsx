import { useEffect } from "react";
import { PremiumHero } from "@/components/home/premium-hero";
import { PremiumCategories } from "@/components/home/premium-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ShopTheLook } from "@/components/product/shop-the-look";
import { LoyaltySection } from "@/components/home/loyalty-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { AboutSection } from "@/components/home/about-section";
import { MainLayout } from "@/components/layout/main-layout";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-scroll');
      
      parallaxElements.forEach((element) => {
        const speed = (element as HTMLElement).dataset.speed || "0.1";
        const yPos = scrollPosition * parseFloat(speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MainLayout useTransparentNavbar>
      <PremiumHero />
      <PremiumCategories />
      <AboutSection />
      <FeaturedProducts />
      <ShopTheLook />
      <LoyaltySection />
      <NewsletterSection />
    </MainLayout>
  );
};

export default Index;
