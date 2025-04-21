
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Circle, CircleDot } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const bannerSlides = [
  {
    src: "/lovable-uploads/cdc9ab83-eb85-41ae-b867-8befc33219b7.png",
    headline: (
      <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair drop-shadow-lg">
        <span className="block text-white/90">BRING YOUR EASTERN</span>
        <span className="block text-white/90">TOUCH BACK TO LIFE</span>
      </h1>
    ),
    subheadline: (
      <p className="text-base mt-4 md:text-lg text-white/90">Shop these bestselling articals!</p>
    )
  },
  {
    src: "/lovable-uploads/45912cc0-46ec-4968-a1dd-a7b61ede248b.png",
    headline: (
      <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair drop-shadow-lg">
        <span className="block text-white/90">YOUR FAVORITES</span>
        <span className="block text-white/90">ARE BACK!</span>
      </h1>
    ),
    subheadline: (
      <p className="text-base mt-4 md:text-lg text-white/90">Shop these Original bestsellers!</p>
    )
  }
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section 
      className="relative w-full min-h-[350px] md:min-h-[480px] xl:min-h-[640px] flex items-center justify-center bg-gradient-to-b from-[#dcc1be] to-[#f9f1f0] overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Carousel container */}
      <div className="w-full">
        <Carousel 
          opts={{ loop: true }}
          className="w-full"
          onSelect={(api) => {
            const currentIndex = api.selectedScrollSnap();
            setActiveIndex(currentIndex);
          }}
        >
          <CarouselContent>
            {bannerSlides.map((slide, idx) => (
              <CarouselItem key={idx} className="w-full !pl-0 relative aspect-video flex items-center overflow-hidden">
                <img 
                  src={slide.src}
                  alt=""
                  className="absolute w-full h-full object-cover object-center"
                  style={{
                    zIndex: 0,
                    transition: "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
                    // simple scale for a subtle 3d effect
                    transform: activeIndex === idx ? "scale(1)" : "scale(0.98)",
                  }}
                />
                {/* 3D-ish overlay -- could be solid or semi-transparent */}
                <div className="relative container text-left md:px-8 z-10 flex flex-col items-start justify-center h-full">
                  <div className="bg-black/25 rounded-md p-6 md:p-12 max-w-2xl backdrop-blur-sm">
                    {slide.headline}
                    {slide.subheadline}
                    <div className="mt-6 flex gap-4">
                      <Button 
                        size="lg" 
                        className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white min-w-[160px] rounded-full shadow-lg"
                      >
                        Shop Collection
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white/70 text-white bg-black/40 hover:bg-black/50 min-w-[160px] rounded-full"
                      >
                        Explore SHUKRAN
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Dots navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="w-4 h-4 flex items-center justify-center"
              >
                {activeIndex === i ? (
                  <CircleDot className="text-white drop-shadow" size={18} />
                ) : (
                  <Circle className="text-white/70" size={16} />
                )}
              </button>
            ))}
          </div>
        </Carousel>
      </div>
      {/* 3D Decorative gradients at edges */}
      <div className="absolute -right-20 top-1/4 w-64 h-64 rounded-full bg-kapraye-pink opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 bottom-1/4 w-80 h-80 rounded-full bg-kapraye-mauve opacity-10 blur-3xl pointer-events-none"></div>
    </section>
  );
}
