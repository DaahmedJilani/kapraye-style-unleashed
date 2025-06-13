
import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { ProductGrid } from '@/components/woocommerce/ProductGrid';
import { LoyaltySection } from '@/components/home/loyalty-section';
import { AboutSection } from '@/components/home/about-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { motion } from 'framer-motion';

export default function EnhancedIndex() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Categories */}
        <FeaturedCategories />
        
        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of premium fashion pieces, 
                carefully curated for the modern trendsetter.
              </p>
            </motion.div>
            
            <ProductGrid 
              featured={true}
              perPage={8}
              className="mb-12"
            />
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-medium text-kapraye-burgundy mb-4">
                New Arrivals
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Be the first to explore our latest collection, featuring the newest trends 
                and timeless classics for every occasion.
              </p>
            </motion.div>
            
            <ProductGrid 
              perPage={8}
              className="mb-12"
            />
          </div>
        </section>

        {/* Sale Section */}
        <section className="py-16 bg-gradient-to-r from-kapraye-burgundy to-kapraye-pink text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-medium mb-4">
                Special Offers
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Don't miss out on our exclusive deals and limited-time offers. 
                Shop now and save on your favorite pieces.
              </p>
            </motion.div>
            
            <ProductGrid 
              onSale={true}
              perPage={8}
              className="mb-12"
            />
          </div>
        </section>

        {/* Loyalty Section */}
        <LoyaltySection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </MainLayout>
  );
}
