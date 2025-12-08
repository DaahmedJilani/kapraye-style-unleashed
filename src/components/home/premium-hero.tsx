import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const heroSlides = [
  {
    id: 1,
    badge: "Eid Collection 2025",
    title: "Elegance",
    titleAccent: "Redefined",
    subtitle: "Discover timeless pieces crafted for those who appreciate quality and cultural heritage",
    image: "/lovable-uploads/cdc9ab83-eb85-41ae-b867-8befc33219b7.png",
    cta: "Shop Collection",
    link: "/women",
  },
  {
    id: 2,
    badge: "Trending Now",
    title: "Modern",
    titleAccent: "Classics",
    subtitle: "Explore the styles our community loves - contemporary fashion meets tradition",
    image: "/lovable-uploads/45912cc0-46ec-4968-a1dd-a7b61ede248b.png",
    cta: "Explore Looks",
    link: "/women",
  },
  {
    id: 3,
    badge: "New Arrivals",
    title: "Luxury",
    titleAccent: "Awaits",
    subtitle: "Premium fabrics, exquisite craftsmanship, and designs that tell your story",
    image: "/lovable-uploads/f7ad58eb-f874-4d63-b84c-77b0e59cf275.png",
    cta: "View New In",
    link: "/women",
  },
];

export function PremiumHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
      {/* Background Image with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-20 w-48 h-48 rounded-full bg-muted/30 blur-3xl pointer-events-none" />
      
      {/* Animated Particles */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 opacity-20"
      >
        <Sparkles className="w-8 h-8 text-secondary" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-1/3 opacity-20"
      >
        <Star className="w-6 h-6 text-muted" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-8 py-20 md:py-0">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 text-sm font-medium text-foreground">
                  <Sparkles className="w-4 h-4" />
                  {slide.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-medium leading-[0.95] mb-6"
              >
                <span className="block text-foreground">{slide.title}</span>
                <span className="block text-secondary italic">{slide.titleAccent}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                  onClick={() => navigate(slide.link)}
                >
                  {slide.cta}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size={isMobile ? "default" : "lg"}
                  variant="outline"
                  className="rounded-full px-8 border-foreground/20 hover:bg-foreground/5 backdrop-blur-sm"
                  onClick={() => navigate("/loyalty")}
                >
                  Join SHUKRAN
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mt-12 md:mt-16"
          >
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-1 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? "w-12 bg-primary" 
                    : "w-6 bg-muted hover:bg-secondary"
                }`}
              >
                {index === currentSlide && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <span className="ml-4 text-sm text-muted-foreground font-medium">
              {String(currentSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
