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
      <div className="space-y-10 md:space-y-16">
        <HeroSection />
        <div className="md:mt-6">
          <FeaturedCategories />
        </div>
        <AboutSection />
        <div className="md:mt-6">
          <FeaturedProducts />
        </div>
        <div className="md:mt-8">
          <ShopTheLook />
        </div>
        <LoyaltySection />
        <NewsletterSection />
        <section className="py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <a
              href="/notes"
              className="inline-block px-4 py-2 text-base sm:text-lg bg-kapraye-burgundy text-white rounded-lg shadow hover:bg-kapraye-burgundy/90 transition"
            >
              My Notes
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
