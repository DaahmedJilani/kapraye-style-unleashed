
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    id: 1,
    title: "Elevate Your Style",
    subtitle: "Discover the latest in contemporary fashion",
    description: "From traditional Eastern wear to modern Western styles - find your perfect look",
    image: "/lovable-uploads/f735aa4e-d866-403e-8e04-81e8bc202810.png",
    cta: "Shop New Arrivals",
    ctaLink: "/women",
    bgColor: "from-kapraye-burgundy/20 to-kapraye-mauve/10"
  },
  {
    id: 2,
    title: "Traditional Elegance",
    subtitle: "Authentic Eastern & Saudi Style Collection",
    description: "Handpicked traditional wear that celebrates heritage with modern comfort",
    image: "/lovable-uploads/e5f87f66-0f74-44c0-89cd-9e1a21f6488a.png",
    cta: "Explore Eastern Wear",
    ctaLink: "/eastern",
    bgColor: "from-kapraye-pink/20 to-kapraye-cream/30"
  },
  {
    id: 3,
    title: "SHUKRAN Loyalty",
    subtitle: "Earn points with every purchase",
    description: "Join our exclusive loyalty program and unlock special rewards, early access, and personalized shopping experiences",
    image: "/lovable-uploads/40e24681-5545-43f2-939e-e27f867c2e2a.png",
    cta: "Join SHUKRAN",
    ctaLink: "/loyalty",
    bgColor: "from-kapraye-mauve/20 to-kapraye-burgundy/10"
  }
];

const trustBadges = [
  { icon: Star, text: "Premium Quality" },
  { icon: Heart, text: "Customer Loved" },
  { icon: ShoppingBag, text: "Fast Delivery" }
];

export function EnhancedHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgColor}`}
        />
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Content */}
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-playfair font-medium text-kapraye-burgundy leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.h2 
                className="text-xl md:text-2xl text-kapraye-mauve font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white px-8 py-3 text-lg"
              >
                <Link to={heroSlides[currentSlide].ctaLink}>
                  {heroSlides[currentSlide].cta}
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-kapraye-burgundy text-kapraye-burgundy hover:bg-kapraye-burgundy hover:text-white px-8 py-3 text-lg"
              >
                <Link to="/search">
                  Browse All
                </Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <badge.icon className="h-4 w-4 text-kapraye-pink" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-lg mx-auto">
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-kapraye-burgundy scale-125" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6 text-kapraye-burgundy" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg"
      >
        <ChevronRight className="h-6 w-6 text-kapraye-burgundy" />
      </button>
    </section>
  );
}
