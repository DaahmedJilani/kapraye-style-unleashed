
import { ParallaxContainer } from "@/components/ui/parallax-container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Banner Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-center items-center overflow-hidden">
        <img
          src="/lovable-uploads/f735aa4e-d866-403e-8e04-81e8bc202810.png"
          alt="Rizz Fit Hero Banner"
          className="max-w-full max-h-[85vh] object-contain"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-luxury-gradient opacity-50 pointer-events-none"></div>
      </div>

      <div className="container px-4 md:px-8 pt-12 flex flex-col items-center relative z-10">
        <ParallaxContainer className="w-full">
          {/* Headline */}
          <div className="parallax-layer depth-2 text-center max-w-4xl mx-auto mb-8 animate-fade-in delay-200">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-above-beyond text-kapraye-burgundy mb-4">
              <span className="font-above-beyond">Kaprayé</span>
            </h1>
            <p className="text-lg md:text-2xl text-kapraye-pink/80 max-w-2xl mx-auto mb-2">
              <span className="font-allure">By Rayan</span>
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in delay-500 z-10">
        <span className="text-sm text-kapraye-burgundy/70 mb-2">Scroll to explore</span>
        <div className="w-px h-8 bg-kapraye-burgundy/30 animate-[fadeIn_1.5s_ease-in-out_infinite]"></div>
      </div>
    </section>
  );
}
