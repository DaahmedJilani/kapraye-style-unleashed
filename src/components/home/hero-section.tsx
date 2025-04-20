
import { ParallaxContainer } from "@/components/ui/parallax-container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-luxury-gradient opacity-50"></div>
      
      <div className="container px-4 md:px-8 pt-12 flex flex-col items-center">
        <ParallaxContainer className="w-full">
          {/* Logo */}
          <div className="parallax-layer depth-3 relative w-full flex justify-center mb-8">
            <img 
              src="/lovable-uploads/40e24681-5545-43f2-939e-e27f867c2e2a.png" 
              alt="Kaprayé by Rayan" 
              className="h-32 md:h-40 animate-fade-in"
            />
          </div>
          
          {/* Headline */}
          <div className="parallax-layer depth-2 text-center max-w-4xl mx-auto mb-8 animate-fade-in delay-200">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-above-beyond text-kapraye-burgundy mb-4">
              Kaprayé
            </h1>
            <p className="text-lg md:text-2xl font-allure text-kapraye-pink/80 max-w-2xl mx-auto mb-2">
              By Rayan
            </p>
            <p className="text-base md:text-lg font-montserrat text-foreground/90 max-w-2xl mx-auto">
              Discover the finest collection of premium fashion, accessories, and lifestyle products designed for the modern connoisseur.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="parallax-layer depth-1 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mt-8 animate-fade-in delay-300">
            <Button 
              size="lg" 
              className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white min-w-[180px] rounded-full"
            >
              Shop Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-kapraye-burgundy text-kapraye-burgundy hover:bg-kapraye-burgundy/10 min-w-[180px] rounded-full"
            >
              Explore SHUKRAN
            </Button>
          </div>
        </ParallaxContainer>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 top-1/4 w-64 h-64 rounded-full bg-kapraye-pink opacity-10 blur-3xl"></div>
        <div className="absolute -left-20 bottom-1/4 w-80 h-80 rounded-full bg-kapraye-mauve opacity-10 blur-3xl"></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in delay-500">
        <span className="text-sm text-kapraye-burgundy/70 mb-2">Scroll to explore</span>
        <div className="w-px h-8 bg-kapraye-burgundy/30 animate-[fadeIn_1.5s_ease-in-out_infinite]"></div>
      </div>
    </section>
  );
}
