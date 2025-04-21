
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Circle, CircleDot } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const bannerSlides = [
  {
    src: "/lovable-uploads/cdc9ab83-eb85-41ae-b867-8befc33219b7.png",
    headline: (
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-playfair drop-shadow-lg">
        <span className="block text-white/90">Shop Eid Collection</span>
      </h1>
    ),
    subheadline: (
      <p className="text-sm md:text-base lg:text-lg text-white/90 mt-2">Elevate your festive style with our exclusive Eid edits – timeless elegance for every celebration.</p>
    )
  },
  {
    src: "/lovable-uploads/45912cc0-46ec-4968-a1dd-a7b61ede248b.png",
    headline: (
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-playfair drop-shadow-lg">
        <span className="block text-white/90">Top Trending Looks</span>
      </h1>
    ),
    subheadline: (
      <p className="text-sm md:text-base lg:text-lg text-white/90 mt-2">Discover the styles our community loves – modern classics and trending favorites.</p>
    )
  }
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [api, setApi] = React.useState<any>(null);

  // Set carousel to change every 4 seconds (4000ms)
  useEffect(() => {
    if (!api) return;
    const autoSlideInterval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => {
      clearInterval(autoSlideInterval);
    };
  }, [api]);

  const handleSelect = React.useCallback((api: any) => {
    const currentIndex = api.selectedScrollSnap();
    setActiveIndex(currentIndex);
  }, []);

  return (
    <section 
      className="relative w-full min-h-[350px] md:min-h-[480px] xl:min-h-[640px] flex items-center justify-center bg-gradient-to-b from-[#dcc1be] to-[#f9f1f0] overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="w-full">
        <Carousel 
          opts={{ loop: true }}
          className="w-full"
          setApi={setApi}
          onSelect={handleSelect}
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
                    transform: activeIndex === idx ? "scale(1)" : "scale(0.98)",
                  }}
                />
                {/* Move text area further down and reduce overlay size */}
                <div className="relative container z-10 flex flex-col items-start justify-end h-full pb-10 md:pb-16 lg:pb-24">
                  <div className="bg-black/25 rounded-md p-4 md:p-7 max-w-lg backdrop-blur-sm mt-auto shadow-lg">
                    {slide.headline}
                    {slide.subheadline}
                    <div className="mt-4 flex gap-4">
                      <Button 
                        size="lg" 
                        className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white min-w-[140px] rounded-full shadow-lg text-base md:text-lg"
                      >
                        Shop Collection
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-white/70 text-white bg-black/70 hover:bg-black/90 min-w-[140px] rounded-full text-base md:text-lg"
                      >
                        Explore SHUKRAN
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
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
      <div className="absolute -right-20 top-1/4 w-64 h-64 rounded-full bg-kapraye-pink opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 bottom-1/4 w-80 h-80 rounded-full bg-kapraye-mauve opacity-10 blur-3xl pointer-events-none"></div>
    </section>
  );
}
