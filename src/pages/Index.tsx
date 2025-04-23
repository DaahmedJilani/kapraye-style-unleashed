import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ShopTheLook } from "@/components/product/shop-the-look";
import { LoyaltySection } from "@/components/home/loyalty-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { AboutSection } from "@/components/home/about-section";
import { MainLayout } from "@/components/layout/main-layout";
import { useEffect } from "react";

const Index = () => {
  // Add parallax scroll effect for enhanced 3D feel
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
    <MainLayout>
      <HeroSection />
      <FeaturedCategories />
      <AboutSection />
      <FeaturedProducts />
      <ShopTheLook />
      <LoyaltySection />
      <NewsletterSection />
      <section className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Add link to the notes page */}
          <a
            href="/notes"
            className="inline-block px-4 py-2 bg-kapraye-burgundy text-white rounded-lg shadow hover:bg-kapraye-burgundy/90 transition"
          >
            My Notes
          </a>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
